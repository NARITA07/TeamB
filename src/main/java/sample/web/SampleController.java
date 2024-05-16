package sample.web;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;

import sample.service.SampleService;

@Controller
public class SampleController {
  private Logger logger = LoggerFactory.getLogger(SampleController.class);

	@Resource(name="txManager")
	PlatformTransactionManager transationManager;
	
	@RequestMapping(value = "/selectDtl.do")
    public NexacroResult selectDtl(@ParamDataSet(name = "ds_search", required = false) Map<String,String> ds_search) {    	    	
	
	    NexacroResult result = new NexacroResult();
	
	    return result;
    }
}