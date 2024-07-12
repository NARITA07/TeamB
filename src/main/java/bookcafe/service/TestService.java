package bookcafe.service;

import java.util.ArrayList;
import java.util.Map;

public interface TestService {

	ArrayList<Map<String, Object>> selectCommonCode(Map<String, Object> ds_sc);

	ArrayList<Map<String, Object>> selectOrdList(Map<String, Object> ds_scList);

}
