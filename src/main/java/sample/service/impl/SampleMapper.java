package sample.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("sampleMapper")
public interface SampleMapper {    
    List<Map<String,Object>> selectCombo();
    List<Map<String,Object>> selectMst(Map<String,String> param);
    List<Map<String,Object>> selectDtl(Map<String,String> param);
    
}