package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.Cart;
import com.project.harmonie_e_commerce.model.CompositeKey.ProductInCartKey;
import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.ProductInCart;
import com.project.harmonie_e_commerce.repository.CartRepository;
import com.project.harmonie_e_commerce.repository.ProductInCartRepository;
import com.project.harmonie_e_commerce.repository.ProductRepository;
import com.project.harmonie_e_commerce.response.CartResponse;
import com.project.harmonie_e_commerce.response.ProductInCartResponse;
import com.project.harmonie_e_commerce.response.ProductResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class CartService implements ICartService{

    private CartRepository cartRepository;

    private ProductInCartRepository productInCartRepository;

//    private ProductService productService;

    private ProductRepository productRepository;
    @Override
    public CartResponse createCart(){
        Cart newCart = Cart.builder()
                .productInCart(new ArrayList<>())
                .total_items(0)
                .build();
        cartRepository.save(newCart);
        return CartResponse.builder()
                .total_items(newCart.getTotal_items())
                .productInCartList(new ArrayList<>())
                .build();
    }

    @Override
    public CartResponse getCartById(Long id) throws Exception {
        Cart cart = cartRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Can't find cart by ID:" + id)
        );
        return CartResponse.builder()
                .total_items(cart.getTotal_items())
                .productInCartList(getAllProductsInCart(cart.getId()))
                .build();
    }

    @Override
    public List<ProductInCartResponse> getAllProductsInCart(Long cartId) throws Exception {
        List<ProductInCart> productInCartList = productInCartRepository.findAllByProductInCartKey_CartId(cartId);
        return productInCartList.stream().map(p -> {
            try {
//                Product product = productService.getProductById(p.getProduct().getId());
                Product product = productRepository.findById(p.getProduct().getId()).get();
                // tạo ProductResponse cho từng sản phẩm
                ProductResponse productResponse = ProductResponse.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .brand(product.getBrand())
                        .price(product.getPrice())
                        .categoryId(product.getCategory().getId())
                        .build();
                // tạo ProductInCartResponse cho từng sản phẩm
                ProductInCartResponse productInCartResponse = ProductInCartResponse.builder()
                        .productResponse(productResponse)
                        .quantity(p.getQuantity()) //lấy số lượng của từng sản phẩm
                        .build();
                return productInCartResponse;
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteItemInCart(Long product_id, Long cart_id) throws Exception {
        Cart cart = cartRepository.findById(cart_id).orElseThrow(
                () -> new DataNotFoundException("Can't find cart by ID:" + cart_id)
        );
        ProductInCart productInCart = productInCartRepository
                .findByProductInCartKey_CartIdAndProductInCartKey_ProductId(cart_id,product_id);
        if (productInCart == null){
            throw new DataNotFoundException("Can't find product by cart_id and product_id");
        }
        //giảm đi số lượng đã xóa trong cart.total_item
        cart.setTotal_items(cart.getTotal_items()-productInCart.getQuantity());
        cartRepository.save(cart);

        //xóa khỏi database
        productInCartRepository.delete(productInCart);
    }

    @Override
    public Float getTotalPrice(Long cartId) {
        List<ProductInCart> productInCartList = productInCartRepository.findAllByProductInCartKey_CartId(cartId);
        Float total = 0F;
        for (ProductInCart p : productInCartList) {
            total += p.getQuantity() * p.getProduct().getPrice(); // Tính tổng theo số lượng và giá của sản phẩm
        }
        return total;
    }

    @Override
    public CartResponse addProductToCart(Long product_id, Long cart_id) throws Exception{
        //nếu tồn tại sản phẩm rồi thì + quantity
        ProductInCart product_to_add= productInCartRepository
                .findByProductInCartKey_CartIdAndProductInCartKey_ProductId(cart_id,product_id);
        if (product_to_add == null){
            //nếu chưa tồn tại thì thêm vào
            ProductInCartKey key = new ProductInCartKey(cart_id, product_id);
            //TODO: check xem có ánh xạ được không
            ProductInCart newProduct = ProductInCart.builder()
                    .productInCartKey(key)
                    .cart(cartRepository.findById(cart_id).get()) // xem xét throw, test hàm rồi sửa
                    .product(productRepository.findById(product_id).get()) // xem xét throw, test hàm rồi sửa
                    .quantity(1)
                    .build();
            productInCartRepository.save(newProduct);
        }else{
            //update quantity của product
            product_to_add.setQuantity(product_to_add.getQuantity()+1);
            productInCartRepository.save(product_to_add);
        }
        //update total_item
        Cart cart = cartRepository.findById(cart_id).get();
        cart.setTotal_items(cart.getTotal_items()+1);

        cartRepository.save(cart);

        return CartResponse.builder()
                .productInCartList(getAllProductsInCart(cart_id))
                .total_items(cart.getTotal_items())
                .build();
    }

    @Override
    public ProductInCart updateQuantityProductinCart(Long product_id, Long cart_id, Integer newQuantity) throws  Exception {
        ProductInCart product_to_add= productInCartRepository
                .findByProductInCartKey_CartIdAndProductInCartKey_ProductId(cart_id,product_id);
        product_to_add.setQuantity(newQuantity);
        return productInCartRepository.save(product_to_add);
    }

}
