package sample.service;

import java.util.List;
import java.util.Map;

public interface SampleService {
    List<Map<String,Object>> selectCombo();
    List<Map<String,Object>> selectMst(Map<String,String> param);
    List<Map<String,Object>> selectDtl(Map<String,String> param);

}