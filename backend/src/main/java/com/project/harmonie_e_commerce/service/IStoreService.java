package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.StoreDTO;
// import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.Store;
import com.project.harmonie_e_commerce.response.BoxResponse;
import com.project.harmonie_e_commerce.response.ProductResponse;
import com.project.harmonie_e_commerce.response.StatisticResponse;
import com.project.harmonie_e_commerce.response.StoreDiscountRespone;

import java.util.List;

public interface IStoreService{
    Store addNewStore(StoreDTO storeDTO, Integer userId) ;

    List<ProductResponse> showAllProductInStore(Integer storeId) ;

    List<BoxResponse> showAllBoxInStore(Integer storeId) ;

    List<StoreDiscountRespone> showAllStoreDiscountInStore(Integer storeId);

    StatisticResponse getStatisticOfStore(Integer storeId, Integer day, Integer month, Integer year) ;

}
