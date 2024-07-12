(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("OB_001_01");
            this.set_titletext("주문등록팝업");
            if (Form == this.constructor)
            {
                this._setFormPosition(402,400);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_searchCustGb", this);
            obj._setContents("<ColumnInfo><Column id=\"CD_VAL\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_custGbCombo", this);
            obj._setContents("<ColumnInfo><Column id=\"CD_VAL1\" type=\"STRING\" size=\"256\"/><Column id=\"CD_NM1\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_itemCombo", this);
            obj._setContents("<ColumnInfo><Column id=\"CD_VAL1\" type=\"STRING\" size=\"256\"/><Column id=\"CD_NM1\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_regOrd", this);
            obj._setContents("<ColumnInfo><Column id=\"CUST_NM\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE\" type=\"STRING\" size=\"256\"/><Column id=\"BIR_BIZ_NO\" type=\"STRING\" size=\"256\"/><Column id=\"ADDR\" type=\"STRING\" size=\"256\"/><Column id=\"CUST_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"ITEM_CD\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("sta01_01","19","45","146","34",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("고객명");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_custNm","178","47","199","33",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_inputtype("normal");
            this.addChild(obj.name, obj);

            obj = new Static("sta01_01_00","19","86","146","34",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("휴대폰번호");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_phone","178","88","199","33",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_inputtype("number");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_birBizNo","178","129","199","33",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_inputtype("number");
            this.addChild(obj.name, obj);

            obj = new Static("sta01_01_00_00","19","127","146","34",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("생년월일/사업자번호");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_addr","178","170","199","33",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_inputtype("normal");
            this.addChild(obj.name, obj);

            obj = new Static("sta01_01_00_00_00","19","168","146","34",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("주소");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo_custGbNm","179","211","155","35",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_innerdataset("ds_custGbCombo");
            obj.set_codecolumn("CD_VAL1");
            obj.set_datacolumn("CD_NM1");
            obj.set_displaynulltext("선택");
            obj.set_text("");
            obj.set_index("-1");
            this.addChild(obj.name, obj);

            obj = new Static("sta01_00_00","44","209","96","34",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Gulim\"");
            obj.set_text("고객구분");
            this.addChild(obj.name, obj);

            obj = new Static("sta01_00_00_00","44","254","96","34",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("주문상품");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo_itemNm","179","256","155","35",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_innerdataset("ds_itemCombo");
            obj.set_codecolumn("CD_VAL1");
            obj.set_datacolumn("CD_NM1");
            obj.set_displaynulltext("선택");
            obj.set_text("");
            obj.set_index("-1");
            this.addChild(obj.name, obj);

            obj = new Button("btn_regOrd","55","314","133","56",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("주문등록");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new Button("btn_exit","212","314","133","56",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("닫기");
            obj.set_visible("true");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",402,400,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("OB_001_01.xfdl", function() {

        this.OB_001_01_onload = function(obj,e)
        {
        	//alert("onload 함수 실행");
        	//주문 등록을 위해 고객구분, 주문상품 콤보박스 안의 데이터를 TB_CD_MST 테이블과 TB_ITEM 테이블에서 조회하여 값을 채워주자.
        	// 1. 고객구분 콤보박스에 출력할 데이터들을 TB_CD_MST 테이블로부터 값을 조회해 오자.
        	// 이 로직은 앞서 OB_001.xfdl onload에서 만든 경험이 있다. 이미 만들어둔 서버 로직 그대로 쓰면된다.
        	// 우리는 단지 프론트 코딩을 통해 TB_CD_MST 테이블 SELECT 시 WHERE절에 필요한 값을 서버로 넘겨주면 된다.
        	// 코딩을 하며 이해해보자.
        	this.fn_setCustGbCbo();

        	// 2. 주문상품 리스트를 TB_ITEM 테이블로부터 조회하여 콤보박스 안의 데이터를 채워주자.
        	// 방법은 위 TB_CD_MST 테이블을 조회해 오는 방식과 유사하다.
        	this.fn_setItemCbo();
        };


        this.btn_regOrd_onclick = function(obj,e)
        {
        	//alert("주문 등록 버튼 클릭");
        	//1. 주문등록을 위해 입력받은 6개의 값을 데이터셋에 담아 서버로 전송해야 한다.
        	// 따라서, 데이터셋을 만들고 사용자가 입력한 6개의 값을 세팅한다.
        	this.ds_regOrd.clearData();
        	this.ds_regOrd.addRow();
        	this.ds_regOrd.setColumn(0,"CUST_NM",this.edt_custNm.value);
        	this.ds_regOrd.setColumn(0,"PHONE",this.edt_phone.value);
        	this.ds_regOrd.setColumn(0,"BIR_BIZ_NO",this.edt_birBizNo.value);
        	this.ds_regOrd.setColumn(0,"ADDR",this.edt_addr.value);
        	this.ds_regOrd.setColumn(0,"CUST_GBCD",this.cbo_custGbNm.value); //combo에서 .value를 쓸경우 CODE를
        	this.ds_regOrd.setColumn(0,"ITEM_CD",this.cbo_itemNm.value);     //combo에서 .name을 쓸 경우 DATA를 가져온다.

        	trace(this.ds_regOrd.getColumn(0,"CUST_NM"));
        	trace(this.ds_regOrd.getColumn(0,"PHONE"));
        	trace(this.ds_regOrd.getColumn(0,"BIR_BIZ_NO"));
        	trace(this.ds_regOrd.getColumn(0,"ADDR"));
        	trace(this.ds_regOrd.getColumn(0,"CUST_GBCD"));
        	trace(this.ds_regOrd.getColumn(0,"ITEM_CD"));

        	//2. 세팅한 값을 서버로 전송한다.
        	var strSvcId    = "insertOrdList";
        	var strSvcUrl   = "insertOrdList.do";
        	var inData      = "ds_regOrd=ds_regOrd";
        	var outData     = "";// 서버로 부터 받을 값은 따로 없으니 생략하자.
        	var strArg      = "";
        	var callBackFnc = "fnCallback";

        	this.gfnTransaction( strSvcId  ,
        						 strSvcUrl ,
        						 inData  ,
        						 outData ,
        						 strArg  ,
        						 callBackFnc);
        };

        this.btn_exit_onclick = function(obj,e)
        {
        	//alert("닫기 버튼 클릭");
        	this.close();
        };

        /**************************************************************************************************
        * 사용자 정의 함수
        ***************************************************************************************************/
        this.fn_setCustGbCbo = function(obj,e)
        {
        	//trace("고객구분 콤보박스 세팅");
        	//ds_searchCustGb 데이터셋을 생성하고 서버로 전달한 인자값을 추가해보자.
        	this.ds_searchCustGb.clearData();
        	this.ds_searchCustGb.addRow();
        	this.ds_searchCustGb.setColumn(0,"CD_VAL","002"); // 고객구분은 코드가 002이다.

        	//서버로 데이터를 요청하는 부분이다.
        	// 아래 부분은 OB_001.xfdl의 onload부분을 그대로 복사해서 가져온다.
        	var strSvcId    = "selectCommonCode";
        	var strSvcUrl   = "selectCommonCode.do";
        	var inData      = "ds_search=ds_searchCustGb";   //ds_searchCombo ->  ds_searchCustGb 명칭변경
        	var outData     = "ds_custGbCombo=ds_commonCode";  //ds_ordStatCombo -> ds_custGbCombo 명칭변경
        	var strArg      = "";
        	var callBackFnc = "fnCallback";

        	//넥사크로 N에서 제공하는 서버로 요청하는 공통함수를 쓴다.
        	this.gfnTransaction( strSvcId  ,
        						 strSvcUrl ,
        						 inData  ,
        						 outData ,
        						 strArg  ,
        						 callBackFnc); 	// 세팅한 값을 담아 서버로 데이터 전송

        };

        this.fn_setItemCbo = function(obj,e)
        {
        	//trace("주문상품 콤보박스 세팅");
        	//주문 상품의 경우 프론트에서 별도로 전송해줘야할 값이 없다.
        	//서버에서 보내준 값만 받아서 주문상품 콤보박스에 바인딩만 해주면 된다.

        	var strSvcId    = "selectItemList";
        	var strSvcUrl   = "selectItemList.do";
        	var inData      = "";   //따로 전송할 데이터가 없음
        	var outData     = "ds_itemCombo=ds_itemCombo";
        	var strArg      = "";
        	var callBackFnc = "fnCallback";

        	//넥사크로 N에서 제공하는 서버로 요청하는 공통함수를 쓴다.
        	this.gfnTransaction( strSvcId  ,
        						 strSvcUrl ,
        						 inData  ,
        						 outData ,
        						 strArg  ,
        						 callBackFnc); 	// 세팅한 값을 담아 서버로 데이터 전송

        };



        /**************************************************************************************************
        * CallBack Function (서버수신)
        ***************************************************************************************************/
        this.fnCallback = function(svcID, errorCode, errorMsg)
        {
        	if(errorCode < 0){
        		alert("작업 실패 에러 코드 : " + errorCode);
        		return 0;
        	}
        	switch(svcID)
        	{
        		case "selectCommonCode":
        			trace("고객구분 콤보박스 세팅 완료");
        			break;
        		case "selectItemList":
        			trace("주문상품 콤보박스 세팅 완료");
        			break;
        		case "insertOrdList":
        			alert("주문 등록 완료");
        			this.close(); //팝업닫기
        			break;
        	}
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.OB_001_01_onload,this);
            this.btn_regOrd.addEventHandler("onclick",this.btn_regOrd_onclick,this);
            this.btn_exit.addEventHandler("onclick",this.btn_exit_onclick,this);
        };
        this.loadIncludeScript("OB_001_01.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
