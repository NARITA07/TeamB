(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("BasicChartContentsEditor");
            this.set_titletext("BasicChartContentsEditor");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,500);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("DS_ChartTempData", this);
            obj._setContents("<ColumnInfo><Column id=\"category\" type=\"STRING\" size=\"256\"/><Column id=\"select\" type=\"STRING\" size=\"256\"/><Column id=\"value1\" type=\"STRING\" size=\"256\"/><Column id=\"value2\" type=\"STRING\" size=\"256\"/><Column id=\"value3\" type=\"STRING\" size=\"256\"/><Column id=\"value4\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"category\">category1</Col><Col id=\"value1\">10</Col><Col id=\"value2\">10</Col><Col id=\"value3\">40</Col><Col id=\"value4\">10</Col></Row><Row><Col id=\"category\">category2</Col><Col id=\"select\">1</Col><Col id=\"value1\">20</Col><Col id=\"value2\">40</Col><Col id=\"value3\">20</Col><Col id=\"value4\">20</Col></Row><Row><Col id=\"category\">category3</Col><Col id=\"select\">1</Col><Col id=\"value1\">30</Col><Col id=\"value2\">30</Col><Col id=\"value3\">10</Col><Col id=\"value4\">40</Col></Row><Row><Col id=\"category\">category4</Col><Col id=\"value1\">40</Col><Col id=\"value2\">20</Col><Col id=\"value3\">35</Col><Col id=\"value4\">5</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("Area_Controls","0","0","180",null,null,"0",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_cssclass("left_div");
            this.addChild(obj.name, obj);

            obj = new Static("Sta_infomation","0","-1","100%","24",null,null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("0");
            obj.set_text("   Information");
            obj.set_cssclass("left_title");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Button("Expander_information","0","0","15","23",null,null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("1");
            obj.set_cssclass("btn_expand");
            obj.getSetter("expandStatus").set("expand");
            obj.getSetter("expandTarget").set("Area_information");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Div("Area_information","0","Sta_infomation:0","100.00%","162",null,null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("2");
            obj.set_background("transparent");
            obj.set_border("0px none");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Button("Btn_title","0","0","100.00%","18",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("0");
            obj.set_text("Title");
            obj.set_cssclass("left_menu1");
            obj.getSetter("classname").set("nexacro.ChartTitleControl");
            obj.getSetter("controlname").set("title");
            obj.getSetter("index").set("-1");
            obj.getSetter("subcontrol").set("false");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_title_check","17","3","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("1");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("title");
            obj.set_cssclass("btn_check");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_title_view","158","3","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("2");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("title");
            obj.set_cssclass("btn_view");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_legend","0","Btn_title:0","100.00%","18",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("3");
            obj.set_text("Legend");
            obj.set_cssclass("left_menu1");
            obj.getSetter("classname").set("nexacro.ChartLegendControl");
            obj.getSetter("controlname").set("legend");
            obj.getSetter("index").set("-1");
            obj.getSetter("subcontrol").set("false");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_legend_check","17","21","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("4");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("legend");
            obj.set_cssclass("btn_check");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_legend_view","158","21","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("5");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("legend");
            obj.set_cssclass("btn_view");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_hrangebar","0","Btn_legend:0","100.00%","18",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("6");
            obj.set_text("Hrangebar");
            obj.set_cssclass("left_menu1");
            obj.getSetter("classname").set("nexacro.ChartRangebarControl");
            obj.getSetter("controlname").set("hrangebar");
            obj.getSetter("index").set("-1");
            obj.getSetter("subcontrol").set("false");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_hrangebar_check","17","39","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("7");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("hrangebar");
            obj.set_cssclass("btn_check");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_hrangebar_view","158","39","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("8");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("hrangebar");
            obj.set_cssclass("btn_view");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_vrangebar","0","Btn_hrangebar:0","100.00%","18",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("9");
            obj.set_text("Vrangebar");
            obj.set_cssclass("left_menu1");
            obj.getSetter("classname").set("nexacro.ChartRangebarControl");
            obj.getSetter("controlname").set("vrangebar");
            obj.getSetter("index").set("-1");
            obj.getSetter("subcontrol").set("false");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_vrangebar_check","17","57","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("10");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("vrangebar");
            obj.set_cssclass("btn_check");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_vrangebar_view","158","57","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("11");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("vrangebar");
            obj.set_cssclass("btn_view");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_tooltip","0","Btn_vrangebar:0","100.00%","18",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("12");
            obj.set_text("Tooltip");
            obj.set_cssclass("left_menu1");
            obj.getSetter("controlname").set("tooltip");
            obj.getSetter("classname").set("nexacro.ChartTooltipControl");
            obj.getSetter("index").set("-1");
            obj.getSetter("subcontrol").set("false");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_tooltip_check","17","75","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("13");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("tooltip");
            obj.set_cssclass("btn_check");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_tooltip_view","158","75","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("14");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("tooltip");
            obj.set_cssclass("btn_view");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_board","0","Btn_tooltip:0","100.00%","18",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("15");
            obj.set_text("Board");
            obj.set_cssclass("left_menu1");
            obj.getSetter("controlname").set("board");
            obj.getSetter("classname").set("nexacro.ChartBoardControl");
            obj.getSetter("index").set("-1");
            obj.getSetter("subcontrol").set("false");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_board_view","158","93","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("16");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("board");
            obj.set_cssclass("btn_view");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_categoryaxis","0","Btn_board:0","100.00%","18",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("17");
            obj.set_text("Categoryaxis");
            obj.set_cssclass("left_menu1");
            obj.getSetter("controlname").set("categoryaxis");
            obj.getSetter("classname").set("nexacro.ChartCategoryAxisControl");
            obj.getSetter("index").set("-1");
            obj.getSetter("subcontrol").set("false");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_categoryaxis_view","158","111","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("18");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("categoryaxis");
            obj.set_cssclass("btn_view");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_crosshair","0","Btn_categoryaxis:0","100.00%","18",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("19");
            obj.set_text("Crosshair");
            obj.set_cssclass("left_menu1");
            obj.getSetter("controlname").set("crosshair");
            obj.getSetter("classname").set("nexacro.ChartCrosshairControl");
            obj.getSetter("index").set("-1");
            obj.getSetter("subcontrol").set("false");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_crosshair_check","17","129","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("20");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("crosshair");
            obj.set_cssclass("btn_check");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_crosshair_view","158","129","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("21");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("crosshair");
            obj.set_cssclass("btn_view");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_selection","0","Btn_crosshair:0","100.00%","18",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("22");
            obj.set_text("Selection");
            obj.set_cssclass("left_menu1");
            obj.getSetter("controlname").set("selection");
            obj.getSetter("classname").set("nexacro.ChartSelectionControl");
            obj.getSetter("index").set("-1");
            obj.getSetter("subcontrol").set("false");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_selection_check","17","147","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("23");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("selection");
            obj.set_cssclass("btn_check");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Button("Btn_selection_view","158","147","13","13",null,null,null,null,null,null,this.Area_Controls.form.Area_information.form);
            obj.set_taborder("24");
            obj.getSetter("subcontrol").set("true");
            obj.getSetter("is_rearrange").set("false");
            obj.getSetter("controlname").set("selection");
            obj.set_cssclass("btn_view");
            this.Area_Controls.form.Area_information.addChild(obj.name, obj);

            obj = new Static("Sta_valueaxes","0","Area_information:0","100.00%","24",null,null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("3");
            obj.set_text("  Valueaxes");
            obj.set_cssclass("left_title");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Button("Expander_valueaxes","0","Area_information:0","15","23",null,null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("4");
            obj.getSetter("expandStatus").set("expand");
            obj.getSetter("expandTarget").set("Area_valueaxes");
            obj.set_cssclass("btn_expand");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Button("Btn_removeValueaxis","Sta_valueaxes:-23","Sta_valueaxes:-20","18","18",null,null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("5");
            obj.set_cssclass("btn_del");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Button("Btn_appenValueaxis",null,"Sta_valueaxes:-20","18","18","Btn_removeValueaxis:4",null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("6");
            obj.set_cssclass("btn_add");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Div("Area_valueaxes","0","Sta_valueaxes:0","100.00%","120",null,null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("7");
            obj.set_background("transparent");
            obj.set_border("0px none");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Static("Sta_seriesset","0","Area_valueaxes:0","100.00%","24",null,null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("8");
            obj.set_text("  Seriesset");
            obj.set_cssclass("left_title");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Button("Expander_seriesset","0","Area_valueaxes:1","15","23",null,null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("9");
            obj.getSetter("expandTarget").set("Area_seriesset");
            obj.getSetter("expandStatus").set("expand");
            obj.set_cssclass("btn_expand");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Button("Btn_removeSeries","Sta_seriesset:-23","Sta_seriesset:-20","18","18",null,null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("10");
            obj.set_cssclass("btn_del");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Button("Btn_appenSeries",null,"Sta_seriesset:-20","18","18","Btn_removeSeries:4",null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("11");
            obj.set_cssclass("btn_add");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Button("Btn_SeriessetColor",null,"Sta_seriesset:-21","18","18","Btn_appenSeries:4",null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("12");
            obj.set_cssclass("btn_fill");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Div("Area_seriesset","0","Sta_seriesset:0","100%","50",null,null,null,null,null,null,this.Area_Controls.form);
            obj.set_taborder("13");
            obj.set_border("0px none");
            obj.set_background("transparent");
            this.Area_Controls.addChild(obj.name, obj);

            obj = new Radio("Rdo_changedata","179","0",null,"24","0",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_rowcount("1");
            obj.set_padding("0px 300px 0px 50px");
            obj.set_cssclass("chart_radio");
            var Rdo_changedata_innerdataset = new nexacro.NormalDataset("Rdo_changedata_innerdataset", obj);
            Rdo_changedata_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">0</Col><Col id=\"datacolumn\">Real Data</Col></Row><Row><Col id=\"codecolumn\">1</Col><Col id=\"datacolumn\">Sample Data</Col></Row></Rows>");
            obj.set_innerdataset(Rdo_changedata_innerdataset);
            this.addChild(obj.name, obj);

            obj = new Static("Sta_datastatusinfo",null,"5","300","15","5",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("※ The data in the chart contents editor is Sample Data, not Real Data.");
            obj.set_color("red");
            obj.set_font("7pt/normal \"맑은 고딕\"");
            this.addChild(obj.name, obj);

            obj = new BasicChart("Chart_Preview","210","25",null,null,"30","30",null,null,null,null,this);
            obj.set_taborder("3");
            this.addChild(obj.name, obj);

            obj = new PopupDiv("Popup_SeriesTemplate_Bar","212","30","56","283",null,null,null,null,null,null,this);
            obj.set_visible("false");
            obj.set_cssclass("popdiv_type");
            this.addChild(obj.name, obj);

            obj = new Div("Div00","1","1","1","1",null,null,null,null,null,null,this.Popup_SeriesTemplate_Bar.form);
            obj.set_taborder("0");
            this.Popup_SeriesTemplate_Bar.addChild(obj.name, obj);

            obj = new Button("Btn_Temp_bar","3","3","48","48",null,null,null,null,null,null,this.Popup_SeriesTemplate_Bar.form);
            obj.set_taborder("1");
            obj.getSetter("template").set("bar");
            obj.set_cssclass("btn_type01");
            obj.getSetter("prop").set("barvisible");
            this.Popup_SeriesTemplate_Bar.addChild(obj.name, obj);

            obj = new Button("Btn_Temp_stack","3","Btn_Temp_bar:3","48","48",null,null,null,null,null,null,this.Popup_SeriesTemplate_Bar.form);
            obj.set_taborder("2");
            obj.getSetter("template").set("stack");
            obj.set_cssclass("btn_type02");
            obj.getSetter("prop").set("stacktype");
            this.Popup_SeriesTemplate_Bar.addChild(obj.name, obj);

            obj = new Button("Btn_Temp_line","3","Btn_Temp_stack:3","48","48",null,null,null,null,null,null,this.Popup_SeriesTemplate_Bar.form);
            obj.set_taborder("3");
            obj.getSetter("template").set("line");
            obj.set_cssclass("btn_type03");
            obj.getSetter("prop").set("linevisible");
            this.Popup_SeriesTemplate_Bar.addChild(obj.name, obj);

            obj = new Button("Btn_Temp_point","3","Btn_Temp_line:3","48","48",null,null,null,null,null,null,this.Popup_SeriesTemplate_Bar.form);
            obj.set_taborder("4");
            obj.getSetter("template").set("point");
            obj.set_cssclass("btn_type04");
            obj.getSetter("prop").set("pointvisible");
            this.Popup_SeriesTemplate_Bar.addChild(obj.name, obj);

            obj = new Button("Btn_Temp_area","3","Btn_Temp_point:3","48","48",null,null,null,null,null,null,this.Popup_SeriesTemplate_Bar.form);
            obj.set_taborder("5");
            obj.getSetter("template").set("linearea");
            obj.set_cssclass("btn_type05");
            obj.getSetter("prop").set("lineareavisible");
            this.Popup_SeriesTemplate_Bar.addChild(obj.name, obj);

            obj = new PopupDiv("Popup_ColorsetTemplate","212","320","226","100",null,null,null,null,null,null,this);
            obj.set_visible("false");
            obj.set_cssclass("popdiv_color");
            this.addChild(obj.name, obj);

            obj = new Div("Div00","1","1","1","1",null,null,null,null,null,null,this.Popup_ColorsetTemplate.form);
            obj.set_taborder("0");
            this.Popup_ColorsetTemplate.addChild(obj.name, obj);

            obj = new Static("Static00","2","3","218","18",null,null,null,null,null,null,this.Popup_ColorsetTemplate.form);
            obj.set_taborder("1");
            obj.set_text("Seriesset Color Template");
            obj.set_border("0px none , 0px none , 2px solid gray");
            obj.set_textAlign("center");
            obj.set_cssclass("pop_color_title");
            this.Popup_ColorsetTemplate.addChild(obj.name, obj);

            obj = new Button("Btn_Temp1","3","26","50","30",null,null,null,null,null,null,this.Popup_ColorsetTemplate.form);
            obj.set_taborder("2");
            obj.getSetter("colorset").set("Blue10");
            obj.set_cssclass("btn_temp01");
            this.Popup_ColorsetTemplate.addChild(obj.name, obj);

            obj = new Button("Btn_Temp2","Btn_Temp1:5","26","50","30",null,null,null,null,null,null,this.Popup_ColorsetTemplate.form);
            obj.set_taborder("3");
            obj.getSetter("colorset").set("Red10");
            obj.set_cssclass("btn_temp02");
            this.Popup_ColorsetTemplate.addChild(obj.name, obj);

            obj = new Button("Btn_Temp3","Btn_Temp2:5","26","50","30",null,null,null,null,null,null,this.Popup_ColorsetTemplate.form);
            obj.set_taborder("4");
            obj.getSetter("colorset").set("Green10");
            obj.set_cssclass("btn_temp03");
            this.Popup_ColorsetTemplate.addChild(obj.name, obj);

            obj = new Button("Btn_Temp4","Btn_Temp3:5","26","50","30",null,null,null,null,null,null,this.Popup_ColorsetTemplate.form);
            obj.set_taborder("5");
            obj.getSetter("colorset").set("Purple10");
            obj.set_cssclass("btn_temp04");
            this.Popup_ColorsetTemplate.addChild(obj.name, obj);

            obj = new Button("Btn_Temp5","3","Btn_Temp1:5","50","30",null,null,null,null,null,null,this.Popup_ColorsetTemplate.form);
            obj.set_taborder("6");
            obj.getSetter("colorset").set("Mix10");
            obj.set_cssclass("btn_temp05");
            this.Popup_ColorsetTemplate.addChild(obj.name, obj);

            obj = new Button("Btn_Temp6","Btn_Temp5:5","Btn_Temp1:5","50","30",null,null,null,null,null,null,this.Popup_ColorsetTemplate.form);
            obj.set_taborder("7");
            obj.getSetter("colorset").set("Color20");
            obj.set_cssclass("btn_temp06");
            this.Popup_ColorsetTemplate.addChild(obj.name, obj);

            obj = new Button("Btn_Temp7","Btn_Temp6:5","Btn_Temp1:5","50","30",null,null,null,null,null,null,this.Popup_ColorsetTemplate.form);
            obj.set_taborder("8");
            obj.getSetter("colorset").set("Color20b");
            obj.set_cssclass("btn_temp07");
            this.Popup_ColorsetTemplate.addChild(obj.name, obj);

            obj = new Button("Btn_Temp8","Btn_Temp7:5","Btn_Temp1:5","50","30",null,null,null,null,null,null,this.Popup_ColorsetTemplate.form);
            obj.set_taborder("9");
            obj.getSetter("colorset").set("Color20c");
            obj.set_cssclass("btn_temp08");
            this.Popup_ColorsetTemplate.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",800,500,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.addIncludeScript("BasicChartContentsEditor.xfdl","ContentsForm::Defines.xjs");
        this.addIncludeScript("BasicChartContentsEditor.xfdl","ContentsForm::UndoList.xjs");
        this.addIncludeScript("BasicChartContentsEditor.xfdl","ContentsForm::UndoBuffer.xjs");
        this.addIncludeScript("BasicChartContentsEditor.xfdl","ContentsForm::UndoItem.xjs");
        this.registerScript("BasicChartContentsEditor.xfdl", function() {
        /* include */
        this.executeIncludeScript("ContentsForm::Defines.xjs"); /*include "ContentsForm::Defines.xjs"*/;
        this.executeIncludeScript("ContentsForm::UndoList.xjs"); /*include "ContentsForm::UndoList.xjs"*/;
        this.executeIncludeScript("ContentsForm::UndoBuffer.xjs"); /*include "ContentsForm::UndoBuffer.xjs"*/;
        this.executeIncludeScript("ContentsForm::UndoItem.xjs"); /*include "ContentsForm::UndoItem.xjs"*/;
        /* internal variable */
        this.module = nexacro.CTSE.Chart.BasicChart;
        this.oContents = {};

        this._bInit = false;
        this._bFirstApply = false;
        this._bOriginData = false;

        this._init_prop = null;
        this._selected_control = null;
        this._selected_colorset = null;
        this._selected_template = null;
        this._last_valuecolumn = 2;

        this._valueaxis_cnt = 0;
        this._series_cnt = 0;
        this._min_categorycolumn = 1;
        this._min_selectcolumn = 1;
        this._min_valuecolumn = 5;
        this._charttype = nexacro.CTSE.Chart.BasicChartType;
        /* ContentsEditor Functions */

        this.setPrefixUrls = function ()
        {
        	var ret = this.userNotifyCall(nexacro.CTSE.NotifyTypes.GET_PREFIX_PATH);
        	eval("this._prefix_urls = " + ret + ";");

        };
        this.GetSource = function ()
        {
        	//trace(">>>>>GetSource");
        	if (!this._bInit)
        	{
        		// contents가 없는 chart opne시 getSource 무시
        		this._bInit = true;
        		if (!this._bFirstApply)
        			return;
        	}

        	return JSON.stringify(this.oContents, null, "\t");
        };

        this.SetSource = function (sContents)
        {
        	//trace(">>>>>SetSource : " + sContents);

        	this.oContents = {};
        	var preContents = {};
        	var postContents = {};
        	var bChangedContents = false;
        	if (sContents)
        	{
        		this._bFirstApply = true;
        		preContents = JSON.parse(sContents);
        		var addboard = false;
        		var addcategoryaxis = false;
        		if(!preContents["board"])
        		{
        			addboard = true;
        		}
        		if(!preContents["categoryaxis"])
        		{
        		   addcategoryaxis = true;
        		}
        		if(addboard || addcategoryaxis)
        		{
        			bChangedContents = true;
        			postContents = nexacro.CTSE.Chart.Util.cloneContents(preContents);
        			if(addboard)
        			{
        				postContents["board"] = nexacro.CTSE.Chart.Util.cloneContents(this.module["default_" + "board"]);
        			}
        			if(addcategoryaxis)
        			{
        				postContents["categoryaxis"] = nexacro.CTSE.Chart.Util.cloneContents(this.module["default_" + "categoryaxis"]);
        			}
        		}

        	}
        	else
        	{
        		this._bFirstApply = false;
        		postContents = nexacro.CTSE.Chart.Util.cloneContents(this.module.default_contents);
        		bChangedContents = true;
        	}
        	if(bChangedContents)
        	{

        		nexacro.CTSE.Chart.Util.recoverableInitContents(this,preContents,postContents,true,true);
        		delete postContents;
        		postContents = null;
        	}
        	else
        	{

        		nexacro.CTSE.Chart.Util.InitContents(this,nexacro.CTSE.Chart.Util.cloneContents(preContents));
        	}

        };

        this.GetProperty = function (sPropName)
        {
        	//trace(">>>>>GetProperty : " + sPropName);

        	var i, j;
        	var ret, chart_value;
        	var bSetted = false;

        	var chart = this.Chart_Preview;
        	var target = this._selected_control;
        	var no_update_list = this.module.NON_UPDATE_PROPERTY;

        	if (chart && target)
        	{
        		var controlname = target.controlname;
        		if (controlname == "seriesset" || controlname == "valueaxes")
        		{
        			ret = this.oContents[controlname][target.index][sPropName];
        			chart_value = chart[controlname][target.index][sPropName];
        		}
        		else
        		{
        			ret = this.oContents[controlname][sPropName];
        			chart_value = chart[controlname][sPropName];
        		}
        	}

        	if(nexacro._isUndefined(ret))
        	{
        		for (i in no_update_list)
        		{
        			if (i == target.controlname && no_update_list[i].indexOf(sPropName) > -1)
        			{
        				ret = "DEF:";
        				bSetted = true;
        				break;
        			}
        		}

        		if (!bSetted)
        		{
        			ret = "DEF:";
        			if (!nexacro._isUndefined(chart_value))
        				ret += chart_value;
        		}
        	}
        	else
        	{
        		ret = "XML:" + ret;
        	}

        	return ret;
        };

        this.SetProperty = function (sPropName, sPropVal, bSetDefault)
        {

        	var i, j;
        	var control;
        	var setter = "set_" + sPropName;

        	var chart = this.Chart_Preview;
        	var target = this._selected_control;
        	if (chart && target)
        	{
        		var controlname = target.controlname;
        		var controlindex = target.index;
        		var prevalue;
        		var controlprevalue;
        		if (controlname == "seriesset" || controlname == "valueaxes")
        		{
        			prevalue = this.oContents[controlname][controlindex][sPropName];
        			controlprevalue = chart[controlname][controlindex][sPropName];
        		}
        		else
        		{
        			prevalue = this.oContents[controlname][sPropName];
        			controlprevalue = chart[controlname][sPropName];
        		}
        		if(sPropName == "id" && controlname == "seriesset" || controlname == "valueaxes")
        		{
        		    var len = this.oContents[controlname] ? this.oContents[controlname].length : 0;
        			var ret = nexacro.CTSE.Chart.Util.checkindexid(sPropVal,this.oContents[controlname],len,target.index);
        			if(!ret)
        			{

        				var errormsg = nexacro.CTSE.CHART_MESSAGE.ERROR_ALREADY_EXISTS_ID + "\"" + sPropVal + "\""  ;
        				nexacro.CTSE.ConfirmBox(nexacro.CTSE.ConfirmTypes.ERROR, [nexacro.CTSE.ConfirmButtons.OK], errormsg);
        				return false;
        			}
        		}
        		else if(sPropName == "id" && controlname != "seriesset" && controlname != "valueaxes")
        		{


        			var len = this.oContents ? Object.keys(this.oContents).length : 0;
        			var ret = nexacro.CTSE.Chart.Util.checkindexid(sPropVal,this.oContents,len,controlname,true);

        			if(!ret)
        			{

        				var errormsg = nexacro.CTSE.CHART_MESSAGE.ERROR_ALREADY_EXISTS_ID + "\"" + sPropVal + "\""  ;
        				nexacro.CTSE.ConfirmBox(nexacro.CTSE.ConfirmTypes.ERROR, [nexacro.CTSE.ConfirmButtons.OK], errormsg);
        				return false;
        			}
        		}
        		nexacro.CTSE.Chart.Util.recoverableProperty(this,controlname,controlindex,sPropName,prevalue,sPropVal,controlprevalue,bSetDefault,true,true);


        		return true;
        	}

        	return false;
        };

        this.SetDataset = function (sContents)
        {
        	//trace(">>>>>SetDataset : " + sContents);

        	if (!this.DS_ChartOriginData)
        	{
        		var obj = new Dataset("DS_ChartOriginData", this);
        		obj._setContents(sContents);
        		this.addChild(obj.name, obj);

        		this.on_created();
        	}

        	return false;
        };

        this.CanUseUserProperty = function()
        {
        	return false;
        };

        this.AddUserProperty = function (property, value)
        {
        	return false;
        };

        this.DeleteUserProperty = function (property)
        {
        	return false;
        };

        this.GetUserPropertyList = function ()
        {
        	return "";
        };

        this.setZoom - function(v)
        {
        	// 삭제된 함수..
        }

        this.getZoom = function()
        {
        	// 삭제된 함수..
        	return 100;
        }
        this.SetComponentProperties = function (v)
        {
        	//trace(">>>>>SetComponentProperties : ");

        	this._init_prop = v;
        };

        this.GetChangedComponentProperties = function ()
        {
        	return [];
        };

        this.GetUserPropertyList = function ()
        {
        	return "";
        };

        this.GetCommandList = function ()
        {
        	return "";
        };

        this.ExcuteAccelator = function(altkey, ctrlkey, shiftkey, keycode)
        {
        	var refreshCmdState = true;
        	if(ctrlkey)
        	{
        		if(keycode === 90)												    {	this.userNotifyCall(nexacro.CTSE.NotifyTypes.UNDO,null);	}		// Crtl + Z : Undo
        		else if(keycode === 89)												{	this.userNotifyCall(nexacro.CTSE.NotifyTypes.REDO,null);	}		// Crtl + Y : Redo
        		else
        		{
        			return false;
        		}
        	}
        	else
        	{
        		return false;
        	}


        	return true;
        };

        this._canUndo = function()
        {
        	return this._undoList.canUndo();
        };

        this.Undo = function()
        {

        	return this._undo();
        };

        this.Redo = function()
        {

        	return this._redo();
        };

        this._undo = function()
        {
        	if( this._canUndo() )
        	{
        		var buffer = this._undoList.undo();
        		buffer.undo();

        	}
        };

        this._canRedo = function()
        {
        	return this._undoList.canRedo();
        };

        this._redo = function()
        {
        	if( this._canRedo() )
        	{
        		var buffer = this._undoList.redo();
        		buffer.redo();

        	}
        };

        this._addUndo = function(perform, data, save, execute, undraw, redraw)
        {
        	var rtn;

        	if( execute )
        	{
        		rtn = perform.call(this, true, data);
        	}
        	this._undoBuffer.add( new nexacro.CTSE.Chart._UndoItem(perform, data), undraw, redraw );

        	if(	save )
        	{
        		this._saveUndoBuffer();
        	}

        	return rtn;
        };

        this._saveUndoBuffer = function()
        {
        	this._undoBuffer.save(this._undoList);
        	this._undoBuffer = new nexacro.CTSE.Chart._UndoBuffer();

        	this.callNotify_ContentsChange();
        };

        this.callNotify_ContentsChange = function()
        {
        	return this.userNotifyCall(nexacro.CTSE.NotifyTypes.CHANGE_CONTENTS, null);
        };
        this.IsModified = function()
        {
            return this._canUndo();
        };

        this.EndEditor = function ()
        {

        };

        /* ContentsEditor Component Event */
        this.Form_onload = function (obj,e)
        {
        	this.setPrefixUrls();
        	this._undoList = new nexacro.CTSE.Chart._UndoList(this);
        	this._undoBuffer = new nexacro.CTSE.Chart._UndoBuffer();
        	this.userNotifyCall(nexacro.CTSE.NotifyTypes.FORM_ONLOAD, "");

        	this.initChart();
        	this.initControlStatus();

        	nexacro.CTSE.Chart.Menu.resetscrollArea(this.Area_Controls);
        };

        this.Div_Controls_Btn_onclick = function(obj,e)
        {
        	var chart = this.Chart_Preview;
        	if (chart)
        	{
        		if (this._selected_control)
        			this._selected_control.setSelectStatus(false);

        		this._selected_control = obj;
        		this._selected_control.setSelectStatus(true);

        		this.userNotifyCall(nexacro.CTSE.NotifyTypes.CHANGE_SELECTED, obj.classname);
        	}
        };

        this.Area_Controls_Area_information_Btn_check_onclick = function(obj,e)
        {
        	obj.toggleSelectStatus();
        	if (obj.getSelectStatus())
        	{
        		nexacro.CTSE.Chart.Util.recoverableAddContents(this,obj,this.module["default_" + obj.controlname],true,true);
        	}
        	else
        	{
        		nexacro.CTSE.Chart.Util.recoverableDeleteContents(this,obj,this.oContents[obj.controlname],true,true);
        	}

        };

        this.Area_Controls_Area_information_Btn_view_onclick = function(obj,e)
        {
        	var control = this.Chart_Preview[obj.controlname];

        	var Prevalue = false;
        	var Postvalue = false;
        	if (obj.getSelectStatus())
        	{
        	   Prevalue = this.oContents[obj.controlname]["visible"];
        	   Postvalue = false;
        	}
        	else
        	{
        	   Prevalue = this.oContents[obj.controlname]["visible"];
        	   Postvalue = true;
        	}
        	nexacro.CTSE.Chart.Util.recoverableProperty(this,obj.controlname,obj.index,"visible",Prevalue,Postvalue,"",false,true,true);

        };

        this.Div_Controls_Btn_appenValueaxis_onclick = function(obj,e)
        {


        	var expand_contents;

        	expand_contents = nexacro.CTSE.Chart.Util.cloneContents(this.module.default_valueaxis);

        	expand_contents.id = nexacro.CTSE.Chart.Util.makeindexcontentsid(expand_contents.id ,this._valueaxis_cnt,this.oContents["valueaxes"]);
        	nexacro.CTSE.Chart.Util.recoverableAddAxis(this,this.oContents,expand_contents.id,expand_contents,true,true);

        };

        this.Div_Controls_Btn_removeValueaxis_onclick = function(obj,e)
        {


        	var area = this.Area_Controls.form.Area_valueaxes.form;
        	var comps = area.components;
        	var comps_len = comps.length;

        	var control = this._selected_control;
        	if (control)
        	{
        		if (control.controlname != "valueaxes")
        		{
        			if (comps_len)
        				control = comps[comps_len - 1];
        			else
        				return;
        		}

        	}
        	else
        	{

        		if (comps_len)
        			control = comps[comps_len - 1];
        		else
        			return;
        	}

        	var valueaxes = this.oContents["valueaxes"];
        	if (valueaxes)
        	{
        		var axisindex = nexacro.CTSE.Chart.Util.indexOf(valueaxes,control.id);
        		nexacro.CTSE.Chart.Util.recoverableDeleteAxis(this,this.oContents,control.id,this.oContents["valueaxes"][axisindex],true,true);
        	}


        };

        this.Div_Controls_Btn_appenSeries_onclick = function(obj,e)
        {
        	var colorset = this._selected_colorset ? nexacro.CTSE.Chart.Colorset[this._selected_colorset] : null;
        	var series_len = this.oContents["seriesset"] ? this.oContents["seriesset"].length : 0;

        	//make contents
        	//var id = "series" + this._series_cnt;

        	var id = nexacro.CTSE.Chart.Util.makeindexcontentsid("series",this._series_cnt,this.oContents["seriesset"]);
        	var expand_contents, expand_contents_copy;

        	var expand_contents = {};
        	expand_contents["id"] = id;
        	if (colorset)
        	{
        		var coloser_idx = series_len % (colorset.length);

        		expand_contents["barlinestyle"] = "1px solid " + colorset[coloser_idx];
        		expand_contents["barfillstyle"] = colorset[coloser_idx];
        	}


        	nexacro.CTSE.Chart.Util.recoverableAddSeries(this,this.oContents,id,expand_contents,true,true);

        };

        this.Div_Controls_Btn_removeSeries_onclick = function(obj,e)
        {


        	var area = this.Area_Controls.form.Area_seriesset.form;
        	var comps = area.components;
        	var comps_len = comps.length;

        	var control = this._selected_control;
        	if (control)
        	{
        		if (control.controlname != "seriesset")
        		{

        			if (comps_len)
        			{
        			    comps_len--;
        				control = comps[comps_len - 1];
        			}
        			else
        				return;
        		}

        	}
        	else
        	{
        		// Button이 선택되어 있지 않으면, 가장 마지막 Series 지움.
        		if (comps_len)
        		{
        			comps_len--;
        			control = comps[comps_len - 1];
        		}
        		else
        			return;
        	}

        	var seriesset = this.oContents["seriesset"];
        	if (seriesset)
        	{
        		var seriesindex = nexacro.CTSE.Chart.Util.indexOf(seriesset,control.id);
        		nexacro.CTSE.Chart.Util.recoverableDeleteSeries(this,this.oContents,control.id,this.oContents["seriesset"][seriesindex],true,true);
        	}

        };

        this.Div_Controls_Btn_SeriessetColor_onclick = function(obj,e)
        {

            nexacro.CTSE.Chart.Menu.trackPopup(obj, this.Area_Controls, this["Popup_ColorsetTemplate"]);


        };

        this.Div_Controls_Btn_template_onclick = function(obj,e)
        {
        	var chart = this.Chart_Preview;
        	if (chart)
        	{
        		if (this._selected_control)
        			this._selected_control.setSelectStatus(false);

        		this._selected_control = this.Area_Controls.form.Area_seriesset.form[obj.parentname];
        		this._selected_control.setSelectStatus(true);

        		this.userNotifyCall(nexacro.CTSE.NotifyTypes.CHANGE_SELECTED, this._selected_control.classname);
        	}

        	nexacro.CTSE.Chart.Menu.trackPopup(obj, this.Area_Controls, this["Popup_SeriesTemplate_Bar"]);
        };

        this.Area_Controls_Expander_onclick = function(obj,e)
        {
        	if (obj.expandStatus == "expand")
        	{
        		obj.expandStatus = "collapse";
        		nexacro.CTSE.Chart.Menu.collapse(this.Area_Controls.form[obj.expandTarget]);
        	}
        	else
        	{
        		obj.expandStatus = "expand";
        		nexacro.CTSE.Chart.Menu.expand(this.Area_Controls.form[obj.expandTarget]);
        	}

        	obj.set_cssclass("btn_" + obj.expandStatus);
        	nexacro.CTSE.Chart.Menu.resetscrollArea(this.Area_Controls);
        };

        this.Rdo_changedata_onitemchanged = function(obj,e)
        {

        	if (e.posttext == "Sample Data")
        	{
        		this._bOriginData = false;
        		this.Sta_datastatusinfo.set_visible(true);
        		this.initChart_TempData();

        	}
        	else
        	{
        		this._bOriginData = true;
        		if (!this.DS_ChartOriginData)
        		{
        			var obj = new Dataset("DS_ChartOriginData", this);
        			obj._setContents("");
        			this.addChild(obj.name, obj);

        			this.on_created();
        		}
        		this.Sta_datastatusinfo.set_visible(false);
        		this.initChart_OriginData();
        	}

        	//this.initControlStatus();
        };

        this.Popup_SeriesTemplate_Bar_onpopup = function(obj,e)
        {
        	var popup_form = obj.form;
        	var popup_comp, prop;
        	var popup_comps = popup_form.components;

        	var series = this.Chart_Preview.seriesset[this._selected_control.index];
        	for (var i = 0; i < popup_comps.length; i++)
        	{
        		popup_comp = popup_comps[i];
        		prop = popup_comp.prop;
        		if (prop)
        		{
        			if (prop == "stacktype")
        			{
        				if (!series[prop] || (series[prop] && series[prop] == "none"))
        					popup_comp.setSelectStatus(false);
        				else
        					popup_comp.setSelectStatus(true);
        			}
        			else
        			{
        				popup_comp.setSelectStatus(series[prop]);
        			}
        		}
        	}
        };

        this.Popup_ColorsetTemplate_Btn_onclick = function(obj,e)
        {
        	var preselected_colorset = this._selected_colorset;
        	var postselected_colorset = obj.colorset;
        	this._selected_colorset = obj.colorset;
        	var newseriesset = nexacro.CTSE.Chart.Util.updateColorsetSeries(this,nexacro.CTSE.Chart.Colorset[obj.colorset]);
        	if(newseriesset)
        	{
        		nexacro.CTSE.Chart.Util.recoverableColorSetTemplate(this,this.oContents["seriesset"],newseriesset,preselected_colorset,postselected_colorset,true,true);
        	}
        	else
        	{
        	}

        	var popup = obj.parent.parent;
        	if (popup)
        		popup.closePopup();

        	//this.userNotifyCall(nexacro.CTSE.NotifyTypes.CHANGE_CONTENTS, null);
        };

        this.Popup_SeriesTemplate_Bar_Btn_onclick = function(obj,e)
        {
           var preselectedtemplateid =  this._selected_template;
           var postselectedtemplateid = this._selected_template = obj.template;
           var data = [];
           var control = this._selected_control;
           var preseries = this.oContents["seriesset"][control.index];

           nexacro.CTSE.Chart.Util.updateBarTemplateSeries(this,obj.template,obj.prop,data);

           nexacro.CTSE.Chart.Util.recoverableSeriesBarTemplate(this,preseries,data[0],preselectedtemplateid,postselectedtemplateid,obj.getSelectStatus(),data[1],data[2],true,true);

           if(obj.parent.Div00)
              obj.parent.Div00.setFocus();

           //objform.userNotifyCall(nexacro.CTSE.NotifyTypes.REFRESH_PROPERTY,obj.prop);
           this.userNotifyCall(nexacro.CTSE.NotifyTypes.REFRESH_PROPERTY,obj.prop);
        };

        /* Form_ContentsEditor Util Function*/
        this.userNotifyCall = function (strId, strMsg, bRetry)
        {
        	var rtn;
        	try
        	{
        		rtn = nexacro.CTSE.userNotify(strId, strMsg);
        	}
        	catch(e)
        	{
        		if(!bRetry)
        		{
        			//trace("userNotifyCall error");
        			//trace(e.toString());
        		}
        		return false;
        	}
        	return rtn;
        };

        this.initChart = function ()
        {
        	// set dataset flag
        	var ds_origin = this.DS_ChartOriginData;
        	if (ds_origin)
        	{
        		this._bOriginData = true;
        	}
        	else
        	{
        		this._bOriginData = false;
        	}

        	// init Chart
        	if (this._bOriginData)
        		this.initChart_OriginData();
        	else
        		this.initChart_TempData();
        };

        this.initControlStatus = function ()
        {
        	var i, j;
        	var obj, id, length;
        	var chk_control, view_control, btn_control;
        	var controlname, singlename, classname, parent;

        	var bUse = false;
        	var bVisible = true;
        	var contents = this.oContents;

        	//single control update
        	var list = this.module.SINGLE_CONTROL_LIST;
        	for (i in list)
        	{
        		controlname = list[i];
        		chk_control = this.Area_Controls.form.Area_information.form["Btn_" + controlname + "_check"];
        		view_control = this.Area_Controls.form.Area_information.form["Btn_" + controlname + "_view"];
        		btn_control = this.Area_Controls.form.Area_information.form["Btn_" + controlname];

        		if (contents[controlname])
        		{
        			bUse = true;

        			var keys = Object.keys(contents[controlname]);
        			var values = Object.values(contents[controlname]);
        			var idx_visible = keys.indexOf("visible");
        			if (idx_visible > -1)
        			{
        				if (nexacro._toBoolean(values[idx_visible]))
        					bVisible = true;
        				else
        					bVisible = false;
        			}
        			else
        			{
        				bVisible = true;
        			}
        		}
        		else
        		{
        			bUse = false;
        		}

        		if (chk_control)
        		{
        			chk_control.setSelectStatus(bUse);
        		}

        		if (view_control)
        		{
        			view_control.setSelectStatus(bVisible);
        			view_control.set_enable(bUse);
        		}

        		if (btn_control)
        		{
        			btn_control.set_enable(bUse);
        		}
        	}

        	//array control update
        	list = this.module.ARRAY_CONTROL_LIST;
        	for (i in list)
        	{
        		controlname = list[i];
        		length = contents[controlname] ? contents[controlname].length : 0;

        		if (contents[controlname])
        		{
        			if (controlname == "valueaxes")
        			{
        				singlename = "valueaxis";
        				classname = "nexacro.ChartAxisControl"
        				parent = this.Area_Controls.form.Area_valueaxes.form;
        			}
        			else if (controlname == "seriesset")
        			{
        				singlename = "series";
        				classname = "nexacro.ChartBasicSeriesControl";
        				parent = this.Area_Controls.form.Area_seriesset.form;
        			}

        			for (j = 0; j < length; j++)
        			{
        				id = contents[controlname][j].id;
        				if (!parent[id])
        				{
        					obj = new nexacro.Button(id);
        					obj.set_text(id);
        					obj.set_cssclass("left_menu2");
        					obj.getSetter("subcontrol").set(false);
        					obj.getSetter("classname").set(classname);
        					obj.getSetter("controlname").set(controlname);
        					obj.getSetter("index").set(j);

        					obj.addEventHandler("onclick", this.Div_Controls_Btn_onclick, this);

        					parent.addChild(id, obj);
        					obj.show();

        					if (controlname == "seriesset")
        					{
        						obj = new nexacro.Button("Btn_SeriesSelector_" + id);
        						obj.set_cssclass("btn_type_open");
        						obj.getSetter("subcontrol").set(true);
        						obj.getSetter("parentname").set(id);

        						obj.addEventHandler("onclick", this.Div_Controls_Btn_template_onclick, this);

        						parent.addChild("Btn_SeriesSelector_" + id, obj);
        						obj.show();
        					}

        					this["_" + singlename + "_cnt"]++;
        				}
        			}
        		}
        	}

        	if (this._bOriginData)
        	{
        		this.Rdo_changedata.set_value(0);
        		this.Sta_datastatusinfo.set_visible(false);
        	}
        	else
        	{
        		this.Rdo_changedata.set_value(1);
        		this.Sta_datastatusinfo.set_visible(true);
        	}

        	//menu refresh
        	nexacro.CTSE.Chart.Menu.rearrangeArea(this.Area_Controls.form.Area_information);
        	nexacro.CTSE.Chart.Menu.rearrangeArea(this.Area_Controls.form.Area_valueaxes);
        	nexacro.CTSE.Chart.Menu.rearrangeArea(this.Area_Controls.form.Area_seriesset);
        	nexacro.CTSE.Chart.Menu.resetscrollArea(this.Area_Controls);
        };

        this.initChart_OriginData = function()
        {
        	var i, prop, value, setter;
        	var chart = this.Chart_Preview;
        	chart.set_enableredraw(false);
        	chart.set_binddataset(this.DS_ChartOriginData.id);

        	//original chart property setting
        	var init_prop = JSON.parse(this._init_prop);
        	if (init_prop)
        	{
        		var init_prop_list = this.module.CHART_PROPERTY_LIST;
        		for (i in init_prop_list)
        		{
        			prop = init_prop_list[i];
        			value = init_prop[prop];
        			setter = "set_" + prop;
        			if (chart[setter] && value)
        			{
        				chart[setter].call(chart, value);
        			}
        		}
        	}

        	//preview chart update
        	var contents_copy = nexacro.CTSE.Chart.Util.cloneContents(this.oContents);
        	if(contents_copy["hrangebar"])
        	{
        		nexacro.CTSE.Chart.Util._changePrefixUrlContents(this,contents_copy["hrangebar"]);
        	}
        	if(contents_copy["vrangebar"])
        	{
        		nexacro.CTSE.Chart.Util._changePrefixUrlContents(this,contents_copy["vrangebar"]);
        	}
        	chart._setContents(contents_copy);
        	//chart.draw();
        	chart.set_enableredraw(true);
        };

        this.initChart_TempData = function()
        {
        	var i, prop, value, setter;
        	var ds = this.DS_ChartTempData;
        	var chart = this.Chart_Preview;
        	chart.set_enableredraw(false);
        	chart.set_binddataset(ds.id);

        	//original chart property setting
        	var init_prop = JSON.parse(this._init_prop);
        	if (init_prop)
        	{
        		var init_prop_list = this.module.CHART_PROPERTY_LIST;
        		for (i in init_prop_list)
        		{
        			prop = init_prop_list[i];
        			value = init_prop[prop];
        			setter = "set_" + prop;
        			if (chart[setter])
        			{
        				if (prop == "categorycolumn")
        				{
        					chart[setter].call(chart, "bind:" + ds.getColID(0));
        				}
        				else
        				{
        					if (value)
        					{
        						chart[setter].call(chart, value);
        					}
        				}
        			}
        		}
        	}

        	//tempdata setting
        	var contents_copy = nexacro.CTSE.Chart.Util.cloneContents(this.oContents);
        	var series;
        	var series_bindselectcolumn = 1;
        	var series_bindvaluecolumn = 2;
        	var seriesset = contents_copy["seriesset"];
        	for (i in seriesset)
        	{
        		series = seriesset[i];

        		// valuecolumn init
        		series.valuecolumn = "bind:" + ds.getColID(series_bindvaluecolumn);
        		this._last_valuecolumn = series_bindvaluecolumn;

        		// valuecolumn circulation
        		series_bindvaluecolumn++;
        		if (ds.getColCount() == series_bindvaluecolumn)
        			series_bindvaluecolumn = 2;

        		// selectcolumn init
        		if (series.selecttype == "bind")
        			series.selectcolumn = "bind:" + ds.getColID(series_bindselectcolumn);
        	}

        	//preview chart update
        	if(contents_copy["hrangebar"])
        	{
        		nexacro.CTSE.Chart.Util._changePrefixUrlContents(this,contents_copy["hrangebar"]);
        	}
        	if(contents_copy["vrangebar"])
        	{
        		nexacro.CTSE.Chart.Util._changePrefixUrlContents(this,contents_copy["vrangebar"]);
        	}
        	chart._setContents(contents_copy);
        	//chart.draw();
        	chart.set_enableredraw(true);
        };

        this.updateColorsetSeries = function (colorset)
        {
        	var chart = this.Chart_Preview;
        	chart.set_enableredraw(false);
        	var seriesset = this.oContents["seriesset"];
        	if (chart && seriesset)
        	{
        		var i = 0;
        		var coloser_idx = 0;
        		var contents;
        		var chart_control, contents_control;

        		var series_len = seriesset.length;
        		for (i; i <series_len; i++)
        		{
        			coloser_idx = i % (colorset.length);
        			contents_control = seriesset[i];
        			chart_control = chart.getSeriesByID(contents_control.id);
        			contents = {};

        			if (chart_control.barvisible)
        			{
        				contents["barlinestyle"] = "1px solid " + colorset[coloser_idx];
        				contents["barfillstyle"] = colorset[coloser_idx];
        			}
        			if (chart_control.pointvisible)
        			{
        				contents["pointlinestyle"] = "1px solid " + colorset[coloser_idx];
        				contents["pointfillstyle"] = colorset[coloser_idx];
        			}
        			if (chart_control.linevisible)
        			{
        				contents["linestyle"] = "1px solid " + colorset[coloser_idx];
        				contents["linefillstyle"] = colorset[coloser_idx];
        			}
        			if (chart_control.lineareavisible)
        			{
        				contents["lineareafillstyle"] = colorset[coloser_idx];
        			}

        			if (chart_control.highlightbarvisible)
        			{
        				contents["highlightbarlinestyle"] = "1px solid " + colorset[coloser_idx];
        				contents["highlightbarfillstyle"] = colorset[coloser_idx];
        			}
        			if (chart_control.highlightpointvisible)
        			{
        				contents["highlightpointlinestyle"] = "1px solid " + colorset[coloser_idx];
        				contents["highlightpointfillstyle"] = colorset[coloser_idx];
        			}
        			if (chart_control.highlightlinevisible)
        			{
        				contents["highlightlinestyle"] = "1px solid " + colorset[coloser_idx];
        			}

        			nexacro.CTSE.Chart.Util.updateSeriesContents(this.oContents, contents_control.id, contents);
        			chart.setSeries(contents_control.id, contents);
        		}

        		//chart.draw();
        		chart.set_enableredraw(true);
        	}
        };


        this.BasicEditor_onkeydown = function(obj,e)
        {

        	if (this.ExcuteAccelator(e.altkey, e.ctrlkey, e.shiftkey, e.keycode) === true)
        	{
        		//trace("call ExcuteAccelator");
        	}
        	else
        	{

        	}

        };

        this.BasicEditor_onkeyup = function(obj,e)
        {

        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_onload,this);
            this.addEventHandler("onkeydown",this.BasicEditor_onkeydown,this);
            this.addEventHandler("onkeyup",this.BasicEditor_onkeyup,this);
            this.Area_Controls.form.Expander_information.addEventHandler("onclick",this.Area_Controls_Expander_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_title.addEventHandler("onclick",this.Div_Controls_Btn_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_title_check.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_check_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_title_view.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_view_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_legend.addEventHandler("onclick",this.Div_Controls_Btn_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_legend_check.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_check_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_legend_view.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_view_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_hrangebar.addEventHandler("onclick",this.Div_Controls_Btn_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_hrangebar_check.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_check_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_hrangebar_view.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_view_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_vrangebar.addEventHandler("onclick",this.Div_Controls_Btn_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_vrangebar_check.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_check_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_vrangebar_view.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_view_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_tooltip.addEventHandler("onclick",this.Div_Controls_Btn_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_tooltip_check.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_check_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_tooltip_view.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_view_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_board.addEventHandler("onclick",this.Div_Controls_Btn_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_board_view.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_view_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_categoryaxis.addEventHandler("onclick",this.Div_Controls_Btn_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_categoryaxis_view.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_view_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_crosshair.addEventHandler("onclick",this.Div_Controls_Btn_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_crosshair_check.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_check_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_crosshair_view.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_view_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_selection.addEventHandler("onclick",this.Div_Controls_Btn_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_selection_check.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_check_onclick,this);
            this.Area_Controls.form.Area_information.form.Btn_selection_view.addEventHandler("onclick",this.Area_Controls_Area_information_Btn_view_onclick,this);
            this.Area_Controls.form.Expander_valueaxes.addEventHandler("onclick",this.Area_Controls_Expander_onclick,this);
            this.Area_Controls.form.Btn_removeValueaxis.addEventHandler("onclick",this.Div_Controls_Btn_removeValueaxis_onclick,this);
            this.Area_Controls.form.Btn_appenValueaxis.addEventHandler("onclick",this.Div_Controls_Btn_appenValueaxis_onclick,this);
            this.Area_Controls.form.Expander_seriesset.addEventHandler("onclick",this.Area_Controls_Expander_onclick,this);
            this.Area_Controls.form.Btn_removeSeries.addEventHandler("onclick",this.Div_Controls_Btn_removeSeries_onclick,this);
            this.Area_Controls.form.Btn_appenSeries.addEventHandler("onclick",this.Div_Controls_Btn_appenSeries_onclick,this);
            this.Area_Controls.form.Btn_SeriessetColor.addEventHandler("onclick",this.Div_Controls_Btn_SeriessetColor_onclick,this);
            this.Rdo_changedata.addEventHandler("onitemchanged",this.Rdo_changedata_onitemchanged,this);
            this.Popup_SeriesTemplate_Bar.addEventHandler("onpopup",this.Popup_SeriesTemplate_Bar_onpopup,this);
            this.Popup_SeriesTemplate_Bar.form.Btn_Temp_bar.addEventHandler("onclick",this.Popup_SeriesTemplate_Bar_Btn_onclick,this);
            this.Popup_SeriesTemplate_Bar.form.Btn_Temp_stack.addEventHandler("onclick",this.Popup_SeriesTemplate_Bar_Btn_onclick,this);
            this.Popup_SeriesTemplate_Bar.form.Btn_Temp_line.addEventHandler("onclick",this.Popup_SeriesTemplate_Bar_Btn_onclick,this);
            this.Popup_SeriesTemplate_Bar.form.Btn_Temp_point.addEventHandler("onclick",this.Popup_SeriesTemplate_Bar_Btn_onclick,this);
            this.Popup_SeriesTemplate_Bar.form.Btn_Temp_area.addEventHandler("onclick",this.Popup_SeriesTemplate_Bar_Btn_onclick,this);
            this.Popup_ColorsetTemplate.form.Btn_Temp1.addEventHandler("onclick",this.Popup_ColorsetTemplate_Btn_onclick,this);
            this.Popup_ColorsetTemplate.form.Btn_Temp2.addEventHandler("onclick",this.Popup_ColorsetTemplate_Btn_onclick,this);
            this.Popup_ColorsetTemplate.form.Btn_Temp3.addEventHandler("onclick",this.Popup_ColorsetTemplate_Btn_onclick,this);
            this.Popup_ColorsetTemplate.form.Btn_Temp4.addEventHandler("onclick",this.Popup_ColorsetTemplate_Btn_onclick,this);
            this.Popup_ColorsetTemplate.form.Btn_Temp5.addEventHandler("onclick",this.Popup_ColorsetTemplate_Btn_onclick,this);
            this.Popup_ColorsetTemplate.form.Btn_Temp6.addEventHandler("onclick",this.Popup_ColorsetTemplate_Btn_onclick,this);
            this.Popup_ColorsetTemplate.form.Btn_Temp7.addEventHandler("onclick",this.Popup_ColorsetTemplate_Btn_onclick,this);
            this.Popup_ColorsetTemplate.form.Btn_Temp8.addEventHandler("onclick",this.Popup_ColorsetTemplate_Btn_onclick,this);
        };
        this.loadIncludeScript("BasicChartContentsEditor.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
