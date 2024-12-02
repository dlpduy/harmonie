// package com.project.harmonie_e_commerce.controller;

// import com.project.harmonie_e_commerce.model.ProductInCart;
// import com.project.harmonie_e_commerce.response.CartResponse;
// import com.project.harmonie_e_commerce.response.ProductInCartResponse;
// import com.project.harmonie_e_commerce.service.CartService;
// import lombok.AllArgsConstructor;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("${api.prefix}/cart/{cart_id}")
// @AllArgsConstructor
// public class CartController {

//     private CartService cartService;

//     @GetMapping
//     public ResponseEntity<CartResponse> getCartById(
//             @PathVariable Long cart_id
//     ){
//         try {
//             return new ResponseEntity<>(cartService.getCartById(cart_id), HttpStatus.OK);
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }

//     @GetMapping("/all")
//     public ResponseEntity<List<ProductInCartResponse>> getAllProductsInCart(
//             @PathVariable Long cart_id
//     ){
//         try {
//             return new ResponseEntity<>(cartService.getAllProductsInCart(cart_id), HttpStatus.OK);
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }

//     @DeleteMapping("/delete/{product_id}")
//     public ResponseEntity<String> deleteItemInCart(
//             @PathVariable Long product_id,
//             @PathVariable Long cart_id
//     ){
//         try {
//             cartService.deleteItemInCart(product_id,cart_id);
//             return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }

//     @PostMapping("/add/{product_id}")
//     public ResponseEntity<CartResponse> addProductToCart(
//             @PathVariable Long product_id,
//             @PathVariable Long cart_id
//     ){
//         try {
//             return new ResponseEntity<>(cartService.addProductToCart(product_id,cart_id), HttpStatus.OK);
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }

//     @PutMapping("/update_quantity/{product_id}")
//     public ResponseEntity<ProductInCart> updateQuantityProductinCart(
//             @PathVariable Long product_id,
//             @PathVariable Long cart_id,
//             @RequestParam Integer newQuantity
//     ){
//         try {
//             return new ResponseEntity<>(cartService.updateQuantityProductinCart(
//                     product_id,cart_id,newQuantity
//             ), HttpStatus.OK);
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }

//     @GetMapping("/price")
//     public ResponseEntity<Float> getTotalPrice(
//             @PathVariable Long cart_id
//     ){
//         try {
//             return new ResponseEntity<>(cartService.getTotalPrice(cart_id), HttpStatus.OK);
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }
// }
