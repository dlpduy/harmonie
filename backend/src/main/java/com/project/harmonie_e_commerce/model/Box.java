package com.project.harmonie_e_commerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name = "boxes"
)
public class Box {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "storeDiscount_id")
    private StoreDiscount storeDiscount;

    @ManyToOne
    @JoinColumn(name = "shippingDiscount_id")
    private ShippingDiscount shippingDiscount;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "shipper_name", length = 50,nullable = false)
    private String shipper_name;

    @Column(name = "shipper_phone", length = 10,nullable = false)
    private String shipper_phone;

    @Column(name = "total_price", columnDefinition = "DECIMAL(10,2)", nullable = false)
    private Float total_price;
    
    @Column(name = "fee_ship", columnDefinition = "DECIMAL(10,2)", nullable = false)
    private Float fee_ship;

    @Column(name = "predicted_delivery_date")
    private Date predicted_delivery_date;

    @Column(name = "caution", columnDefinition = "TEXT")
    private String caution;

    @Column(name = "packing_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp packing_date;

    @Column(name = "status", columnDefinition = "ENUM('Pending', 'Shipped', 'Delivered') DEFAULT 'Pending'")
    @Enumerated(EnumType.STRING)
    private BoxStatus status;


    public enum BoxStatus{
        Pending, Shipped, Delivered
    }
}
