package com.project.harmonie_e_commerce.controller;

import com.github.javafaker.Faker;
import com.project.harmonie_e_commerce.dto.*;
import com.project.harmonie_e_commerce.response.ProductResponse;
import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.ProductImage;
import com.project.harmonie_e_commerce.service.IProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@RestController
@RequestMapping("${api.prefix}/products")
@RequiredArgsConstructor
public class ProductController {
    private final IProductService productService;

    @PostMapping("")
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductDTO productDTO,
                                           BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            Product newProduct = productService.createProduct(productDTO);
            return ResponseEntity.ok(newProduct);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping(value = "uploads/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImages(@PathVariable long id, @ModelAttribute List<MultipartFile> files) {
        try {
            List<ProductImage> productImages = new ArrayList<>();
            for (MultipartFile file : files) {
                if (file.getSize() == 0)
                    continue;
                // check the size and format of file
                if (file.getSize() > 10 * 1024 * 1024) {
                    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                            .body("File is too large! Max size is 10MB");
                }
                // Get the format of file
                String contentType = file.getContentType();
                if (contentType == null || !contentType.startsWith("image/")) {
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body("File must be an image");
                }
                String filename = storeFile(file);
                productImages.add(productService.createProductImage(ProductImageDTO.builder()
                        .productId(id)
                        .imageUrl(filename)
                        .build()));
            }
            return ResponseEntity.ok(productImages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private String storeFile(MultipartFile file) throws IOException {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        // Add UUID in forward of file name to make it unique
        String uniqueFilename = UUID.randomUUID().toString() + " " + filename;
        // Path to folder storing file
        java.nio.file.Path uploadDir = Paths.get("upload");
        // Check and create folder if it doesnt exist
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        // path to destination file
        java.nio.file.Path destination = Paths.get(uploadDir.toString(), uniqueFilename);
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFilename;
    }

    // http://localhost:9090/api/v1/products?page=1&limit=10
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getProducts(
            @RequestParam("page") int page,
            @RequestParam("limit") int limit
    ) {
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        Page<ProductResponse> productPage = productService.getAllProducts(pageRequest);
        int totalPages = productPage.getTotalPages();

        Map<String, Object> response = new HashMap<>();
        response.put("products", productPage.getContent());
        response.put("totalPages", totalPages);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") long productId) {
        try {
            return ResponseEntity.ok(productService.getProductById(productId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable long id) {
        // giong voi ResponseEntity.ok()
        // return ResponseEntity.status(HttpStatus.OK).body("Product deleted
        // successfully");
        // Dung cai binh thuong hay hon
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted with id " + id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable long id, @Valid @ModelAttribute ProductDTO productDTO) {
        try {
            productService.updateProduct(id, productDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("Product with id " + id + " is updated");
    }
    @PostMapping("/generateFakeProducts")
    public ResponseEntity<String> generateFakeProducts(){
        Faker faker = new Faker();
        for(int i = 0; i < 5000; i++){
            String productName =faker.commerce().productName();
            if(productService.existsByName(productName)){
                continue;
            }
            ProductDTO productDTO = ProductDTO.builder()
                    .name(productName)
                    .price((float)faker.number().numberBetween(50_000, 50_000_000))
                    .description(faker  .lorem().sentence())
                    .build();
            try {
                productService.createProduct(productDTO);
            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
        return ResponseEntity.ok("Fake products generated successfully");
    }
}