package sample.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import sample.service.SampleService;

@Service("sampleService")
public class SampleServiceImpl extends EgovAbstractServiceImpl implements SampleService {
	private Logger logger = LoggerFactory.getLogger(SampleServiceImpl.class);
  
    @Resource(name = "sampleMapper")
    private SampleMapper mapper;

    @Override
    public List<Map<String,Object>> selectCombo() {
    	return mapper.selectCombo();
    }

    @Override
    public List<Map<String,Object>> selectMst(Map<String,String> param) {
    	return mapper.selectMst(param);
    }

    @Override
    public List<Map<String,Object>> selectDtl(Map<String,String> param) {
    	return mapper.selectDtl(param);  
    }     
    
}