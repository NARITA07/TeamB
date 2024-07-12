(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("OB_001");
            this.set_enable("true");
            this.set_visible("true");
            this.set_titletext("주문게시판");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_searchCombo", this);
            obj._setContents("<ColumnInfo><Column id=\"CD_VAL\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_ordStatCombo", this);
            obj._setContents("<ColumnInfo><Column id=\"CD_VAL1\" type=\"STRING\" size=\"256\"/><Column id=\"CD_NM1\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_searchList", this);
            obj._setContents("<ColumnInfo><Column id=\"ORD_NO\" type=\"STRING\" size=\"256\"/><Column id=\"CUST_NM\" type=\"STRING\" size=\"256\"/><Column id=\"COMP_YN\" type=\"STRING\" size=\"256\"/><Column id=\"ORD_STAT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"CUST_GBCD\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"ORD_NO\" type=\"STRING\" size=\"256\"/><Column id=\"ORD_STAT_NM\" type=\"STRING\" size=\"256\"/><Column id=\"CUST_NO\" type=\"STRING\" size=\"256\"/><Column id=\"CUST_NM\" type=\"STRING\" size=\"256\"/><Column id=\"CUST_GBCD_NM\" type=\"STRING\" size=\"256\"/><Column id=\"PHONE\" type=\"STRING\" size=\"256\"/><Column id=\"ADDR\" type=\"STRING\" size=\"256\"/><Column id=\"ITEM_NM\" type=\"STRING\" size=\"256\"/><Column id=\"REG_DT\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_delList", this);
            obj._setContents("<ColumnInfo><Column id=\"ORD_NO\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("sta02","99","0","1182","100",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_border("1px solid");
            this.addChild(obj.name, obj);

            obj = new Static("sta00","0","0","100","100",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("검색 조건");
            obj.set_font("bold 16px/normal \"Gulim\"");
            obj.set_textAlign("center");
            obj.set_background("ivory");
            obj.set_border("1px solid black");
            this.addChild(obj.name, obj);

            obj = new Button("btn_regOrd","19","110","81","26",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("주문등록");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_ordNo","201","8","199","33",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_inputtype("number");
            this.addChild(obj.name, obj);

            obj = new Static("sta01","102","8","96","34",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("주문 번호");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new CheckBox("chk_cmpYn","544","8","57","37",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            this.addChild(obj.name, obj);

            obj = new Static("sta01_00","420","8","96","34",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("법인고객여부");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Combo("cbo_ordStat","543","53","155","35",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_innerdataset("ds_ordStatCombo");
            obj.set_codecolumn("CD_VAL1");
            obj.set_datacolumn("CD_NM1");
            obj.set_displaynulltext("선택");
            obj.set_text("");
            obj.set_index("-1");
            this.addChild(obj.name, obj);

            obj = new Static("sta01_00_00","420","53","96","34",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("주문 상태");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Radio("rdo_custGb","842","2","163","46",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            var rdo_custGb_innerdataset = new nexacro.NormalDataset("rdo_custGb_innerdataset", obj);
            rdo_custGb_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">P</Col><Col id=\"datacolumn\">개인</Col></Row><Row><Col id=\"codecolumn\">C</Col><Col id=\"datacolumn\">법인</Col></Row><Row><Col id=\"codecolumn\">R</Col><Col id=\"datacolumn\">임직원</Col></Row></Rows>");
            obj.set_innerdataset(rdo_custGb_innerdataset);
            this.addChild(obj.name, obj);

            obj = new Static("sta01_00_01","720","8","96","34",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("고객 구분");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Grid("grd_ordList","8","149","892","563",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_binddataset("ds_list");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"160\"/><Column size=\"60\"/><Column size=\"60\"/><Column size=\"79\"/><Column size=\"62\"/><Column size=\"108\"/><Column size=\"164\"/><Column size=\"80\"/><Column size=\"118\"/></Columns><Rows><Row size=\"37\" band=\"head\"/><Row size=\"31\"/></Rows><Band id=\"head\"><Cell text=\"주문번호\"/><Cell col=\"1\" text=\"주문상태\"/><Cell col=\"2\" text=\"고객번호\"/><Cell col=\"3\" text=\"고객명\"/><Cell col=\"4\" text=\"고객구분\"/><Cell col=\"5\" text=\"전화번호\"/><Cell col=\"6\" text=\"주소\"/><Cell col=\"7\" text=\"상품명\"/><Cell col=\"8\" text=\"주문일시\"/></Band><Band id=\"body\"><Cell text=\"bind:ORD_NO\" textAlign=\"center\"/><Cell col=\"1\" text=\"bind:ORD_STAT_NM\" textAlign=\"center\"/><Cell col=\"2\" text=\"bind:CUST_NO\" textAlign=\"center\"/><Cell col=\"3\" text=\"bind:CUST_NM\" textAlign=\"center\"/><Cell col=\"4\" text=\"bind:CUST_GBCD_NM\" textAlign=\"center\"/><Cell col=\"5\" text=\"bind:PHONE\" textAlign=\"center\"/><Cell col=\"6\" text=\"bind:ADDR\" textAlign=\"center\"/><Cell col=\"7\" text=\"bind:ITEM_NM\" textAlign=\"center\"/><Cell col=\"8\" text=\"bind:REG_DT\" textAlign=\"center\" calendardateformat=\"yyyy-MM-dd HH:mm:ss\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_custNm","201","55","199","33",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_inputtype("normal");
            this.addChild(obj.name, obj);

            obj = new Static("sta01_01","102","53","96","34",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("고객명");
            obj.set_textAlign("center");
            obj.set_font("14px/normal \"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Button("btn_updOrd","109","110","81","26",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("주문수정");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new Button("btn_delOrd","199","110","81","26",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("주문삭제");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new Button("btn_selectOrd","1185","11","79","77",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_text("조 회");
            obj.set_visible("true");
            obj.set_background("#05599d");
            obj.set_color("#f9f9f9");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("OB_001.xfdl", function() {
        /************************************************************************************************
         * 각 COMPONENT 별 EVENT 영역
         ************************************************************************************************/
        this.OB_001_onload = function(obj,e)
        {
        	//alert("onload 함수 실행");

        	//OB_001.xfdl이 화면에 로드될 떄 검색 조건의 주문상태 콤보박스를 초기화 시켜준다.
        	//서버에 요청을 하기 전에 서버로 전달해줘야할 인자값은 뭐가 있을지 생각해야한다.
        	//-->주문 상태값만을 불러오기 위해선 TB_CD_MST 테이블 WHERE 절에  CD_VAL = '001' 이라는 조건을 걸어줘야한다.
        	//따라서 DATASET에 001이라는 값을 넣어 서버로 전달해보자.

        	//ds_searchCombo 데이터셋을 생성하고 서버로 전달한 인자값을 추가해보자.
        	this.ds_searchCombo.clearData(); // 데이터셋 초기화
        	this.ds_searchCombo.addRow();    // 데이터셋에 값을 세팅하기 위해 1줄의 ROW를 추가
        	this.ds_searchCombo.setColumn(0,"CD_VAL","001"); // 추가된 0번쨰 ROW의 CD_VAL 컬럼에 001이라는 값을 세팅한다.

        	//서버로 데이터를 전송한다.
        	//서버로 데이터를 전송하기 전 필요한 값들을 세팅한다.
        	var strSvcId    = "selectCommonCode";                // 넥사크로에서 transaction을 구분하기 위한 id값 이 id는 차후 fnCallback 함수에서 쓰인다.
        	var strSvcUrl   = "selectCommonCode.do";             // Java Controller에서 이 주소를 식별하여 요청을 처리한다.
        	var inData      = "ds_search=ds_searchCombo";        // 서버로 전송할 데이터셋 세팅 = 문자 기준 왼쪽이 서버 오른쪽이 프론트 데이터셋이다.
        														 // 프론트의 ds_searchCombo를 서버의 ds_search 값을 대입하겠다는 의미이다.
        	                                                     // 서버측(.java)에도 = 기준 왼쪽 데이터셋명(ds_search)과 반드시! 동일하게 명명해야한다.
        	var outData     = "ds_ordStatCombo=ds_commonCode";   // 서버로부터 값을 전달받을 데이터셋 세팅
        	                                                     // 위와는 반대로 = 문자 기준 왼쪽이 프론트 오른쪽이 서버 데이터셋이다.
        														 // 서버의 ds_commonCode 서버의 ds_ordStatCombo로 값을 대입하겠다는 의미이다.
        														 // 서버측(.java)에도 = 기준 오른쪽 데이터셋명(ds_commonCode)과 반드시! 동일하게 명명해야한다.
        	var strArg      = "";                                // 데이터셋이 아닌 값을 보낼떄 쓰는 필드지만 데이터셋을 쓰는걸로 통일하자.
        	var callBackFnc = "fnCallback"; //프레임웍 사이클의 9번에 해당한다. 서버로 부터 값을 받은 이후 프론트에서 이행해야할 작업 코드를
        	                                // fnCallback 함수에서 작성한다.

        	//넥사크로 N에서 제공하는 서버로 요청하는 공통함수를 쓴다.
        	this.gfnTransaction( strSvcId  ,
        						 strSvcUrl ,
        						 inData  ,
        						 outData ,
        						 strArg  ,
        						 callBackFnc); 	// 세팅한 값을 담아 서버로 데이터 전송
        };

        this.btn_selectOrd_onclick = function(obj,e)
        {
        	// alert("주문리스트 조회");
        	// 1. 조회 버튼을 클릭했을 때 우리는 DB에서 데이터를 조회하여 값을 그리드에 뿌려줘야한다.
        	// 그렇다면 프론트에서 우리는 어떤 값들을 만들어 서버로 보내줘야할까?
        	// 바로 검색조건에 있는 값들을 담아 보내줘야한다.
        	// 이 값들을 주문 리스트 조회 시 where 절에 넣어줘야 알맞은 데이터를 가져올 수 있기 때문이다.
        	// 따라서, 검색 조건들을 ds_searchList라는 데이터셋을 만들어 값을 세팅해주는 작업을 해보자.
        	this.ds_searchList.clearData();
        	this.ds_searchList.addRow();
        	this.ds_searchList.setColumn(0,"ORD_NO",this.edt_ordNo.value);
        	this.ds_searchList.setColumn(0,"CUST_NM",this.edt_custNm.value);
        	this.ds_searchList.setColumn(0,"COMP_YN",this.chk_cmpYn.value);
        	this.ds_searchList.setColumn(0,"ORD_STAT_CD",this.cbo_ordStat.value);
        	this.ds_searchList.setColumn(0,"CUST_GBCD",this.rdo_custGb.value);

        	trace("로그 남기기(크롬의 console.log기능과 같음)");
        	trace("ORD_NO      : " + this.ds_searchList.getColumn(0,"ORD_NO"));
        	trace("CUST_NM     : " + this.ds_searchList.getColumn(0,"CUST_NM"));
        	trace("COMP_YN     : " + this.ds_searchList.getColumn(0,"COMP_YN"));
        	trace("ORD_STAT_CD : " + this.ds_searchList.getColumn(0,"ORD_STAT_CD"));
        	trace("CUST_GBCD   : " + this.ds_searchList.getColumn(0,"CUST_GBCD"));

        	// 2. 추가로, 우리는 서버에서 가져온 주문 리스트를 그리드에 보여줘야한다.
        	// 앞서 우리는 임의로 그리드에 값을 세팅했지만, ds_list라는 데이터셋을 만들어 바인딩함으로써
        	// 그리드가 서버로 부터 가져오는 ds_list값을 유기적으로 보여주도록 만들어줄 것이다.

        	// 3. 이제 onload 함수에서 했던것과 동일하게 this.gfnTransaction함수를 써서 서버로 데이터를 전송하고 받아보자.
        	// 서버로 selectOrdList.do라는 URL 요청에 ds_searchList값을 담아 전송하여 ds_list라는 결과값을 회신받는 요청을 만든다.
        	var strSvcId    = "selectOrdList";
        	var strSvcUrl   = "selectOrdList.do";
        	var inData      = "ds_searchList=ds_searchList";     // 프론트 데이터셋과 서버측 데이터셋 명을 동일하게 지정할 수도 있다.
        	var outData     = "ds_list=ds_list";
        	var strArg      = "";
        	var callBackFnc = "fnCallback";

        	this.gfnTransaction( strSvcId  ,
        						 strSvcUrl ,
        						 inData  ,
        						 outData ,
        						 strArg  ,
        						 callBackFnc);
        };

        this.btn_regOrd_onclick = function(obj,e)
        {
        	//alert("주문 등록 팝업 오픈");
        	var oArg = {};//팝업을 열 때 부모창에서 가져갈 데이터가 있데면 데이터 세팅
        	              //주문등록시에는 가져갈 데이터가 없으므로 공란으로 지정
        	              //ex) paramTitle:"가나다라", paramCode:"abcd", paramNum:12345
        	var oOption = {};	//top, left를 지정하지 않으면 가운데정렬 //"top=20,left=370"
        	var sPopupCallBack = "fnPopupCallback"; //팝업창을 닫았을 때 후처리 로직 작성하기 위한 callBack 함수 지정
        	this.gfnOpenPopup( "popup","Board::OB_001_01.xfdl",oArg,sPopupCallBack,oOption);//팝업으로 띄울 화면 지정 후 팝업 open

        };

        this.btn_updOrd_onclick = function(obj,e)
        {
        	//alert("주문 수정 팝업 오픈");
        	//그리드에서 현재 선택된 ROW의 ORD_NO 주문번호를 가져온다.
        	var ordNo = this.ds_list.getColumn(this.ds_list.rowposition,"ORD_NO");

        	var oArg = {ordNo:ordNo};
        	var oOption = {};
        	var sPopupCallBack = "fnPopupCallback";
        	this.gfnOpenPopup( "popup","Board::OB_001_02.xfdl",oArg,sPopupCallBack,oOption);
        };

        this.btn_delOrd_onclick = function(obj,e)
        {
        	//alert("주문 삭제 진행");
        	//그리드에서 현재 선택된 ROW의 ORD_NO 주문번호를 가져온다.
        	var ordNo = this.ds_list.getColumn(this.ds_list.rowposition,"ORD_NO");

        	//서버로 전송하기 위한 데이터셋 세팅
            this.ds_delList.clearData();
        	this.ds_delList.addRow();
        	this.ds_delList.setColumn(0,"ORD_NO",ordNo);

        	// 서버로 deleteOrdList.do라는 URL 요청에 ds_delList값을 담아 전송한다.
        	var strSvcId    = "deleteOrdList";
        	var strSvcUrl   = "deleteOrdList.do";
        	var inData      = "ds_delList=ds_delList";
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

        this.grd_ordList_oncelldblclick = function(obj,e)
        {
        	//그리드 더블클릭시 진행할 스크리트 작성
        };

        this.chk_cmpYn_onchanged = function(obj,e)
        {
        	alert("onchanged 함수 실행 완료");
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
        			this.ds_ordStatCombo.insertRow(0);//0번째 ROW에 라인 삽입 추가
        			this.ds_ordStatCombo.setColumn(0,"CD_VAL1",""); //해당 ROW에 값 추가
        			this.ds_ordStatCombo.setColumn(0,"CD_NM1","전체");
        			break;

        		case "deleteOrdList":
        			alert("삭제 완료");
        			break;
        	}
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.OB_001_onload,this);
            this.btn_regOrd.addEventHandler("onclick",this.btn_regOrd_onclick,this);
            this.chk_cmpYn.addEventHandler("onchanged",this.chk_cmpYn_onchanged,this);
            this.grd_ordList.addEventHandler("oncelldblclick",this.grd_ordList_oncelldblclick,this);
            this.btn_updOrd.addEventHandler("onclick",this.btn_updOrd_onclick,this);
            this.btn_delOrd.addEventHandler("onclick",this.btn_delOrd_onclick,this);
            this.btn_selectOrd.addEventHandler("onclick",this.btn_selectOrd_onclick,this);
        };
        this.loadIncludeScript("OB_001.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
