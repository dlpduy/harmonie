package com.project.harmonie_e_commerce.service;

import org.springframework.stereotype.Service;

import com.project.harmonie_e_commerce.model.Order;
import com.project.harmonie_e_commerce.model.SystemDiscount;
import com.project.harmonie_e_commerce.model.Order.PayMethod;
import com.project.harmonie_e_commerce.model.DeliveryInformation;
import com.project.harmonie_e_commerce.model.Store;
import com.project.harmonie_e_commerce.model.StoreDiscount;
import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.ShippingDiscount;

import com.project.harmonie_e_commerce.repository.*;
import com.project.harmonie_e_commerce.response.OrderResponse;
import com.project.harmonie_e_commerce.dto.OrderRequestDTO;
import com.project.harmonie_e_commerce.dto.OrderProductDTO;
import com.project.harmonie_e_commerce.dto.OrderBoxDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import com.project.harmonie_e_commerce._lib.Pair;

import lombok.*;


@Service
@AllArgsConstructor
public class OrderService {

    OrderRepository orderRepository;
    ProductRepository productRepository;
    DeliveryInformationRepository deliveryInformationRepository;
    SystemDiscountRepository systemDiscountRepository;
    StoreDiscountRepository storeDiscountRepository;
    ShippingDiscountRepository shippingDiscountRepository;

    BoxService boxService;


    @Transactional
    public OrderResponse createOrder(HttpServletRequest request, OrderRequestDTO orderRequest) {
        Order order = new Order();

        // Set the delivery information
        Integer deliveryInformationId = orderRequest.getConsigneeInformationId();
        DeliveryInformation deliveryInformation = deliveryInformationRepository.findById(deliveryInformationId)
                                                                               .orElseThrow(() -> new RuntimeException("Delivery information not found"));
        order.setDeliveryInformation(deliveryInformation);
        
        // Set the system discount - optional
        Integer systemDiscountId = orderRequest.getSystemDiscountId();
        if (systemDiscountId != null){
            SystemDiscount systemDiscount = systemDiscountRepository.findById(systemDiscountId)
                                                                    .orElseThrow(() -> new RuntimeException("System discount not found"));
            order.setSystemDiscount(systemDiscount);
        }

        // Set the pay method
        PayMethod payMethod = orderRequest.getPayMethod();
        order.setPayMethod(payMethod);


        // Get all stores of products, btw get storeDiscounts for each store
        // ProductInStore = {store1: [ [{product1, qtt1}, {product2, qtt2},...], store1Discount ],
        //                   store2: [ [{product1, qtt1}, {product2, qtt2},...], store2Discount ],
        //                  ...}


        // DSA time :)))
        HashMap<Store, Pair<List<Pair<Product, Integer>>, StoreDiscount>> productInStores = new HashMap<>();
        
        List<OrderProductDTO> orderProductDTOs = orderRequest.getProducts();
        for (OrderProductDTO orderProductDTO : orderProductDTOs) {
            Integer productId = orderProductDTO.getId();
            Integer buyQuantity = orderProductDTO.getQuantity();
            Product product = productRepository.findById(productId)
                                               .orElseThrow(() -> new RuntimeException("Product not found"));
            
            Integer remainingQuantity = product.getQuantity();
            
            if (remainingQuantity < buyQuantity)
                throw new RuntimeException("Not enough product " + product.getName() + " in stock");


            Store store = productRepository.findStoreById(productId)
                                           .orElseThrow(() -> new RuntimeException("Store not found"));

            // handle case this is the first time this store appears
            productInStores.putIfAbsent(store, new Pair<>(new ArrayList<>(), null)); // storeDiscount is null for now

            // here, store surely has existed in hashmap

            // append product into value list of storeId key
            List<Pair<Product, Integer>> products = productInStores.get(store).first;
            products.add(new Pair<>(product, buyQuantity)); // because products is a reference to value list in hashmap, no need for "re-put"
        }


        // traverse all storeDiscounts to assign to each store
        List<Integer> storeDiscountIds = orderRequest.getStoreDiscountsIds();
        for (Integer storeDiscountId : storeDiscountIds){
            StoreDiscount storeDiscount = storeDiscountRepository.findById(storeDiscountId)
                                                                 .orElseThrow(() -> new RuntimeException("Store discount not found"));
            
            Store store = storeDiscount.getStore();
            if(!productInStores.containsKey(store))
                throw new RuntimeException("Store discount does not match any store");
            productInStores.get(store).second = storeDiscount;
        }


        // Get shippingDiscount for passing to each OrderBoxDTO
        Integer shippingDiscountId = orderRequest.getShippingDiscountId();
        ShippingDiscount shippingDiscount = shippingDiscountRepository.findById(shippingDiscountId)
                                                                     .orElseThrow(() -> new RuntimeException("Shipping discount not found"));

        // create boxes, number of boxes exactly equal size of hashmap above
        // Note: this initial is capcity, not truely size
        // List<Box> boxes = new ArrayList<>(productInStores.size());

        for (Map.Entry<Store, Pair<List<Pair<Product, Integer>>, StoreDiscount>> entry : productInStores.entrySet()){

            Store store = entry.getKey();
            StoreDiscount storeDiscount = entry.getValue().second;
            String caution = "Caution: fragile";
            List<Pair<Product, Integer>> products = entry.getValue().first;

            OrderBoxDTO orderBoxRequest = 
                new OrderBoxDTO(order, store, 
                                storeDiscount, 
                                shippingDiscount, 
                                caution, products);

            boxService.createBox(request, orderBoxRequest);
        }


        Float totalPrice = boxService.getTotalPriceOfBoxes(order);
        if(order.getSystemDiscount() != null  &&  totalPrice >= order.getSystemDiscount().getMinBillAmount()){
            Float decreaseAmount = totalPrice * order.getSystemDiscount().getPercentage()/100;
            if (decreaseAmount > order.getSystemDiscount().getMaxAmount())
                decreaseAmount = order.getSystemDiscount().getMaxAmount();
            totalPrice -= decreaseAmount;
        }

        order.setTotalPrice(totalPrice);
        
        return OrderResponse.fromOrder(orderRepository.save(order));
    }
}
