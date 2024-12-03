//package com.project.harmonie_e_commerce.service;
//
//import org.springframework.stereotype.Service;
//
//import com.project.harmonie_e_commerce.model.Box;
//import com.project.harmonie_e_commerce.model.Order;
//import com.project.harmonie_e_commerce.model.Product;
//
//import com.project.harmonie_e_commerce.dto.OrderBoxDTO;
//import com.project.harmonie_e_commerce.dto.OrderProductInBoxDTO;
//
//import com.project.harmonie_e_commerce.repository.BoxRepository;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.transaction.Transactional;
//import lombok.AllArgsConstructor;
//
//import java.util.List;
//import java.util.Random;
//import java.time.LocalDate;
//import com.project.harmonie_e_commerce._lib.Pair;
//
//@Service
//@AllArgsConstructor
//public class BoxService {
//
//    private final BoxRepository boxRepository;
//    private final ProductInBoxService productInBoxService;
//
//    @Transactional
//    public void createBox(HttpServletRequest request, OrderBoxDTO orderBoxRequest){
//
//        Random rand = new Random();
//        Integer minFeeShip = 10000;
//        Integer maxFeeShip = 1000000;
//        Float feeShip = rand.nextFloat(maxFeeShip - minFeeShip) + minFeeShip;
//
//        Integer minPredictedDeliveryDate = 2;
//        Integer maxPredictedDeliveryDate = 5;
//
//        LocalDate predictedDeliveryDate = LocalDate.now().plusDays(
//            rand.nextInt(maxPredictedDeliveryDate - minPredictedDeliveryDate) + minPredictedDeliveryDate);
//
//        Box box = Box.builder()
//            .order(orderBoxRequest.getOrder())
//            .store(orderBoxRequest.getStore())
//            .storeDiscount(orderBoxRequest.getStoreDiscount())
//            .shippingDiscount(orderBoxRequest.getShippingDiscount())
//            .shipperName("Nguyen Van A")
//            .shipperPhone("0123456789")
//            .feeShip(feeShip)
//            .predictedDeliveryDate(predictedDeliveryDate)
//            .caution(orderBoxRequest.getCaution())
//            .build();
//
//
//        List<Pair<Product, Integer>> products = orderBoxRequest.getProducts();
//        for (Pair<Product, Integer> product : products) {
//            OrderProductInBoxDTO orderProductInBoxRequest =
//                new OrderProductInBoxDTO(box, product.first, product.second);
//
//            productInBoxService.createProductInBox(request, orderProductInBoxRequest);
//        }
//
//        Float totalPrice = productInBoxService.getTotalPriceOfProducts(box);
//        totalPrice += feeShip;
//        if(box.getStoreDiscount() != null)
//            totalPrice -= box.getStoreDiscount().getAmount();
//
//        if(box.getShippingDiscount() != null)
//            totalPrice -= box.getShippingDiscount().getMaxAmount();
//
//        if (totalPrice < 0) totalPrice = 0.0f;
//
//        box.setTotalPrice(totalPrice);
//        boxRepository.save(box);
//    }
//
//    Float getTotalPriceOfBoxes(Order order){
//        return boxRepository.sumPriceByOrder(order);
//    }
//}
