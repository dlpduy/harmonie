    import React, { useEffect, useState } from 'react';
    import '../styles/ProductDetailPage.css';



    const ProductDetailPage = ({ }) => {

        interface Review {
            user: string;
            rating: number;
            comment: string;
            date: string;
        }
        
        interface Product {
            id: number;
            name: string;
            description: string;
            price: number;
            imageUrl: string;
            variants: string[];
            avg_rating: number;
            rating_count: number;
            buying_count: number;
            reviews: Review[];
        }

        const [product, setProduct] = useState<Product | null>(null);
        const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
        const [quantity, setQuantity] = useState<number>(1);

        const [currentPage, setCurrentPage] = useState<number>(1);
        const reviewsPerPage = 3; // Số bài review hiển thị trên mỗi trang
        const [totalReviews, setTotalReviews] = useState<number>(0);

        /*"useEffect(() => {
            fetch('https://5fb2e9c4-bfad-48ee-844c-44101b0784f2.mock.pstmn.io/product/1')
                .then(response => response.json())
                .then(data => setProduct(data))
                .catch(error => console.error("Error fetching product:", error));
        }, []);*/

        useEffect(() => {
            // Sample product data
            const sampleProduct: Product = {
                id: 1,
                name: "Sample Product",
                description: "This is a sample product description.",
                price: 99.99,
                imageUrl: "https://via.placeholder.com/300",
                variants: ["Variant 1", "Variant 2", "Variant 3", " Variant 4", "Variant 5", "Variant 6", "Variant 7", "Variant 8", "Variant 9", " Variant 10", "Variant 11", "Variant 12"],
                avg_rating: 1.5,
                rating_count: 120,
                buying_count: 350,
                reviews: [
                    { user: "John Doe", rating: 4.5, comment: "Great product, I love it!", date: "2024-11-28" },
                    
                ]
            };

            // Simulate fetching data
            setTimeout(() => {
                setProduct(sampleProduct);
                setTotalReviews(sampleProduct.reviews.length);
            }, 1000);
        }, []);
        if (!product) return <p>Loading...</p>;

        const handleVariantClick = (variant: string) => {
            setSelectedVariant(variant);
        };
        const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setQuantity(Number(event.target.value));
        };

        const handleAddToCart = () => {
            console.log(`Added ${quantity} of ${name} (${selectedVariant}) to cart.`);
        };

        const handleBuyNow = () => {
            console.log(`Bought ${quantity} of ${name} (${selectedVariant}).`);
        };

        const indexOfLastReview = currentPage * reviewsPerPage;
        const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
        const currentReviews = product.reviews.slice(indexOfFirstReview, indexOfLastReview);
    
        // Tính toán tổng số trang
        const totalPages = Math.ceil(totalReviews / reviewsPerPage);
    
        // Chuyển đến trang tiếp theo hoặc trang trước
        const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
        
        const { id, name, description, price, imageUrl, variants, avg_rating, rating_count, buying_count } = product;
        return (
            <div className="product-detail-page1">
                <div className='product-container'>
                    <img src={imageUrl} alt={name} />
                    <div className="product-details">
                        <p className='name'>{name}</p>
                        <p >{description}</p>
                        <p>Price: ${price}</p>
                        {variants && variants.length > 0 && (
                            <div className="product-variants">
                                <h3>Mẫu mã:</h3>
                                <div className="variant-buttons">
                                    {variants.map((variant: string, index: number) => (
                                        <button
                                            key={index}
                                            className={`variant-button ${selectedVariant === variant ? 'selected' : ''}`}
                                            onClick={() => handleVariantClick(variant)}
                                        >
                                            {variant}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="quantity">
                            <label htmlFor="quantity">Số lượng:</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                            />
                        </div>
                        <div className="action-buttons">
                            <button className="add-to-cart-button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                            <button className="buy-now-button" onClick={handleBuyNow}>Mua ngay</button>
                        </div>

                    </div>

                </div>

                
                <div className="review-section">
                <h3>Đánh giá sản phẩm</h3>
                <div className="review-details">
                    <p><strong>Đánh giá trung bình:</strong>  {avg_rating} ★</p>
                    <p><strong>Số lượng đánh giá:</strong> {rating_count}</p>
                    <p><strong>Số lượng mua:</strong> {buying_count}</p>
                </div>

                <h4>Bài đánh giá:</h4>
                <div className="reviews-list">
                    {currentReviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <div className="review-header">
                                <span className="review-user">{review.user}</span>
                                <span className="review-date">{review.date}</span>
                            </div>
                            <div className="review-rating">
                                 {review.rating} ★
                            </div>
                            <p className="review-comment">{review.comment}</p>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="pagination">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
                </div>
            </div>
        );
    };

    export default ProductDetailPage;

    function setQuantity(arg0: number) {
        throw new Error('Function not implemented.');
    }
