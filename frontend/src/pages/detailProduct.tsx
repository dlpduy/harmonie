import React, { useEffect, useState } from 'react';
import '../styles/ProductDetailPage.css';

const ProductDetailPage = () => {

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
        imageUrls: string[];
        variants: string[];
        avg_rating: number;
        rating_count: number;
        buying_count: number;
        reviews: Review[];
    }

    const [product, setProduct] = useState<Product | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const reviewsPerPage = 3; // Số bài review hiển thị trên mỗi trang
    const [totalReviews, setTotalReviews] = useState<number>(0);

    useEffect(() => {
        // Sample product data
        const sampleProduct: Product = {
            id: 1,
            name: "Sample Product",
            description: "This is a sample product description.",
            price: 99.99,
            imageUrls: [
                "https://via.placeholder.com/300",
                "https://via.placeholder.com/300",
                "https://via.placeholder.com/300"
            ],
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

    useEffect(() => {
        if (product) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imageUrls.length);
            }, 5000); // Change image every 5 seconds

            return () => clearInterval(interval); // Cleanup interval on component unmount
        }
    }, [product]);

    if (!product) return <p>Loading...</p>;

    const handleVariantClick = (variant: string) => {
        setSelectedVariant(variant);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} of ${product.name} (${selectedVariant}) to cart.`);
    };

    const handleBuyNow = () => {
        console.log(`Bought ${quantity} of ${product.name} (${selectedVariant}).`);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imageUrls.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.imageUrls.length) % product.imageUrls.length);
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = product.reviews.slice(indexOfFirstReview, indexOfLastReview);

    // Tính toán tổng số trang
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);

    // Chuyển đến trang tiếp theo hoặc trang trước
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const { id, name, description, price, imageUrls, variants, avg_rating, rating_count, buying_count } = product;

    return (
        <div className="product-detail-page1">
            <div className='product-container'>
                <div className="product-images">
                    <button onClick={handlePrevImage} className='prev-button'><img src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8SExMAAAAODw/8/Py0tLRpamrIyMgLDQ3MzMxjZGRJSUlRUlLMzc1OT09nZ2ednp5+fn7W1tbt7e1fX1/m5uaIiIiZmZmOjo5ERUXe3t5+f3+kpKQ9Pj40NDR0dHT8wWG/AAACRElEQVR4nO3d7U4bMRBG4d3ZNA2BAuGjQKHl/u+yVBRB1v5pa5Tj81zBvPLMjqNklWmSJEmSJEmSJEmSJEmSJHVz+7K/vLu+zy6jn+t49zO7kF62scz/LHGXXUofVzF/iIfsYnrYfgacl+U2u5z29l8Cvh3it+x6mjsOOPMeNtvjgHMcsitqbB1wjsfsktrarwPOcZNdU1OVgE/ZNTVVtOjbyv+RXVRLV5WAqF1RtigsIP4EazOICohvUXxAfIviHzL4FsWfoDN46vAziG9RfEB8i+ID4lvUNXHq8CeIn0F8i+ID4lsUHxDfoviA+BbFL3p8i+JPED+D+BbFB8S3KD4gvkVdE6cOf4L4GcS3KD4gvkXxAfEt6po4dfgTxM8gvkXxAfEt+kgPeP//BUlswOlhfYS0gOUmpAWcLtdv2MHePyufpEt8zy6psWIOd7SIv4pn6S7Osotq65n+mt00XVQishp1c15EpM1iNSJrFje1RoVFXO/9QWZxgFOEReQvjWnQpTHA7QY2i4MuDVjE8hRxe9FZBBj1Asfai17gCLzAEbg0CPzUTzDCJ40BZnGApeEsAjiLBF7gCLzAEbg0EFwaACPMol/bAIw6iwOcIiwi/wI36tc2rEb1AkfgBY6gujRYf/JYadS4yC6qrVpE1n92VRoV995bERH333lFo/ISriPGS3ZB7R01Km1dvPu6+uM5u5ouPhs1fmfX0sshIna7iP0mu5Jubg7nf55eYT/sW+MenyRJkiRJkiRJkiRJkqTe/gJnohmT3JAaLwAAAABJRU5ErkJggg==    '/></button>
                    <img src={imageUrls[currentImageIndex]} alt={`${name} ${currentImageIndex + 1}`} />
                    <button onClick={handleNextImage} className='next-button'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8SExMAAACjo6NtbW2RkZGOjo5xcXGUlZWLi4uQkJD5+flra2tbW1sAAwMNDg7w8PDZ2dlQUVGwsLBkZGS3t7c0NDTT09NKSkoWFxepqaktLS3Gx8d9fX29vb2fn59AQUHm5uY6BJkhAAACN0lEQVR4nO3d7U4CMRSE4d0jggjsoiLiN97/TboaE4Wu/7ppOvM+V3AmnWMhpto0AAAAAAAAAAAAAAAAAID/3cw3t+u7VekxprOLiC6ivy89yERW+2i/9XFZepZpzH4CDjQjPvwGHCJelR5nAsu/CSVPcXOSUDHioWvFI65Pz1BwFy/OE8qd4vaxTyJelx4qr6fkEOWKuhyJKFZUg4hz/Yhjpyi2iwanaBpRrKgGu8ilocBgFw1O0XQXxYrKpaHA4MeNwS4anCK7qMDg0jA4RSIqMNhF00tD7Nc2ph/gxCKa7qJYRINLw+AUTSOKFdVgF7k0FBjsosEpmu6iWFENLg3Tr8TsYm0MTtH00hCLaHppiJ2iaUSxoo7totgTzTRi/yz20DYtaryUnimzJGLMS4+U2+b8Zd9r6YkyS569xbL0SHmNvOt7Kz1TVmnAvt2WHiqnNGAb76WHymks4KL0UDmNBZyVHiony4BUtCaWAeUrKh9QvqLr0kPlREVrR8DasYO1swwoX1H5gPIVlQ9IRWtCwNpZ7qD8F14qWhPLgPIVlQ9IRWtiGVC+ovIB5Ssq/1lUvqLyAeV3UD4gFa2JZUD5isoHlK+ofEAqWhP5gGP/Skcq4Iv6Dq6euySg1Bfe5i592yNV0aZZJM+zpCo6uD1/YacWMPn/h2IVHbyGeMDTy0Kvol92IX2Cg20b0ic42B4jur4LrQeSp97Wx/1h+VF6jGmJ/TUEAAAAAAAAAAAAAAAAAPX4BFCyFP+Yt8tNAAAAAElFTkSuQmCC'></img></button>
                </div>
                <div className="product-details">
                    <p className='name'>{name}</p>
                    <p>{description}</p>
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