package com.project.harmonie_e_commerce.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;
    @Column(name = "name", nullable = false)
    private String name;
    private String brand;
    private Float price;
    private Long quantity;
    private Long views;
    @Column(name = "buying_count")
    private Long buyingCount;
    @Column(name = "description")
    private String description;
    @Column(name = "rating_count")
    private Long ratingCount;
    @Column(name = "avg_rating")
    private Float AvgRating;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
