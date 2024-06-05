//XJS=Defines.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {
        // Define Object
        nexacro.CTSE.Chart = new Object();

        nexacro.CTSE.Chart.Util = new Object();
        nexacro.CTSE.Chart.Menu = new Object();
        nexacro.CTSE.Chart.Colorset = new Object();
        nexacro.CTSE.Chart.BasicChart = new Object();
        nexacro.CTSE.Chart.BubbleChart = new Object();
        nexacro.CTSE.Chart.PieChart = new Object();
        nexacro.CTSE.Chart.RadarChart = new Object();
        nexacro.CTSE.Chart.RoseChart = new Object();
        nexacro.CTSE.Chart.GaugeChart = new Object();
        nexacro.CTSE.Chart.FloatChart = new Object();
        nexacro.CTSE.Chart.PyramidChart = new Object();
        nexacro.CTSE.Chart.BasicChartType = "Basic";
        nexacro.CTSE.Chart.BubbleChartType = "Bubble";
        nexacro.CTSE.Chart.PieChartType = "Pie";
        nexacro.CTSE.Chart.RadarChartType = "Radar";
        nexacro.CTSE.Chart.RoseChartType = "Rose";
        nexacro.CTSE.Chart.GaugeChartType = "Gauge";
        nexacro.CTSE.Chart.FloatChartType = "Float";
        nexacro.CTSE.Chart.PyramidChartType = "Pyramid";
        nexacro.CTSE.CHART_MESSAGE =
        {

        	"ERROR_ALREADY_EXISTS_ID" 		: "ID already exists. : ",
        	"END_MESSAGE"		: ""
        };
        // Define Chart

        // Define ChartUtil
        var _ChartUtil = nexacro.CTSE.Chart.Util;

        _ChartUtil._changePrefixUrlContents = function(objform,contents)
        {
        	if(contents["trackbargripdecimage"])
        	{
        		var val = contents["trackbargripdecimage"];
        		if(val)
        		{
        			var temp = val.toLowerCase();
        			if (temp.indexOf("url(") >= 0)
        			{

        				contents["trackbargripdecimage"] = this._changePrefixUrl(objform,val);
        			}

        		}
        	}
        	if(contents["trackbargripincimage"])
        	{
        		var val = contents["trackbargripincimage"];
        		if(val)
        		{
        			var temp = val.toLowerCase();
        			if (temp.indexOf("url(") >= 0)
        			{

        				contents["trackbargripincimage"] = this._changePrefixUrl(objform,val);
        			}

        		}
        	}
        };
        _ChartUtil._changePrefixUrl = function (objform,url)
        {
        	var prefix_url;
        	for (prefix_url in objform._prefix_urls)
        	{
        		if (url.indexOf(prefix_url) >= 0)
        		{
        			return url.replace(prefix_url, objform._prefix_urls[prefix_url]);
        		}
        	}

        	return url;
        };
        // FirstChar 대문자
        _ChartUtil.capitalize = function (str)
        {
        	return str.replace(/\b[a-z]/g, function (match)
        	{
        		return match.toUpperCase();
        	});
        };

        // FirstChar 소문자
        _ChartUtil.tolower = function (str)
        {
        	return str.replace(/\b[a-zA-Z]/g, function (match)
        	{
        		return match.toLowerCase();
        	});
        };

        // JSON ObjectCopy
        _ChartUtil.cloneContents = function (contents)
        {
        	if (contents === null || typeof(contents) !== 'object')
        		return contents;

        	if (contents)
        	{
        		var clone = contents.constructor();
        		var p, value;
        		for (p in contents)
        		{
        			if (contents.hasOwnProperty(p))
        			{
        				clone[p] = this.cloneContents(contents[p]);
        			}
        		}

        		return clone;
        	}
        };
        _ChartUtil.makeindexcontentsid = function (name,cnt,contents)
        {
        	var cnttemp = cnt;
        	var newname;
        	var bcheckname = false
        	var len = contents ? contents.length : 0;
        	while(!bcheckname)
        	{
        		newname = name + cnttemp;
        		if(this.checkindexid(newname,contents,len))
        		{
        		    bcheckname = true;
        			break;
        		}
        		cnttemp++;
        	}
        	return newname;
        };
        _ChartUtil.checkindexid = function(name,contents,length,skipvalue,isjson)
        {
        	if(!isjson)
        	{
        		var i = 0;
        		for (i; i <length; i++)
        		{
        			if(skipvalue && skipvalue == i)
        				continue;
        			if(contents[i]["id"])
        			{
        				if(contents[i]["id"] == name)
        				{
        					return false;
        				}
        			}
        		}
        	}
        	else
        	{
        		for(key in contents)
        		{
        			if(skipvalue && skipvalue == key)
        				continue;
        			if(contents[key]["id"])
        			{
        				if(contents[key]["id"] == name)
        				{
        					return false;
        				}
        			}

        		}

        	}
        	return true;
        }
        // ContentsEditor Common API Interface

        // ContentsEditor Delete Util
        _ChartUtil.deleteAxis = function(orgContents, chart, area, currentSelected)
        {
        	var bChangedSelect = false;
        	var comps = area.components;
        	var comps_len = comps.length;

        	var control = currentSelected;
        	if (control)
        	{
        		if (control.controlname != "valueaxes")
        		{
        			// Axis 가 아닌 컨트롤이 선택되어 있을 경우, Select 유지하고 가장 마지막 Axis 지움.
        			if (comps_len)
        				control = comps[comps_len - 1];
        			else
        				return;
        		}
        		else
        		{
        			// Axis 가 선택되어 있을 경우, 해당 Axis 지우고, SELECT Notify 수행.
        			bChangedSelect = true;
        		}
        	}
        	else
        	{
        		// Button이 선택되어 있지 않으면, 가장 마지막 Series 지움.
        		if (comps_len)
        			control = comps[comps_len - 1];
        		else
        			return;
        	}

        	var valueaxes = orgContents["valueaxes"];
        	if (valueaxes)
        	{
        		//update contents
        		valueaxes.splice(nexacro.CTSE.Chart.Util.indexOf(valueaxes, control.id), 1);

        		chart.set_enableredraw(false);
        		//update chart_preview
        		chart.deleteValueaxis(chart.getValueaxisByID(control.id));
        		//chart.draw();
        		chart.set_enableredraw(true);
        		//update editor
        		control.destroy();
        	}

        	return bChangedSelect;
        };

        _ChartUtil.deleteSeries = function(orgContents, chart, area, currentSelected, useExpandButton)
        {
        	var bChangedSelect = false;
        	var comps = area.components;
        	var comps_len = comps.length;

        	var expand_control;
        	var control = currentSelected;
        	if (control)
        	{
        		if (control.controlname != "seriesset")
        		{
        			// Sereis 가 아닌 컨트롤이 선택되어 있을 경우, Select 유지하고 가장 마지막 Series 지움.
        			if (comps_len)
        			{
        				if (useExpandButton)
        				{
        					while(comps_len)
        					{
        						comps_len--;
        						control = comps[comps_len];
        						if (control && control.index > -1)
        						{
        							expand_control = comps["Btn_SeriesSelector_" + control.id];
        							break;
        						}
        					}
        				}
        				else
        				{
        					control = comps[comps_len - 1];
        				}
        			}
        			else
        			{
        				return;
        			}
        		}
        		else
        		{
        			// Sereis 가 선택되어 있을 경우, 해당 Series 지우고, SELECT Notify 수행.
        			if (useExpandButton)
        			{
        				expand_control = comps["Btn_SeriesSelector_" + control.id];
        			}

        			bChangedSelect = true;
        		}
        	}
        	else
        	{
        		// Button이 선택되어 있지 않으면, 가장 마지막 Series 지움.
        		if (comps_len)
        		{
        			if (useExpandButton)
        			{
        				while(comps_len)
        				{
        					comps_len--;
        					control = comps[comps_len];
        					if (control && control.index > -1)
        					{
        						expand_control = comps["Btn_SeriesSelector_" + control.id];
        						break;
        					}
        				}
        			}
        			else
        			{
        				control = comps[comps_len - 1];
        			}
        		}
        		else
        		{
        			return;
        		}
        	}

        	var seriesset = orgContents["seriesset"];
        	if (seriesset)
        	{
        		//update contents
        		seriesset.splice(nexacro.CTSE.Chart.Util.indexOf(seriesset, control.id), 1);

        		//update chart
        		chart.set_enableredraw(false);
        		chart.deleteSeries(control.id);
        		//chart.draw();
        		chart.set_enableredraw(true);
        		//update editor
        		if (control)
        			control.destroy();
        		if (expand_control)
        			expand_control.destroy();
        	}

        	return bChangedSelect;
        };

        // ContentsEditor Update Util
        _ChartUtil.updateMenuButton = function (btnObj, status)
        {
        	if (!status)
        	{
        		btnObj.setSelectStatus(false);
        		btnObj.set_enable(false);
        	}
        	else
        	{
        		btnObj.set_enable(true);
        	}
        };

        _ChartUtil.updateContents = function(orgContents, updateContents)
        {
        	var p;
        	var value;
        	for (p in updateContents)
        	{
        		value = updateContents[p];
        		orgContents[p] = value;
        	}
        };

        _ChartUtil.updateControlContents = function (orgContents, id, updateContents, bUpdate)
        {
        	if (bUpdate)
        	{
        		if (!orgContents[id])
        		{
        			orgContents[id] = this.cloneContents(updateContents);
        		}
        	}
        	else
        	{
        		if (orgContents[id])
        		{
        			orgContents[id] = {};
        			delete orgContents[id];
        		}
        	}
        };
        _ChartUtil.InitContents = function(objform,setContents)
        {

            objform.oContents = {};
        	objform.oContents = setContents;
        	if (objform._bInit)
        	{

        		var chart = objform.Chart_Preview;
        		chart._iscontents_editor = true;
        		var contents_copy = this.cloneContents(objform.oContents);


        		objform.initControlStatus();

        		if (!objform._bOriginData)
        		{
        			var chart_series;
        			var chart_seriesset = chart.contents["seriesset"];
        			var contents_series;
        			var contents_seriesset = contents_copy["seriesset"];
        			var ds = objform.DS_ChartTempData;

        			// update Chart
        			for (var i in contents_seriesset)
        			{
        				chart_series = chart_seriesset[i];
        				contents_series = contents_seriesset[i];

        				if (contents_series)
        				{
        					switch(objform._charttype)
        					{
        						case nexacro.CTSE.Chart.BasicChartType:
        						case nexacro.CTSE.Chart.RoseChartType:
        						case nexacro.CTSE.Chart.RadarChartType:

        							if (chart_series.selecttype == "bind")
        							{
        								contents_series.selectcolumn = "bind:" + ds.getColID(1);
        							}

        							if (chart_series)
        							{
        								contents_series.valuecolumn = chart_series.valuecolumn;
        							}
        							else
        							{
        								contents_series.valuecolumn = "bind:" + ds.getColID(parseInt(Math.random() * 4 + 2));
        							}
        							break;
        						case nexacro.CTSE.Chart.FloatChartType:

        							if (chart_series.selecttype == "bind")
        							{
        								contents_series.selectcolumn = "bind:" + ds.getColID(3);
        							}

        							if (chart_series)
        							{
        								contents_series.valuecolumn = chart_series.valuecolumn;
        								if(chart_series.value2column)
        								{
        									contents_series.value2column = chart_series.value2column;
        								}
        								else
        								{
        									contents_series.value2column = "bind:" + ds.getColID(1);
        								}
        							}
        							else
        							{
        								contents_series.valuecolumn = "bind:" + ds.getColID(2);
        								contents_series.value2column = "bind:" + ds.getColID(1);
        							}
        							break;
        						case nexacro.CTSE.Chart.BubbleChartType:

        							if (chart_series.selecttype == "bind")
        							{
        								contents_series.selectcolumn = "bind:" + ds.getColID(2);
        							}

        							if (chart_series)
        							{
        								contents_series.valuecolumn = chart_series.valuecolumn;
        								contents_series.value2column = chart_series.value2column;
        								contents_series.value3column = chart_series.value3column;
        							}
        							else
        							{
        								contents_series.valuecolumn = "bind:" + ds.getColID(0);
        								contents_series.value2column = "bind:" + ds.getColID(1);
        								contents_series.value3column = "bind:" + ds.getColID(parseInt(Math.random() * 4 + 3));
        							}
        							break;
        						case nexacro.CTSE.Chart.PyramidChartType:
        							if (chart_series)
        								contents_series.valuecolumn = chart_series.valuecolumn;
        							else
        								contents_series.valuecolumn = "bind:" + ds.getColID(2);

        							break;
        						case nexacro.CTSE.Chart.PieChartType:
        						case nexacro.CTSE>Chart.GaugeChartType:
        							if (chart_series.selecttype == "bind")
        								contents_series.selectcolumn = "bind:" + dsgetColID(1);


        							if (chart_series)
        								contents_series.valuecolumn = chart_series.valuecolumn;
        							else
        								contents_series.valuecolumn = "bind:" + ds.getColID(2);

        							break;
        						default:
        							break;
        					}
        				}
        			}
        		}
        		chart.set_enableredraw(false);
        		chart.clearContents();
        		if(contents_copy["hrangebar"])
        		{
        			this._changePrefixUrlContents(objform,contents_copy["hrangebar"]);
        		}
        		if(contents_copy["vrangebar"])
        		{
        			this._changePrefixUrlContents(objform,contents_copy["vrangebar"]);
        		}
        		chart._setContents(contents_copy);
        		chart.set_enableredraw(true);
        		//chart.draw();
        	}
        };
        _ChartUtil.recoveryInitContents = function (objform,setContents)
        {
            var newcontents = null;
        	newcontents = this.cloneContents(setContents);
        	this.InitContents(objform,newcontents);
        };

        _ChartUtil.recoverableInitContents = function (objform,preContents,postContents,bRedraw,bSavePoint)
        {

        	var post = this.cloneContents(postContents);
        	var pre = this.cloneContents(preContents);

        	objform._addUndo(
        						function (redo, data)
        						{
        							if(redo)
        							{
        								data[0].recoveryInitContents(data[1],data[2]);
        							}
        							else
        							{
        								data[0].recoveryInitContents(data[1],data[3]);
        							}
        						}
        						,[this,objform,post,pre,bRedraw]
        						,bSavePoint
        						,true );
        };
        _ChartUtil.ChangeData = function (objform,bOriginData)
        {
        	if(bOriginData)
        	{
        		objform._bOriginData = bOriginData;
        		if (!objform.DS_ChartOriginData)
        		{
        			var obj = new Dataset("DS_ChartOriginData", this);
        			obj._setContents("");
        			objform.addChild(obj.name, obj);

        			objform.on_created();
        		}
        		objform.Sta_datastatusinfo.set_visible(false);
        		objform.initChart_OriginData();
        	}
        	else
        	{
        		objform._bOriginData = false;
        		this.Sta_datastatusinfo.set_visible(true);
        		this.initChart_TempData();


        	}
        }
        _ChartUtil.recoveryChangeData = function (objform,bOriginData)
        {
        	this.ChangeData(objform,bOriginData);
        }

        _ChartUtil.recoverableChangeData = function (objform,bOriginData,bRedraw,bSavePoint)
        {
        	var pre =  !bOriginData;
        	var post = bOriginData;
        	objform._addUndo(

        						function(redo, data)
        						{
        							if(redo,data)
        							{
        								if(redo)
        								{
        									data[0].recoveryChangeData(data[1],data[2]);
        								}
        								else
        								{
        									data[0].recoveryChangeData(data[1],data[3]);
        								}
        							}
        						}
        						,[this,objform,pre,post,bRedraw]
        						,bSavePoint
        						,true);


        };
        _ChartUtil.UpdateProperty = function(objform,objcontrolid,controlindex,sPropName, sPropVal,sControlPropVal, bSetDefault,bUndoRedo)
        {

        	var i,j;
        	var control;
        	var setter = "set_" + sPropName;

        	var chart = objform.Chart_Preview;
        	/*if(bSetDefault)
        	{
        		sPropVal = "";
        	}*/


        	if (chart)
        	{
        		chart.set_enableredraw(false);
        		var controlname = objcontrolid;
        		var prevalue;
        		if (controlname == "seriesset" || controlname == "valueaxes")
        		{
        			prevalue = objform.oContents[controlname][controlindex][sPropName];
        			if (nexacro._isNull(sPropVal) || /*sPropVal === "" ||*/ nexacro._isUndefined(sPropVal) || bSetDefault)
        			{
        				if(objform.oContents[controlname][controlindex][sPropName])
        					delete objform.oContents[controlname][controlindex][sPropName];
        				else
        					objform.oContents[controlname][controlindex][sPropName] = sPropVal;
        			}
        			else
        				objform.oContents[controlname][controlindex][sPropName] = sPropVal;

        			control = chart[controlname][controlindex];
        		}
        		else
        		{
        			prevalue = objform.oContents[controlname][sPropName];
        			if (nexacro._isNull(sPropVal) || /*sPropVal === "" ||*/  nexacro._isUndefined(sPropVal) || bSetDefault)
        			{
        			    if(objform.oContents[controlname][sPropName])
        					delete objform.oContents[controlname][sPropName];
        				else
        					objform.oContents[controlname][sPropName] = sPropVal;
        			}
        			else
        				objform.oContents[controlname][sPropName] = sPropVal;

        			control = chart[controlname];
        		}

        		if (sPropName == "visible")
        		{
        			sControlPropVal = sPropVal;
        		    if (nexacro._isNull(sPropVal) || sPropVal === "" || nexacro._isUndefined(sPropVal))
        			{
        				sControlPropVal = true;
        			}

        			var view_control = objform.Area_Controls.form.Area_information.form["Btn_" + controlname + "_view"];
        			if (view_control)
        			{
        				view_control.setSelectStatus(nexacro._toBoolean(sControlPropVal));
        			}
        			objform.userNotifyCall(nexacro.CTSE.NotifyTypes.REFRESH_PROPERTY,"visible");
        		}
        		if (!objform._bOriginData)
        		{
        			var no_update_list = objform.module.NON_UPDATE_PROPERTY;
        			for (i in no_update_list)
        			{
        				if (i == controlname && no_update_list[i].indexOf(sPropName) > -1)
        				{
        					if (sPropName == "selectcolumn")
        					{
        						if (control[setter])
        							control[setter].call(control, "bind:" + objform.DS_ChartTempData.getColID(1));

        						//chart.draw();
        						chart.set_enableredraw(true);
        					}
        					return true;
        				}
        			}
        		}
        		if (control[setter])
        		{
        			if ((nexacro._isNull(sPropVal) || /*sPropVal === "" ||*/ nexacro._isUndefined(sPropVal)) /*&& !bSetDefault*/)
        			{
        				if(sControlPropVal && nexacro._isString(sControlPropVal))
        				{
        					var temp = sControlPropVal.toLowerCase();
        					if (temp.indexOf("url(") >= 0)
        					{

        						sControlPropVal = this._changePrefixUrl(objform,sControlPropVal);

        					}
        				}

        				control[setter].call(control, sControlPropVal);

        			}
        			else
        			{
        				if(sPropVal && nexacro._isString(sPropVal))
        				{
        					var temp = sPropVal.toLowerCase();
        					if (temp.indexOf("url(") >= 0)
        					{

        						sPropVal = this._changePrefixUrl(objform,sPropVal);

        					}
        				}

        				control[setter].call(control, sPropVal);
        			}
        		}
        		//chart.draw();
        		chart.set_enableredraw(true);
        		return true;
        	}
        	return false;
        };
        _ChartUtil.recoveryProperty = function(objform,objcontrolid,controlindex,sPropName, sPropVal, sControlPropVal,bSetDefault)
        {

        	this.UpdateProperty(objform,objcontrolid,controlindex,sPropName, sPropVal,sControlPropVal,bSetDefault,true);
        };
        _ChartUtil.recoverableProperty = function(objform,objcontrolid,controlindex,sPropName, sPrePropVal,sPostPropVal,sControlPropVal, bSetDefault,bRedraw,bSavePoint)
        {
        	var post = sPostPropVal;
        	var pre = sPrePropVal;

        	objform._addUndo(
        						function (redo, data)
        						{
        							if(redo)
        							{
        								data[0].recoveryProperty(data[1],data[2],data[3],data[4],data[5],data[7],data[8]);
        							}
        							else
        							{
        								data[0].recoveryProperty(data[1],data[2],data[3],data[4],data[6],data[7],data[8]);
        							}
        						}
        						,[this,objform,objcontrolid,controlindex,sPropName,post,pre,sControlPropVal,bSetDefault,bRedraw]
        						,bSavePoint
        						,true );
        };
        _ChartUtil.UpdateChartContents = function (objform,objMenuControl,bDelete,updateContent,bUndoRedo)
        {
        	if(!bDelete)
        	{

        		objMenuControl.setSelectStatus(true);
        		objform.Area_Controls.form.Area_information.form["Btn_" + objMenuControl.controlname + "_view"].set_enable(true);
        		objform.Area_Controls.form.Area_information.form["Btn_" + objMenuControl.controlname + "_view"].setSelectStatus(true);


        		this.updateControlContents(objform.oContents, objMenuControl.controlname,updateContent, true);
        		this.updateControlChart(objform,objform.Chart_Preview, objMenuControl.controlname, objform.oContents[objMenuControl.controlname], true);

        	}
        	else
        	{

        		objMenuControl.setSelectStatus(false);
        		objform.Area_Controls.form.Area_information.form["Btn_" + objMenuControl.controlname + "_view"].set_enable(false);
        		objform.Area_Controls.form.Area_information.form["Btn_" + objMenuControl.controlname + "_view"].setSelectStatus(false);


        		this.updateControlContents(objform.oContents, objMenuControl.controlname, null, false);
        		this.updateControlChart(objform,objform.Chart_Preview, objMenuControl.controlname, null, false);
        	}
        	this.updateMenuButton(objform.Area_Controls.form.Area_information.form["Btn_" + objMenuControl.controlname], objMenuControl.getSelectStatus());
        	objform.userNotifyCall(nexacro.CTSE.NotifyTypes.CHANGE_SELECTED, "none");
        }
        _ChartUtil.recoveryContents = function (objform,objMenuControl,bDelete,updateContent,index)
        {
           this.UpdateChartContents(objform,objMenuControl,bDelete,updateContent,true);
        }
        _ChartUtil.recoverableDeleteContents = function (objform,objMenuControl,updateContents,bRedraw,bSavePoint)
        {


        	var index = nexacro.CTSE.Chart.Util.indexOf(objform.oContents,objMenuControl.controlname);
        	var pre = this.cloneContents(updateContents);
        	var post = {};

        	objform._addUndo(
        						function (redo, data)
        						{
        							if(redo)
        							{
        								data[0].recoveryContents(data[1],data[2],true,data[4],data[5]);
        							}else{
        								data[0].recoveryContents(data[1],data[2],false,data[3],data[5]);
        							}
        						}
        						,[this,objform,objMenuControl, pre, post,index, bRedraw]
        						,bSavePoint
        						,true );

        };
        _ChartUtil.recoverableAddContents = function (objform,objMenuControl,updateContents,bRedraw,bSavePoint)
        {
            var index = -1;
        	var pre = {};
        	var post = this.cloneContents(updateContents);

        	objform._addUndo(
        						function (redo, data)
        						{
        							if(redo)
        							{
        								data[0].recoveryContents(data[1],data[2],false,data[4],data[5]);
        							}else{
        								data[0].recoveryContents(data[1],data[2],true,data[3],data[5]);
        							}
        						}
        						,[this,objform,objMenuControl, pre, post, bRedraw]
        						,bSavePoint
        						,true );

        };
        _ChartUtil.UpdateSeries = function(objform,objcurrentSelect,bDelete,seriesId,seriesContents,index)
        {
        	if(!bDelete)
        	{

        		var series_len = objform.oContents["seriesset"] ? objform.oContents["seriesset"].length : 0;
        		// seriesset
        		if(index < 0)
        			objform.oContents["seriesset"].push(seriesContents);
        		else
        			objform.oContents["seriesset"].splice(index,0,seriesContents);

        		objform._series_cnt++;

        	    var expand_contents_copy = this.cloneContents(seriesContents);
        	    if (!objform._bOriginData)
        	    {
        		  // valuecolumn circulation
        		  var series_bindvaluecolumn = objform._last_valuecolumn++;
        		  if (objform.DS_ChartTempData.getColCount() == series_bindvaluecolumn)
        		  {
        				series_bindvaluecolumn = 2;
        				if(objform._charttype == nexacro.CTSE.Chart.BubbleChartType)
        					series_bindvaluecolumn++;
        		  }

        			switch(objform._charttype)
        			{
        				case nexacro.CTSE.Chart.BasicChartType:
        				case nexacro.CTSE.Chart.RoseChartType:
        				case nexacro.CTSE.Chart.RadarChartType:
        					expand_contents_copy["valuecolumn"] = "bind:" + objform.DS_ChartTempData.getColID(series_bindvaluecolumn);
        					break;
        				case nexacro.CTSE.Chart.FloatChartType:
        					expand_contents_copy["valuecolumn"] = "bind:" + objform.DS_ChartTempData.getColID(series_bindvaluecolumn);
        					expand_contents_copy["value2column"] = "bind:" + objform.DS_ChartTempData.getColID(1);
        					break
        				case nexacro.CTSE.Chart.BubbleChartType:
        					expand_contents_copy["valuecolumn"] = "bind:" + objform.DS_ChartTempData.getColID(0);
        					expand_contents_copy["value2column"] = "bind:" + objform.DS_ChartTempData.getColID(1);
        					expand_contents_copy["value3column"] = "bind:" + objform.DS_ChartTempData.getColID(series_bindvaluecolumn);
        					break;
        				case nexacro.CTSE.Chart.PyramidChartType:
        				case nexacro.CTSE.Chart.PieChartType:
        				case nexacro.CTSE.Chart.GaugeChartType:
        					expand_contents_copy["valuecolumn"] = "bind:" + objform.DS_ChartTempData.getColID(series_bindvaluecolumn);
        					break;

        				default:
        					break;
        			}

        	    }
        		//update chart_preview
        		var chart = objform.Chart_Preview;
        		chart.set_enableredraw(false);
        		chart.setSeries(seriesId, expand_contents_copy);
        		//chart.draw();
        		// control update
        		chart.set_enableredraw(true);

        		obj = new nexacro.Button(seriesId);
        		obj.set_text(seriesId);
        		obj.set_cssclass("left_menu2");
        		obj.getSetter("subcontrol").set(false);
        		switch(objform._charttype)
        		{
        			case nexacro.CTSE.Chart.BasicChartType:
        				obj.getSetter("classname").set("nexacro.ChartBasicSeriesControl");
        				break;
        			case nexacro.CTSE.Chart.BubbleChartType:
        				obj.getSetter("classname").set("nexacro.ChartBubbleSeriesControl");
        				break;
        			case nexacro.CTSE.Chart.PieChartType:
        				obj.getSetter("classname").set("nexacro.ChartPieSeriesControl");
        				break;
        			case nexacro.CTSE.Chart.PyramidChartType:
        				obj.getSetter("classname").set("nexacro.ChartPyramidSeriesControl");
        				break;
        			case nexacro.CTSE.Chart.RadarChartType:
        				obj.getSetter("classname").set("nexacro.ChartRadarSeriesControl");
        				break;
        			case nexacro.CTSE.Chart.RoseChartType:
        				obj.getSetter("classname").set("nexacro.ChartRoseSeriesControl");
        				break;
        			case nexacro.CTSE.Chart.GaugeChartType:
        			  obj.getSetter("classname").set("nexacro.ChartGaugeSeriesControl");
        				break;
        			case nexacro.CTSE.Chart.FloatChartType:
        			  obj.getSetter("classname").set("nexacro.ChartFloatSeriesControl");
        				break;
        			default:
        			break;
        		}

        		obj.getSetter("controlname").set("seriesset");
        		if(index < 0)
        		{
        			obj.getSetter("index").set(series_len);
        		}
        		else
        			obj.getSetter("index").set(index);

        		obj.addEventHandler("onclick", objform.Div_Controls_Btn_onclick,objform);

        		if(index < 0)
        		{
        			objform.Area_Controls.form.Area_seriesset.form.addChild(seriesId, obj);
        		}
        		else
        		{
        			if(objform._charttype != nexacro.CTSE.Chart.FloatChartType)
        			objform.Area_Controls.form.Area_seriesset.form.insertChild(index*2,seriesId, obj);
        		}
        		obj.show();

        		//series expand button
        		switch(objform._charttype)
        		{
        			case nexacro.CTSE.Chart.BasicChartType:
        			case nexacro.CTSE.Chart.PieChartType:
        					obj = new nexacro.Button("Btn_SeriesSelector_" + seriesId);
        					obj.set_cssclass("btn_type_open");
        					obj.getSetter("subcontrol").set(true);
        					obj.getSetter("parentname").set(seriesId);

        					obj.addEventHandler("onclick", objform.Div_Controls_Btn_template_onclick, objform);
        					if(index < 0)
        						objform.Area_Controls.form.Area_seriesset.form.addChild("Btn_SeriesSelector_" + seriesId, obj);
        					else
        						objform.Area_Controls.form.Area_seriesset.form.insertChild((index*2)+1,"Btn_SeriesSelector_" + seriesId, obj);
        					obj.show();

        					//referesh menu
        					objform.Area_Controls.form.Expander_seriesset.expandStatus = "expand";
        					objform.Area_Controls.form.Expander_seriesset.set_cssclass("btn_" + objform.Area_Controls.form.Expander_seriesset.expandStatus);
        			break;
        		case nexacro.CTSE.Chart.PyramidChartType:
        		case nexacro.CTSE.Chart.BubbleChartType:
        		case nexacro.CTSE.Chart.RadarChartType:
        		case nexacro.CTSE.Chart.GaugeChartType:
        		case nexacro.CTSE.Chart.FloatChartType:

        			break;

        			default:
        			break;
        		}


        		nexacro.CTSE.Chart.Menu.rearrangeArea(objform.Area_Controls.form.Area_seriesset);
        		nexacro.CTSE.Chart.Menu.resetscrollArea(objform.Area_Controls);

        	}
        	else
        	{
        		var bChangeSelect = false;
        		var chart = objform.Chart_Preview;
        		var comps = objform.Area_Controls.form.Area_seriesset.form.components;
        	    var comps_len = comps.length;

        	    var deletecontrol = comps[seriesId];
        		var deleteexpandcontrol = comps["Btn_SeriesSelector_" + seriesId];

        	    var currentselectcontrol = objform._selected_control;
        		var useExpandButton = currentselectcontrol ?  true : false;
        		if(deletecontrol)
        		{
        			if(deletecontrol == currentselectcontrol)
        				bChangeSelect = true;

        			deletecontrol.destroy();
        			if(deleteexpandcontrol)
        				deleteexpandcontrol.destroy();
        		}
        		var seriesset = objform.oContents["seriesset"];
        		if (seriesset)
        		{
        			seriesset.splice(this.indexOf(seriesset, seriesId), 1);

        			objform._series_cnt--;
        			chart.set_enableredraw(false);
        			chart.deleteSeries(seriesId);
        			//chart.draw();
        			chart.set_enableredraw(true);
        		}

        		objform.Area_Controls.form.Expander_seriesset.expandStatus = "expand";
        		objform.Area_Controls.form.Expander_seriesset.set_cssclass("btn_" + objform.Area_Controls.form.Expander_seriesset.expandStatus);

        		nexacro.CTSE.Chart.Menu.rearrangeArea(objform.Area_Controls.form.Area_seriesset);
        		nexacro.CTSE.Chart.Menu.resetscrollArea(objform.Area_Controls);

        		if(bChangeSelect)
        		{
        			objform._selected_control = null;
        			objform.userNotifyCall(nexacro.CTSE.NotifyTypes.CHANGE_SELECTED, "none");
        		}


        	}
        };

        _ChartUtil.recoverySeries = function(objform,objcurrentSelect,bDelete,seriesId,seriesContents,seriesindex)
        {
            var newcontents = null;
        	if(!bDelete)
        		newcontents = this.cloneContents(seriesContents);
        	else
        		newcontents = seriesContents;
        	this.UpdateSeries(objform,objcurrentSelect,bDelete,seriesId,newcontents,seriesindex);
        };
        _ChartUtil.recoverableDeleteSeries = function (objform,orgContents,seriesid,seriesContents,bRedraw,bSavePoint)
        {
        	var seriesset = orgContents["seriesset"];
        	var seriesindex = -1;
        	if(seriesset)
        	{
        		seriesindex = this.indexOf(seriesset,seriesid);
        	}

        	var pre = this.cloneContents(seriesContents);
        	var post = {};

        	objform._addUndo(
        						function (redo, data)
        						{
        							if(redo)
        							{
        								data[0].recoverySeries(data[1],null,true,data[2],data[4],data[5]);
        							}else
        							{
        								data[0].recoverySeries(data[1],null,false,data[2],data[3],data[5]);
        							}
        						}
        						,[this,objform, seriesid, pre, post,seriesindex,bRedraw]
        						,bSavePoint
        						,true );
        };
        _ChartUtil.recoverableAddSeries = function (objform,orgContents,seriesid,seriesContents,bRedraw,bSavePoint)
        {
        	var seriesset = orgContents["seriesset"];
        	var seriesindex = -1;
        	if(seriesset)
        	{
        		seriesindex = this.indexOf(seriesset,seriesid);
        	}
        	var pre = {};
        	var post = this.cloneContents(seriesContents);
        	objform._addUndo(
        						function (redo, data)
        						{
        							if(redo)
        							{
        								data[0].recoverySeries(data[1],null,false,data[2],data[4],data[5]);
        							}else{
        								data[0].recoverySeries(data[1],null,true,data[2],data[3],data[5]);
        							}
        						}
        						,[this,objform, seriesid, pre, post,seriesindex,bRedraw]
        						,bSavePoint
        						,true );
        };
        _ChartUtil.UpdateAxis = function(objform,objcurrentAxis,bDelete,axisId,axisContents,bUndoRedo,index)
        {
        	if(!bDelete)
        	{
        		//trace(axisContents);
        		var expand_contents, expand_contents_copy;

        		var chart = objform.Chart_Preview;
        		var comps = objform.Area_Controls.form.Area_valueaxes.form.components;
        		var comps_len = comps.length;

        		//make contents
        		expand_contents = axisContents;
        		expand_contents.id = axisId;
        		objform._valueaxis_cnt++;
        	   // trace(expand_contents.id);
        		expand_contents_copy = this.cloneContents(expand_contents);

        		//update contents
        		if(index < 0)
        			objform.oContents["valueaxes"].push(expand_contents);
        		else
        			objform.oContents["valueaxes"].splice(index,0,expand_contents);

        		//update chart_preview
        		chart.set_enableredraw(false);
        		chart.setValueaxis(expand_contents.id, expand_contents_copy);
        		//chart.draw();
        		chart.set_enableredraw(true);
        		//update editor
        		//axis button
        		var obj = new nexacro.Button(expand_contents.id);
        		obj.set_text(expand_contents.id);
        		obj.set_cssclass("left_menu2");
        		obj.getSetter("subcontrol").set(false);
        		obj.getSetter("classname").set("nexacro.ChartAxisControl");
        		obj.getSetter("controlname").set("valueaxes");
        		if(index < 0)
        			obj.getSetter("index").set(comps_len);
        		else
        			obj.getSetter("index").set(index);

        		obj.addEventHandler("onclick", objform.Div_Controls_Btn_onclick, objform);
        		if(index < 0)
        			objform.Area_Controls.form.Area_valueaxes.form.addChild(expand_contents.id, obj);
        		else
        			objform.Area_Controls.form.Area_valueaxes.form.insertChild(index,expand_contents.id, obj);

        		obj.show();

        		//referesh menu
        		objform.Area_Controls.form.Expander_valueaxes.expandStatus = "expand";
        		objform.Area_Controls.form.Expander_valueaxes.set_cssclass("btn_" + objform.Area_Controls.form.Expander_valueaxes.expandStatus);

        		nexacro.CTSE.Chart.Menu.rearrangeArea(objform.Area_Controls.form.Area_valueaxes);
        		nexacro.CTSE.Chart.Menu.resetscrollArea(objform.Area_Controls);

        		//notyfy
        		//objform.userNotifyCall(nexacro.CTSE.NotifyTypes.CHANGE_CONTENTS, null);
        		objform.userNotifyCall(nexacro.CTSE.NotifyTypes.CHANGE_SELECTED, "none");
        	}
        	else
        	{

        		var bChangeSelect = false;
        		var chart = objform.Chart_Preview;
        		var comps = objform.Area_Controls.form.Area_valueaxes.form.components;
        	    var comps_len = comps.length;

        	    var deletecontrol = comps[axisId];
        		var currentselectcontrol = objform._selected_control;
        		var useExpandButton = currentselectcontrol ?  true : false;
        		if(deletecontrol)
        		{
        			if(currentselectcontrol)
        			{
        				if(deletecontrol.id == currentselectcontrol.id)
        					bChangeSelect = true;
        			}

        			deletecontrol.destroy();
        		}
        		var valueaxes = objform.oContents["valueaxes"];

        	    if (valueaxes)
        		{
        			valueaxes.splice(this.indexOf(valueaxes, axisId), 1);
        			chart.set_enableredraw(false);
        			chart.deleteValueaxis(chart.getValueaxisByID(axisId));
        			objform._valueaxis_cnt--;
        			//chart.draw();
        			chart.set_enableredraw(true);
        		}

        		objform.Area_Controls.form.Expander_valueaxes.expandStatus = "expand";
        		objform.Area_Controls.form.Expander_valueaxes.set_cssclass("btn_" + objform.Area_Controls.form.Expander_valueaxes.expandStatus);

        		nexacro.CTSE.Chart.Menu.rearrangeArea(objform.Area_Controls.form.Area_valueaxes);
        		nexacro.CTSE.Chart.Menu.resetscrollArea(objform.Area_Controls);


        		//notify
        		//objform.userNotifyCall(nexacro.CTSE.NotifyTypes.CHANGE_CONTENTS, null);

        		if(bChangeSelect)
        		{
        			objform._selected_control = null;
        			objform.userNotifyCall(nexacro.CTSE.NotifyTypes.CHANGE_SELECTED, "none");
        		}

        	}



        };
        _ChartUtil.recoveryAxis = function(objform,objcurrentAxis,bDelete,axisId,axisContents,axisindex)
        {

            var newcontents = null;
        	if(!bDelete)
        		newcontents = this.cloneContents(axisContents);
        	else
        		newcontents = axisContents;

        	this.UpdateAxis(objform,objcurrentAxis,bDelete,axisId,newcontents,true,axisindex);
        };

        _ChartUtil.recoverableDeleteAxis = function (objform,orgContents,axisId,axisContents,bRedraw,bSavePoint)
        {
            var valueaxisset = orgContents["valueaxes"];
        	var axisindex = -1;
        	if(valueaxisset)
        	{
        		axisindex = this.indexOf(valueaxisset,axisId);
        	}

        	var pre = this.cloneContents(axisContents);
        	var post = {};

        	objform._addUndo(
        						function (redo, data)
        						{

        							if(redo)
        							{
        								data[0].recoveryAxis(data[1],null,true,data[2],data[4],data[5]);
        							}
        							else
        							{
        								data[0].recoveryAxis(data[1],null,false,data[2],data[3],data[5]);
        							}
        						}
        						,[this,objform, axisId, pre, post,axisindex,bRedraw]
        						,bSavePoint
        						,true );
        };
        _ChartUtil.recoverableAddAxis = function (objform,orgContents,axisId,axisContents,bRedraw,bSavePoint)
        {
        	var valueaxisset = orgContents["valueaxes"];
        	var axisindex = -1;


        	var pre = {};
        	var post = this.cloneContents(axisContents);
        	objform._addUndo(
        						function (redo, data)
        						{
        							if(redo)
        							{
        								data[0].recoveryAxis(data[1],null,false,data[2],data[4],data[5]);
        							}else{
        								data[0].recoveryAxis(data[1],null,true,data[2],data[3],data[5]);
        							}
        						}
        						,[this,objform, axisId, pre, post,axisindex,bRedraw]
        						,bSavePoint
        						,true );
        };

        _ChartUtil.updateColorsetSeries = function (objform,colorset)
        {
        	var chart = objform.Chart_Preview;
        	var seriesset = objform.oContents["seriesset"];
        	var bchanged = false;
        	if (chart && seriesset)
        	{
        		var i = 0;
        		var coloser_idx = 0;
        		var contents;
        		var chart_control, contents_control;
        		var copy_seriesset = this.cloneContents(seriesset);
        		var series_len = seriesset.length;
        		for (i; i <series_len; i++)
        		{
        			coloser_idx = i % (colorset.length);
        			contents_control = seriesset[i];
        			chart_control = chart.getSeriesByID(contents_control.id);

        			switch(objform._charttype)
        			{
        				case nexacro.CTSE.Chart.BasicChartType:

        					contents = {};

        					if (chart_control.barvisible)
        					{
        						contents["barlinestyle"] = "1px solid " + colorset[coloser_idx];
        						contents["barfillstyle"] = colorset[coloser_idx];
        						bchanged = true;
        					}
        					if (chart_control.pointvisible)
        					{
        						contents["pointlinestyle"] = "1px solid " + colorset[coloser_idx];
        						contents["pointfillstyle"] = colorset[coloser_idx];
        						bchanged = true;
        					}
        					if (chart_control.linevisible)
        					{
        						contents["linestyle"] = "1px solid " + colorset[coloser_idx];
        						contents["linefillstyle"] = colorset[coloser_idx];
        						bchanged = true;
        					}
        					if (chart_control.lineareavisible)
        					{
        						contents["lineareafillstyle"] = colorset[coloser_idx];
        						bchanged = true;
        					}

        					if (chart_control.highlightbarvisible)
        					{
        						contents["highlightbarlinestyle"] = "1px solid " + colorset[coloser_idx];
        						contents["highlightbarfillstyle"] = colorset[coloser_idx];
        						bchanged = true;
        					}
        					if (chart_control.highlightpointvisible)
        					{
        						contents["highlightpointlinestyle"] = "1px solid " + colorset[coloser_idx];
        						contents["highlightpointfillstyle"] = colorset[coloser_idx];
        						bchanged = true;
        					}
        					if (chart_control.highlightlinevisible)
        					{
        						contents["highlightlinestyle"] = "1px solid " + colorset[coloser_idx];
        						bchanged = true;
        					}
        					break;
        				case nexacro.CTSE.Chart.FloatChartType:

        					contents = {};

        					if (chart_control.visible)
        					{
        						contents["positivebarlinestyle"] = "1px solid red";
        						contents["positivebarfillstyle"] = "#eb495c";

        						contents["negativebarlinestyle"] = "1px solid blue";
        						contents["negativebarfillstyle"] = "#5058eb";

        						bchanged = true;
        					}

        					if (chart_control.highlightbarvisible)
        					{
        						contents["highlightpositivebarfillstyle"] = "red";
        						contents["highlightpositivebarlinestyle"] = "1px solid #eb495c";
        						contents["highlightnegativebarfillstyle"] = "blue";
        						contents["highlightnegativebarlinestyle"] = "1px solid #5058eb";
        						bchanged = true;
        					}
        					break;
        				case nexacro.CTSE.Chart.RoseChartType:
        					contents = {};

        					contents["linestyle"] = "1px solid " + colorset[coloser_idx];
        					contents["fillstyle"] = colorset[coloser_idx];
        					bchanged = true;

        					if (chart_control.highlightvisible)
        					{
        						contents["highlightlinestyle"] = "1px solid #dddddd";
        						bchanged = true;
        					}
        					break;
        				case nexacro.CTSE.Chart.RadarChartType:

        					contents = {};


        					if (chart_control.pointvisible)
        					{
        						contents["pointlinestyle"] = "1px solid " + colorset[coloser_idx];
        						contents["pointfillstyle"] = colorset[coloser_idx];
        						bchanged = true;
        					}
        					if (chart_control.linevisible)
        					{
        						contents["linestyle"] = "1px solid " + colorset[coloser_idx];
        						contents["linefillstyle"] = colorset[coloser_idx];
        						bchanged = true;
        					}
        					if (chart_control.lineareavisible)
        					{
        						contents["lineareafillstyle"] = colorset[coloser_idx];
        						bchanged = true;
        					}

        					if (chart_control.highlightpointvisible)
        					{
        						contents["highlightpointlinestyle"] = "1px solid " + colorset[coloser_idx];
        						contents["highlightpointfillstyle"] = colorset[coloser_idx];
        						bchanged = true;
        					}
        					if (chart_control.highlightlinevisible)
        					{
        						contents["highlightlinestyle"] = "1px solid " + colorset[coloser_idx];
        						bchanged = true;
        					}
        					if (chart_control.highlightlineareavisible)
        					{
        						contents["highlightlineareafillstyle"] = colorset[coloser_idx];
        						bchanged = true;
        					}
        					break;
        				case nexacro.CTSE.Chart.BubbleChartType:
        					contents = {
        						"linestyle" : "1px solid " + colorset[coloser_idx],
        						"fillstyle" : colorset[coloser_idx]
        					};

        					if (chart_control.highlightvisible)
        					{
        						contents["highlightlinestyle"] = "1px solid " + colorset[coloser_idx];
        						contents["highlightfillstyle"] = colorset[coloser_idx];
        					}
        					bchanged = true;
        					break;
        				case nexacro.CTSE.Chart.PyramidChartType:
        				case nexacro.CTSE.Chart.PieChartType:

        					var pie_fillstyle = colorset.toString();
        					contents = {
        							"linestyle" : "1px solid " + colorset[coloser_idx],
        							"fillstyle" : pie_fillstyle
        					};

        					if (chart_control.highlightvisible)
        					{
        					  contents["highlightlinestyle"] = "1px solid " + colorset[coloser_idx];
        						contents["highlightfillstyle"] = colorset[coloser_idx];
        					}
        					bchanged = true;
        					break;
        				case nexacro.CTSE.Chart.GaugeChartType:
        						var gauge_fillstyle = colorset.toString();
        						var length = colorset.length ;
        						var fillindex = coloser_idx + 1;
        						if (fillindex == length) fillindex = 0;
        						contents = {
        						  "linestyle": "1px solid " + colorset[coloser_idx],
        							"barfillstyle": colorset[coloser_idx],
        							"fillstyle": colorset[fillindex],
        							"opacity": "0.5"
        						};

        						if (chart_control.highlightvisible)
        						{
        							contents["highlightlinestyle"] = "1px solid " + colorset[coloser_idx];
        							contents["highlightbarfillstyle"] = colorset[coloser_idx];
        						}
        						bchanged = true;
        						break;
        				default:
        				break;
        			}


        			var idx = nexacro.CTSE.Chart.Util.indexOf(copy_seriesset,contents_control.id);
        			nexacro.CTSE.Chart.Util.updateContents(copy_seriesset[idx], contents);


        		}
        		if(bchanged)
        			return copy_seriesset;
        		else
        		{
        			copy_seriesset = {};
        			delete copy_seriesset;
        			return null;
        		}


        	}
        	return null;
        };
        _ChartUtil.UpdateColorSetTemplate = function(objform,updatecontents,selectedcolorsetid)
        {
        	var chart = objform.Chart_Preview;
        	var seriesset = updatecontents;

            if(chart && objform.oContents["seriesset"])
        	{
        	    chart.set_enableredraw(false);
        		objform.oContents["seriesset"] = {};
        		delete objform.oContents["seriesset"];

        		objform.oContents["seriesset"] = updatecontents;
        		chart.deleteAllSeries();
        		var i = 0;

        		var contents;
        		var chart_control, contents_control;

        		var series_len = seriesset.length;

        		var series_bindvaluecolumn = 2;
        		if(objform._charttype == nexacro.CTSE.Chart.BubbleChartType)
        			series_bindvaluecolumn++;
        		for (i; i <series_len; i++)
        		{
        			contents_control = seriesset[i];
        			var expand_contents_copy = this.cloneContents(contents_control);
        			if (!objform._bOriginData)
        			{

        				if (objform.DS_ChartTempData.getColCount() == series_bindvaluecolumn)
        					series_bindvaluecolumn = 2;

        				switch(objform._charttype)
        				{
        					case nexacro.CTSE.Chart.BasicChartType:
        					case nexacro.CTSE.Chart.RoseChartType:
        					case nexacro.CTSE.Chart.RadarChartType:
        						expand_contents_copy["valuecolumn"] = "bind:" + objform.DS_ChartTempData.getColID(series_bindvaluecolumn);
        						series_bindvaluecolumn++;
        					break;
        					case nexacro.CTSE.Chart.FloatChartType:
        						expand_contents_copy["valuecolumn"] = "bind:" + objform.DS_ChartTempData.getColID(2);
        						expand_contents_copy["value2column"] = "bind:" + objform.DS_ChartTempData.getColID(1);
        						series_bindvaluecolumn++;
        					break;
        					case nexacro.CTSE.Chart.BubbleChartType:

        						expand_contents_copy["valuecolumn"] = "bind:" + objform.DS_ChartTempData.getColID(0);
        						expand_contents_copy["value2column"] = "bind:" + objform.DS_ChartTempData.getColID(1);
        						expand_contents_copy["value3column"] = "bind:" + objform.DS_ChartTempData.getColID(series_bindvaluecolumn);
        						series_bindvaluecolumn++;
        					break;
        					case nexacro.CTSE.Chart.PyramidChartType:
        					case nexacro.CTSE.Chart.PieChartType:
        					case nexacro.CTSE.Chart.GaugeChartType:
        						expand_contents_copy["valuecolumn"] = "bind:" + objform.DS_ChartTempData.getColID(series_bindvaluecolumn);
        						series_bindvaluecolumn++;
        					break;

        					default:
        					break;
        				}

        			}
        			chart.setSeries(contents_control.id, expand_contents_copy);
        		}
        		//chart.draw();
        		chart.set_enableredraw(true);
        	}



        	objform._selected_colorset = selectedcolorsetid;
        	if (nexacro._isNull(selectedcolorsetid) || selectedcolorsetid === "")
        	{
        		objform.Area_Controls.form.Btn_SeriessetColor.setSelectStatus(false);
        		/*var popup_comps = objform["Popup_ColorsetTemplate"].form.components;
        		var popup_comps_length = popup_comps.length;
        		var i = 0;
        		trace("==========" + selectedcolorsetid);
        		for(i;i < popup_comps_length;i++)
        		{
        			var comp = popup_comps[i];

        			if(comp && comp.colorset)
        			{
        				comp.setSelectStatus(false);
        				 trace("-----------------" + comp.colorset);
        			}
        		}*/
        	}
        	else
        	{
        		objform.Area_Controls.form.Btn_SeriessetColor.setSelectStatus(true);
        		/*var popup_comps = objform["Popup_ColorsetTemplate"].form.components;
        		var popup_comps_length = popup_comps.length;
        		var i = 0;
        		trace("==========" + selectedcolorsetid);
        		for(i;i < popup_comps_length;i++)
        		{
        			var comp = popup_comps[i];

        			if(comp && comp.colorset && comp.colorset == selectedcolorsetid)
        			{
        				comp.setSelectStatus(true);
        				trace("++++++++++++++++++" + comp.colorset);
        			}
        			else if(comp && comp.colorset)
        			{
        			    trace("-----------------" + comp.colorset);
        				comp.setSelectStatus(false);
        			}
        		}*/
        	}

        };
        _ChartUtil.recoveryColorSetTemplate = function(objform,updatecontents,selectedcolorsetid)
        {
        	var newcontents = null;

        	newcontents = this.cloneContents(updatecontents);
        	this.UpdateColorSetTemplate(objform,newcontents,selectedcolorsetid);
        };
        _ChartUtil.recoverableColorSetTemplate = function(objform,preseriesset,postseriesset,preselectedcolorsetid,postselectedcolorsetid,bRedraw,bSavePoint)
        {


        	var pre  = this.cloneContents(preseriesset);
        	var post = this.cloneContents(postseriesset);
        	objform._addUndo(
        						function (redo, data)
        						{
        							if(redo)
        							{
        								data[0].recoveryColorSetTemplate(data[1],data[3],data[5],data[6]);
        							}else{
        								data[0].recoveryColorSetTemplate(data[1],data[2],data[4],data[6]);
        							}
        						}
        						,[this,objform, pre, post,preselectedcolorsetid,postselectedcolorsetid,bRedraw]
        						,bSavePoint
        						,true );
        };
        _ChartUtil.updateBarTemplateSeries = function(objform,template,prop,data)
        {
        	var contents = objform.module["template_series_" + template];
        	var control = objform._selected_control;
        	var seriescontents = objform.oContents["seriesset"][control.index];
        	var series = objform.Chart_Preview.seriesset[control.index];
        	var copy_series = this.cloneContents(seriescontents);

        	switch(objform._charttype)
        	{
        		case nexacro.CTSE.Chart.BasicChartType:
        			var cur_status = series[prop];
        			if (prop == "stacktype")
        			{
        				if (cur_status == "none")
        				{
        					cur_status = false;
        					contents[prop] = "normal";
        				}
        				else
        				{
        					cur_status = true;
        					contents[prop] = "none";
        				}
        			}
        			else
        			{
        				if (cur_status)
        				{
        					contents[prop] = false;
        				}
        				else
        				{
        					contents[prop] = true;
        				}
        			}
        		break;
        		case nexacro.CTSE.Chart.BubbleChartType:
        		break;

        		case nexacro.CTSE.Chart.PieChartType:
        		break;
        		case nexacro.CTSE.Chart.RadarChartType:
        		break;
        		case nexacro.CTSE.Chart.GaugeChartType:
        		break;
        		default:
        		break;
        	}


        	nexacro.CTSE.Chart.Util.updateContents(copy_series, contents);
        	data[0] = copy_series;
        	data[1] = !cur_status;
        	data[2] = control.index;

        }
        _ChartUtil.UpdateSeriesBarTemplate = function(objform,updateSeries,selectedtemplateid,objstatus,seriesindex)
        {
        	var chart = objform.Chart_Preview;
        	var seriesid = updateSeries["id"];

        	var series_bindvaluecolumn = 2;
        	if(objform._charttype == nexacro.CTSE.Chart.BubbleChartType)
        		series_bindvaluecolumn++;
        	if(chart && objform.oContents["seriesset"])
        	{
        		var bAddChart = false;
        		var copy_series = this.cloneContents(updateSeries);
        		var getSeries = objform.oContents["seriesset"][seriesindex];
        		if(seriesid == getSeries["id"])
        		{


        			objform.oContents["seriesset"].splice(this.indexOf(objform.oContents["seriesset"], seriesid),1,updateSeries);

        			bAddChart = true;

        		}
        		else
        		{
        			if(seriesid)
        			{
        				var i = 0;
        				var series_len = objform.oContents["seriesset"].length;
        				for (i; i <series_len; i++)
        				{
        					contents = objform.oContents["seriesset"][i];
        					if(contents["id"] == seriesid)
        					{

        						objform.oContents["seriesset"].splice(this.indexOf(objform.oContents["seriesset"], seriesid),1,updateSeries);
        						bAddChart = true;


        						break;
        					}
        				}
        			}
        			else
        			{
        				objform.oContents["seriesset"].splice(seriesindex,1,updateSeries);

        				bAddChart = true;

        			}
        		}
        		if(bAddChart)
        		{
        				if (!objform._bOriginData)
        				{
        					series_bindvaluecolumn += seriesindex;
        					if (objform.DS_ChartTempData.getColCount() == series_bindvaluecolumn)
        					{	series_bindvaluecolumn = 2;
        						if(objform._charttype == nexacro.CTSE.Chart.BubbleChartType)
        							series_bindvaluecolumn++;
        					}

        					switch(objform._charttype)
        					{
        						case nexacro.CTSE.Chart.BasicChartType:
        						case nexacro.CTSE.Chart.RoseChartType:
        						case nexacro.CTSE.Chart.RadarChartType:
        							copy_series["valuecolumn"] = "bind:" + objform.DS_ChartTempData.getColID(series_bindvaluecolumn);

        						break;
        						case nexacro.CTSE.Chart.FloatChartType:
        							copy_series["valuecolumn"] = "bind:" + objform.DS_ChartTempData.getColID(2);
        							copy_series["value2column"] = "bind:" + objform.DS_ChartTempData.getColID(1);
        						break;
        						case nexacro.CTSE.Chart.BubbleChartType:
        							copy_series["valuecolumn"] = "bind:" + objform.DS_ChartTempData.getColID(0);
        							copy_series["value2column"] = "bind:" + objform.DS_ChartTempData.getColID(1);
        							copy_series["value3column"] = "bind:" + objform.DS_ChartTempData.getColID(series_bindvaluecolumn);

        						break;
        						case nexacro.CTSE.Chart.PyramidChartType:
        						case nexacro.CTSE.Chart.PieChartType:
        						case nexacro.CTSE.Chart.GaugeChartType:
        							copy_series["valuecolumn"] = "bind:" + objform.DS_ChartTempData.getColID(series_bindvaluecolumn);
        						break;

        						default:
        						break;
        					}
        				}
        				chart.set_enableredraw(false);
        				chart.setSeries(seriesid,copy_series);
        				//chart.draw();
        				chart.set_enableredraw(true);
        		}
        		objform._selected_template = selectedtemplateid;
        		var popup_comps = objform["Popup_SeriesTemplate_Bar"].form.components;
        		switch(objform._charttype)
        		{
        			case nexacro.CTSE.Chart.BasicChartType:

        				var popup_comps_length = popup_comps.length;
        				var i = 0;

        				for(i;i < popup_comps_length;i++)
        				{
        					var comp = popup_comps[i];

        					if(comp &&  comp.template && comp.template == selectedtemplateid)
        					{
        						comp.setSelectStatus(objstatus);
        					}
        				}
        				break;
        			case nexacro.CTSE.Chart.BubbleChartType:
        				break;
        			case nexacro.CTSE.Chart.RadarChartType:
        			case nexacro.CTSE.Chart.RoseChartType:
        				break;
        			case nexacro.CTSE.Chart.GaugeChartType:
        				break;
        			case nexacro.CTSE.Chart.PieChartType:
        				var popup_comps_length = popup_comps.length;
        				var i = 0;

        				for(i;i < popup_comps_length;i++)
        				{
        					var comp = popup_comps[i];

        					if(comp &&  comp.template && comp.template == selectedtemplateid)
        					{
        						comp.setSelectStatus(true);

        					}
        				}
        				if(selectedtemplateid == "pie")
        				{
        				   popup_comps["Btn_Temp_donut"].setSelectStatus(false);
        				}
        				else
        				{
        				   popup_comps["Btn_Temp_pie"].setSelectStatus(false);
        				}
        				break;

        			default:
        				break;
        		}


        	}
        };
        _ChartUtil.recoverySeriesBarTemplate = function(objform,updateSeries,selectedtemplateid,objstatus,seriesindex)
        {
        	var newcontents = null;
        	newcontents = this.cloneContents(updateSeries);
        	this.UpdateSeriesBarTemplate(objform,newcontents,selectedtemplateid,objstatus,seriesindex);
        };
        _ChartUtil.recoverableSeriesBarTemplate = function(objform,preseries,postseries,preselectedtemplateid,postselectedtemplateid,prestatus,poststatus,seriesindex,bRedraw,bSavePoint)
        {
        	var pre  = this.cloneContents(preseries);
        	var post = this.cloneContents(postseries);
        	objform._addUndo(
        						function (redo, data)
        						{
        							if(redo)
        							{
        								data[0].recoverySeriesBarTemplate(data[1],data[3],data[5],data[7],data[8]);
        							}else{
        								data[0].recoverySeriesBarTemplate(data[1],data[2],data[4],data[6],data[8]);
        							}
        						}
        						,[this,objform, pre, post,preselectedtemplateid,postselectedtemplateid,prestatus,poststatus,seriesindex,bRedraw]
        						,bSavePoint
        						,true );
        };
        _ChartUtil.updateControlChart = function (objform,chart, id, updateContents, bUpdate)
        {
        	if (bUpdate)
        	{
        		if (!chart[id])
        		{
        			var contents = {};
        			contents[id] = this.cloneContents(updateContents);
        			chart.set_enableredraw(false);
        			this._changePrefixUrlContents(objform,contents);
        			chart.updateContents(contents);
        			//chart.draw();
        			chart.set_enableredraw(true);
        		}
        	}
        	else
        	{
        		if (chart[id])
        		{
        			chart.set_enableredraw(false);
        			chart[id].destroy();
        			//chart.draw();
        			chart.set_enableredraw(true);
        		}
        	}
        };

        _ChartUtil.updateSeriesContents = function (orgContents, id, updateContents)
        {
        	var idx = nexacro.CTSE.Chart.Util.indexOf(orgContents["seriesset"], id);

        	nexacro.CTSE.Chart.Util.updateContents(orgContents["seriesset"][idx], updateContents);
        };

        _ChartUtil.updateSeriesChart = function (chart, id, updateContents)
        {
            chart.set_enableredraw(false);
        	chart.setSeries(id, updateContents);
        	chart.set_enableredraw(true);
        	//chart.draw();
        };

        // Array id finder
        _ChartUtil.indexOf = function (array, id)
        {
        	var idx = -1;
        	if (array)
        	{
        		for (var i in array)
        		{
        			if (array[i].id == id)
        			{
        				idx = i;
        				break;
        			}
        		}
        	}

        	return idx;
        };

        // Define ChartMenu function
        var _ChartMenu = nexacro.CTSE.Chart.Menu;

        nexacro.CTSE.Chart.Menu.DEFAULT_HEIGHT = 18;

        _ChartMenu.expand = function(target)
        {
        	var height = nexacro.CTSE.Chart.Menu.DEFAULT_HEIGHT;

        	// form 계열이면 내부 컴포넌트의 총합 + @ 만큼 확장
        	var comps = target.form.components;
        	var comps_len = comps.length;
        	var total_h = 0;
        	for (var i = 0; i < comps_len; i++)
        	{
        		if (!comps[i].subcontrol || comps[i].subcontrol === "false")
        		{
        			total_h += comps[i].getOffsetHeight();
        		}
        	}

        	if (target.id == "Area_valueaxes" || target.id == "Div_seriesset")
        	{
        		if (total_h < (height * 3))
        		{
        			total_h = height * 3;
        		}
        	}
        	target.resize(target.getOffsetWidth(), total_h + height);
        };

        _ChartMenu.collapse = function(target)
        {
        	// 너비는 유지하고, 높이를 0으로 변경
        	target.resize(target.getOffsetWidth(), 0);
        };

        _ChartMenu.trackPopup = function(firedComp, target, poupobj)
        {
        	var comp_offsetleft = 0;
        	var comp_offsettop = 0;
        	var total_popup_width = 0;
        	var total_popup_height = 0;

        	var tmp = firedComp;
        	while(tmp.parent)
        	{
        		comp_offsetleft += tmp._adjust_left;
        		comp_offsettop += tmp._adjust_top;
        		tmp = tmp.parent;
        	}

        	var popup_form = poupobj.form;
        	var popup_comps = popup_form.components;

        	for (var i = 0; i < popup_comps.length; i++)
        	{
        		total_popup_height = Math.max(popup_comps[i].getOffsetBottom(), total_popup_height);
        		total_popup_width = Math.max(popup_comps[i].getOffsetRight(), total_popup_width);
        	}

        	var popup_left = target.getOffsetRight();
        	var popup_top = (comp_offsettop + (firedComp.getOffsetHeight() / 2)) - (total_popup_height / 2);
        	var popup_width = total_popup_width + 5;
        	var popup_height = total_popup_height + 8;

        	if ((popup_top + popup_height) > target.getOffsetBottom())
        	{
        		popup_top = target.getOffsetBottom() - popup_height;
        	}

        	poupobj.trackPopupByComponent(target, popup_left, popup_top, total_popup_width + 5, total_popup_height + 8);
        };

        _ChartMenu.rearrangeArea = function(target)
        {
        	var height = nexacro.CTSE.Chart.Menu.DEFAULT_HEIGHT;

        	var i, parent, comp;
        	var index = 0;
        	var comps = target.form.components;
        	var comps_len = comps.length;

        	for (i = 0; i < comps_len; i++)
        	{
        		comp = comps[i];
        		if (!comp.subcontrol || comp.subcontrol === "false")
        		{
        			comp.index = index;
        			comp.move(0, height * index, "100%", height);
        			index++;
        		}
        		else if (comp.is_rearrange === "false")
        		{
        			continue;
        		}
        		else
        		{
        			parent = comps[comp.parentname];
        			comp.index = -1;
        			comp.move(parent.id + ":-16", parent.id + ":-16", "14", "14");
        		}
        	}

        	if (target.id == "Area_valueaxes" || target.id == "Div_seriesset")
        	{
        		if (index < 3)
        		{
        			index = 3;
        		}
        	}

        	target.resize(target.width, (height * (index + 1)));
        };

        _ChartMenu.resetscrollArea = function(area)
        {
        	if (area.form)
        	{
        		area.resize(area.getOffsetWidth(), area.getOffsetHeight());
            area.form.resetScroll();
        	}
        	else
        	{
        		area.resetScroll();
        	}
        };

        // Define ContentsEditor Colorset
        var _ChartColorset = nexacro.CTSE.Chart.Colorset;
        _ChartColorset.Blue10 = [
        		"#1a22bf", "#1a3ebf", "#1a4cbf", "#1a59bf", "#1a6ebf", "#1a7fbe", "#1a92be", "#1aa7be", "#1ab2bd", "#1abd9c"
        ];

        _ChartColorset.Red10 = [
        		"#d21515", "#da2a11", "#de360f", "#e2420d", "#e84a07", "#eb5d08", "#ef6b05", "#f27803", "#f58702", "#f79a00"
        ];

        _ChartColorset.Green10 = [
        		"#1bc366", "#27ca0f", "#38cb0d", "#49cc0b", "#5bcd09", "#6dce08", "#80cf06", "#93d004", "#a7d102", "#bcd200"
        ];

        _ChartColorset.Purple10 = [
        		"#451abf", "#511abf", "#5d1abf", "#6a1abf", "#771abf", "#851abf", "#931abf", "#931abf", "#b11bbf", "#bf1b8e"
        ];

        _ChartColorset.Color10 = [
        		"#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
        ];

        _ChartColorset.Color12 = [
        		"#1abd9c", "#1a9dbc", "#1a70bd", "#1a1ebd", "#5508a3", "#c01aa1", "#d71e33", "#e4531f", "#e4881f", "#dacb00", "#bcd71e", "#43c41b"
        ];

        _ChartColorset.Color20 = [
        		"#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78",
        		"#2ca02c", "#98df8a", "#d62728", "#ff9896",
        		"#9467bd", "#c5b0d5", "#8c564b", "#c49c94",
        		"#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7",
        		"#bcbd22", "#dbdb8d", "#17becf", "#9edae5"
        ];

        _ChartColorset.Color20b = [
        		"#393b79", "#5254a3", "#6b6ecf", "#9c9ede",
        		"#637939", "#8ca252", "#b5cf6b", "#cedb9c",
        		"#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94",
        		"#843c39", "#ad494a", "#d6616b", "#e7969c",
        		"#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
        ];

        _ChartColorset.Color20c = [
        		"#3182bd", "#6baed6", "#9ecae1", "#c6dbef",
        		"#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2",
        		"#31a354", "#74c476", "#a1d99b", "#c7e9c0",
        		"#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb",
        		"#636363", "#969696", "#bdbdbd", "#d9d9d9"
        ];

        _ChartColorset.Mix10 = [
        		"#1abd9c", "#1a85be", "#1a67bf", "#1a4cbf", "#641ac0", "#9a1ac0", "#c2251b", "#c2541b", "#c2911d", "#21c34d"
        ];

        // Define BasicChart
        var _ChartBasic = nexacro.CTSE.Chart.BasicChart;

        _ChartBasic._DEFAULT_VALUEAXES = 1;
        _ChartBasic._DEFAULT_SERIESSET = 1;

        _ChartBasic.SINGLE_CONTROL_LIST = ["title", "legend", "hrangebar","vrangebar","crosshair","selection", "board", "tooltip", "categoryaxis"];
        _ChartBasic.ARRAY_CONTROL_LIST = ["valueaxes", "seriesset"];

        _ChartBasic.CHART_PROPERTY_LIST = ["bargrouping", "barsize", "boardspacing", "categorycolumn", "colorset",  "hrangebarspacing","vrangebarspacing", "legendspacing", "locale", "titlespacing", "rotateaxis"];

        _ChartBasic.NON_UPDATE_PROPERTY = {
        	"seriesset": ["selectcolumn", "valuecolumn"]
        };

        _ChartBasic.default_contents = {
        	"title": {
        		"id": "title",
        		"text": "Bar Chart",
        		"textfont": "20pt/normal \"맑은 고딕\"",
        		"padding": "0px 0px 5px"
        	},
        	"legend": {
        		"id": "legend",
        		"padding": "3px 10px 3px 10px",
        		"itemtextfont": "9pt \"맑은 고딕\"",
        		"itemtextcolor": "#4c4c4c"
        	},
        	"hrangebar": {
        		"id": "hrangebar",
        		"trackbarpadding": "1px",
        		"background": "#eaeaea",
        		"linestyle": "1px solid #d5d5d5",
        		"trackbarlinestyle": "0px none",
        		"trackbarfillstyle": "#c9c9c9",
        		"size": "12"
        	},
        	"vrangebar": {
        		"id": "vrangebar",
        		"trackbarpadding": "1px",
        		"background": "#eaeaea",
        		"linestyle": "1px solid #d5d5d5",
        		"trackbarlinestyle": "0px none",
        		"trackbarfillstyle": "#c9c9c9",
        		"size": "12"
        	},
        	"tooltip": {
        		"id": "tooltip",
        		"background": "#4b4b4b",
        		"linestyle": "0px none",
        		"textcolor": "#ffffff",
        		"textfont": "10pt/normal \"맑은 고딕\"",
        		"padding": "5px"
        	},
        	"board": {
        		"id": "board"
        	},
        	"crosshair": {
        		"id": "crosshair",
        		"type": "xy",
        		"xlinestyle": "1px solid #525252",
        		"ylinestyle": "1px solid #525252",
        		"tooltiptype": "xy"

        	},
        	"selection": {
        		"id": "selection",
        		"type": "xy",
        		"linestyle": "1px solid #525252",
        		"background": "#525252",
        		"opacity": "0.5"

        	},
        	"categoryaxis": {
        		"id": "categoryaxis",
        		"titletext": "categoryaxis",
        		"titletextcolor": "#4c4c4c",
        		"titletextfont": "bold 12pt \"맑은 고딕\"",
        		"labeltextcolor": "#6f6f6f",
        		"labeltextfont": "11pt \"맑은 고딕\"",
        		"axislinestyle": "1px solid #525252",
        		"ticklinestyle": "1px solid #525252",
        		"boardlinestyle": "1px solid #d0d0d0"
        	},
        	"valueaxes": [
        		{
        			"id": "valueaxis0",
        			"titletext": "valueaxis",
        			"boardlinevisible": true,
        			"boardlinestyle": "1px solid #d0d0d0",
        			"labeltextcolor": "#6f6f6f",
        			"labeltextfont": "10pt/normal \"맑은 고딕\"",
        			"titletextcolor": "#4c4c4c",
        			"titletextfont": "bold 12pt \"맑은 고딕\"",
        			"ticklinestyle": "1px solid #525252",
        			"axislinestyle": "1px solid #525252"
        		}
        	],
        	"seriesset": [
        		{
        			"id": "series0",
        			"titletext": "series",
        			"barvisible": true,
        			"barsize": "65",
        			"barlinestyle": "0px none",
        			"barfillstyle": "#5bbbff",
        			"linevisible": true,
        			"linestyle": "1px solid #0172c3",
        			"linefillstyle": "#1a22bf",
        			"pointvisible": true,
        			"pointsize": "15",
        			"pointlinestyle": "1px solid #0172c3",
        			"pointfillstyle": "#0172c3",
        			"lineareavisible": true,
        			"lineareafillstyle": "rgba(0,148,253,0.3)",
        			"itemtextvisible": true,
        			"itemtextcolor": "#003860",
        			"itemtextfont": "bold 12pt \"맑은 고딕\"",
        			"autogradation": "none",
        			"barradius": "0"
        		}
        	]
        };

        _ChartBasic.default_title = {
        	"id": "title",
        	"text": "Bar Chart",
        	"textfont": "20pt/normal \"맑은 고딕\"",
        	"padding": "0px 0px 5px",
        	"linestyle": "0px none"
        };

        _ChartBasic.default_legend = {
        	"id": "legend",
        	"padding": "3px 10px 3px 10px",
        	"itemtextfont": "9pt \"맑은 고딕\"",
        	"itemtextcolor": "#4c4c4c"
        };

        _ChartBasic.default_hrangebar = {
        	"id": "hrangebar",
        	"trackbarpadding": "1px",
        	"background": "#eaeaea",
        	"linestyle": "1px solid #d5d5d5",
        	"trackbarlinestyle": "0px none",
        	"trackbarfillstyle": "#c9c9c9",
        	"size": "12"
        };

        _ChartBasic.default_vrangebar = {
        	"id": "vrangebar",
        	"trackbarpadding": "1px",
        	"background": "#eaeaea",
        	"linestyle": "1px solid #d5d5d5",
        	"trackbarlinestyle": "0px none",
        	"trackbarfillstyle": "#c9c9c9",
        	"size": "12"
        };
        _ChartBasic.default_board = {
        	"id": "board"
        };
        _ChartBasic.default_crosshair = {
        	"id": "crosshair",
        	"type": "xy",
        	"xlinestyle": "1px solid #525252",
        	"ylinestyle": "1px solid #525252",
        	"tooltiptype": "xy"
        };
        _ChartBasic.default_selection = {

        	"id": "selection",
        	"type": "xy",
        	"linestyle": "1px solid #525252",
        	"background": "#525252",
        	"opacity": "0.5"


        };
        _ChartBasic.default_tooltip = {
        	"id": "tooltip",
        	"background": "#4b4b4b",
        	"linestyle": "0px none",
        	"textcolor": "white",
        	"textfont": "10pt/normal \"맑은 고딕\"",
        	"padding": "5px"
        };

        _ChartBasic.default_categoryaxis = {
        	"id": "categoryaxis",
        	"titletext": "categoryaxis",
        	"titletextcolor": "#4c4c4c",
        	"titletextfont": "bold 12pt \"맑은 고딕\"",
        	"labeltextcolor": "#6f6f6f",
        	"labeltextfont": "11pt \"맑은 고딕\"",
        	"axislinestyle": "1px solid #525252",
        	"ticklinestyle": "1px solid #525252",
        	"boardlinestyle": "1px solid #d0d0d0"
        };

        _ChartBasic.default_valueaxis = {
        	"id": "valueaxis",
        	"titletext": "valueaxis",
        	"boardlinevisible": true,
        	"boardlinestyle": "1px solid #d0d0d0",
        	"labeltextcolor": "#6f6f6f",
        	"labeltextfont": "10pt/normal \"맑은 고딕\"",
        	"titletextcolor": "#4c4c4c",
        	"titletextfont": "bold 12pt \"맑은 고딕\"",
        	"ticklinestyle": "1px solid #525252",
        	"axislinestyle": "1px solid #525252"
        };

        _ChartBasic.default_series = {
        };

        _ChartBasic.template_series_bar = {
        	"barvisible": false
        };

        _ChartBasic.template_series_line= {
        	"linevisible": false
        };

        _ChartBasic.template_series_point = {
        	"pointvisible": false
        };

        _ChartBasic.template_series_stack = {
        	"stacktype": "none"
        };

        _ChartBasic.template_series_linearea = {
        	"lineareavisible": true
        };


        // Define FloatChart
        var _ChartFloat = nexacro.CTSE.Chart.FloatChart;

        _ChartFloat._DEFAULT_VALUEAXES = 1;
        _ChartFloat._DEFAULT_SERIESSET = 1;

        _ChartFloat.SINGLE_CONTROL_LIST = ["title", "crosshair", "board", "tooltip", "categoryaxis"];
        _ChartFloat.ARRAY_CONTROL_LIST = ["valueaxes", "seriesset"];

        _ChartFloat.CHART_PROPERTY_LIST = ["barsize", "boardspacing", "categorycolumn", "colorset",  "locale", "titlespacing", "rotateaxis", "waterfall", "isdatetimevalue"];

        _ChartFloat.NON_UPDATE_PROPERTY = {
        	"seriesset": ["selectcolumn", "valuecolumn"]
        };

        _ChartFloat.default_contents = {
        	"title": {
        		"id": "title",
        		"text": "Float Chart",
        		"textfont": "20pt/normal \"맑은 고딕\"",
        		"padding": "0px 0px 5px"
        	},
        	"legend": {
        		"id": "legend",
        		"visible": "false",
        		"padding": "3px 10px 3px 10px",
        		"itemtextfont": "9pt \"맑은 고딕\"",
        		"itemtextcolor": "#4c4c4c"
        	},
        	"tooltip": {
        		"id": "tooltip",
        		"background": "#4b4b4b",
        		"linestyle": "0px none",
        		"textcolor": "#ffffff",
        		"textfont": "10pt/normal \"맑은 고딕\"",
        		"padding": "5px"
        	},
        	"board": {
        		"id": "board"
        	},
        	"crosshair": {
        		"id": "crosshair",
        		"type": "xy",
        		"xlinestyle": "1px solid #525252",
        		"ylinestyle": "1px solid #525252",
        		"tooltiptype": "xy"

        	},
        	"categoryaxis": {
        		"id": "categoryaxis",
        		"titletext": "categoryaxis",
        		"titletextcolor": "#4c4c4c",
        		"titletextfont": "bold 12pt \"맑은 고딕\"",
        		"labeltextcolor": "#6f6f6f",
        		"labeltextfont": "11pt \"맑은 고딕\"",
        		"axislinestyle": "1px solid #525252",
        		"ticklinestyle": "1px solid #525252",
        		"boardlinestyle": "1px solid #d0d0d0"
        	},
        	"valueaxes": [
        		{
        			"id": "valueaxis0",
        			"titletext": "valueaxis",
        			"boardlinevisible": true,
        			"boardlinestyle": "1px solid #d0d0d0",
        			"labeltextcolor": "#6f6f6f",
        			"labeltextfont": "10pt/normal \"맑은 고딕\"",
        			"titletextcolor": "#4c4c4c",
        			"titletextfont": "bold 12pt \"맑은 고딕\"",
        			"ticklinestyle": "1px solid #525252",
        			"axislinestyle": "1px solid #525252"
        		}
        	],
        	"seriesset": [
        		{
        			"id": "series0",
        			"titletext": "series",
        			"positivebarlinestyle" : "1px solid red",
        			"positivebarfillstyle" : "#eb495c",
        			"negativebarlinestyle" : "1px solid blue",
        			"negativebarfillstyle" : "#5058eb",
        			"barsize": "65",
        			"itemtextvisible": true,
        			"itemtextcolor": "#003860",
        			"itemtextfont": "bold 12pt \"맑은 고딕\"",
        			"autogradation": "none",
        			"barradius": "0"
        		}
        	]
        };

        _ChartFloat.default_title = {
        	"id": "title",
        	"text": "Float Chart",
        	"textfont": "20pt/normal \"맑은 고딕\"",
        	"padding": "0px 0px 5px",
        	"linestyle": "0px none"
        };

        _ChartFloat.default_board = {
        	"id": "board"
        };

        _ChartFloat.default_tooltip = {
        	"id": "tooltip",
        	"background": "#4b4b4b",
        	"linestyle": "0px none",
        	"textcolor": "white",
        	"textfont": "10pt/normal \"맑은 고딕\"",
        	"padding": "5px"
        };

        _ChartFloat.default_categoryaxis = {
        	"id": "categoryaxis",
        	"titletext": "categoryaxis",
        	"titletextcolor": "#4c4c4c",
        	"titletextfont": "bold 12pt \"맑은 고딕\"",
        	"labeltextcolor": "#6f6f6f",
        	"labeltextfont": "11pt \"맑은 고딕\"",
        	"axislinestyle": "1px solid #525252",
        	"ticklinestyle": "1px solid #525252",
        	"boardlinestyle": "1px solid #d0d0d0"
        };

        _ChartFloat.default_valueaxis = {
        	"id": "valueaxis",
        	"titletext": "valueaxis",
        	"boardlinevisible": true,
        	"boardlinestyle": "1px solid #d0d0d0",
        	"labeltextcolor": "#6f6f6f",
        	"labeltextfont": "10pt/normal \"맑은 고딕\"",
        	"titletextcolor": "#4c4c4c",
        	"titletextfont": "bold 12pt \"맑은 고딕\"",
        	"ticklinestyle": "1px solid #525252",
        	"axislinestyle": "1px solid #525252"
        };

        _ChartFloat.default_series = {
        };

        // Define BubbleChart
        var _ChartBubble = nexacro.CTSE.Chart.BubbleChart;

        _ChartBubble._DEFAULT_VALUEAXES = 2;
        _ChartBubble._DEFAULT_SERIESSET = 1;

        _ChartBubble.SINGLE_CONTROL_LIST = ["title", "legend", "hrangebar","vrangebar","crosshair","selection", "board", "tooltip"];
        _ChartBubble.ARRAY_CONTROL_LIST = ["valueaxes", "seriesset"];

        _ChartBubble.CHART_PROPERTY_LIST = ["boardspacing", "colorset",  "hrangebarspacing","vrangebarspacing", "legendspacing", "locale", "titlespacing"];

        _ChartBubble.NON_UPDATE_PROPERTY = {
        	"seriesset": ["selectcolumn", "valuecolumn", "value2column", "value3column"],
        	"valueaxes": ["tickmin", "tickmax", "tickinterval"]
        };

        _ChartBubble.default_contents = {
        	"title": {
        		"id": "title",
        		"text": "Bubble Chart",
        		"textfont": "20pt/normal \"맑은 고딕\"",
        		"padding": "0px 0px 5px"
        	},
        	"legend": {
        		"id": "legend",
        		"padding": "3px 10px 3px 10px",
        		"itemtextfont": "9pt \"맑은 고딕\"",
        		"itemtextcolor": "#4c4c4c"
        	},
        	"hrangebar": {
        		"id": "hrangebar",
        		"trackbarpadding": "1px",
        		"background": "#eaeaea",
        		"linestyle": "1px solid #d5d5d5",
        		"trackbarlinestyle": "0px none",
        		"trackbarfillstyle": "#c9c9c9",
        		"size": "12"
        	},
        	"vrangebar": {
        		"id": "vrangebar",
        		"trackbarpadding": "1px",
        		"background": "#eaeaea",
        		"linestyle": "1px solid #d5d5d5",
        		"trackbarlinestyle": "0px none",
        		"trackbarfillstyle": "#c9c9c9",
        		"size": "12"
        	},
        	"tooltip": {
        		"id": "tooltip",
        		"background": "#4b4b4b",
        		"linestyle": "0px none",
        		"textcolor": "#ffffff",
        		"textfont": "10pt/normal \"맑은 고딕\"",
        		"padding": "5px"
        	},
        	"board": {
        		"id": "board"
        	},
        	"crosshair": {
        		"id": "crosshair",
        		"type": "xy",
        		"xlinestyle": "1px solid #525252",
        		"ylinestyle": "1px solid #525252",
        		"tooltiptype": "xy"

        	},
        	"selection": {
        		"id": "selection",
        		"type": "xy",
        		"linestyle": "1px solid #525252",
        		"background": "#525252",
        		"opacity": "0.5"

        	},
        	"valueaxes": [
        		{
        			"id": "valueaxis0",
        			"titletext": "valueaxis0",
        			"boardlinevisible": true,
        			"boardlinestyle": "1px solid #d0d0d0",
        			"labeltextcolor": "#6f6f6f",
        			"labeltextfont": "10pt/normal \"맑은 고딕\"",
        			"titletextcolor": "#4c4c4c",
        			"titletextfont": "bold 12pt \"맑은 고딕\"",
        			"ticklinestyle": "1px solid #525252",
        			"axislinestyle": "1px solid #525252"
        		},
        		{
        			"id": "valueaxis1",
        			"titletext": "valueaxis1",
        			"boardlinevisible": true,
        			"boardlinestyle": "1px solid #d0d0d0",
        			"labeltextcolor": "#6f6f6f",
        			"labeltextfont": "10pt/normal \"맑은 고딕\"",
        			"titletextcolor": "#4c4c4c",
        			"titletextfont": "bold 12pt \"맑은 고딕\"",
        			"ticklinestyle": "1px solid #525252",
        			"axislinestyle": "1px solid #525252"
        		}
        	],
        	"seriesset": [
        		{
        			"id": "series0",
        			"titletext": "series",
        			"itemtextvisible": true,
        			"itemtextcolor": "#003860",
        			"itemtextfont": "bold 9pt \"맑은 고딕\"",
        			"linestyle": "0px none",
        			"fillstyle": "rgba(0,148,253,0.5)"
        		}
        	]
        }

        _ChartBubble.default_title = {
        	"id": "title",
        	"text": "Bubble Chart",
        	"textfont": "20pt/normal \"맑은 고딕\"",
        	"padding": "0px 0px 5px",
        	"linestyle": "0px none"
        };

        _ChartBubble.default_legend = {
        	"id": "legend",
        	"padding": "3px 10px 3px 10px",
        	"itemtextfont": "9pt \"맑은 고딕\"",
        	"itemtextcolor": "#4c4c4c"
        };

        _ChartBubble.default_hrangebar = {
        	"id": "hrangebar",
        	"trackbarpadding": "1px",
        	"background": "#eaeaea",
        	"linestyle": "1px solid #d5d5d5",
        	"trackbarlinestyle": "0px none",
        	"trackbarfillstyle": "#c9c9c9",
        	"size": "12"
        };

        _ChartBubble.default_vrangebar = {
        	"id": "vrangebar",
        	"trackbarpadding": "1px",
        	"background": "#eaeaea",
        	"linestyle": "1px solid #d5d5d5",
        	"trackbarlinestyle": "0px none",
        	"trackbarfillstyle": "#c9c9c9",
        	"size": "12"
        };

        _ChartBubble.default_crosshair = {
        	"id": "crosshair",
        	"type": "xy",
        	"xlinestyle": "1px solid #525252",
        	"ylinestyle": "1px solid #525252",
        	"tooltiptype": "xy"
        };
        _ChartBubble.default_selection = {
        	"id": "selection",
        		"type": "xy",
        		"linestyle": "1px solid #525252",
        		"background": "#525252",
        		"opacity": "0.5"
        };
        _ChartBubble.default_board = {
        	"id": "board"
        };

        _ChartBubble.default_tooltip = {
        	"id": "tooltip",
        	"background": "#4b4b4b",
        	"linestyle": "0px none",
        	"textcolor": "#ffffff",
        	"textfont": "10pt/normal \"맑은 고딕\"",
        	"padding": "5px"
        };

        _ChartBubble.default_valueaxis = {
        	"id": "valueaxis",
        	"titletext": "valueaxis",
        	"boardlinevisible": true,
        	"boardlinestyle": "1px solid #d0d0d0",
        	"labeltextcolor": "#6f6f6f",
        	"labeltextfont": "10pt/normal \"맑은 고딕\"",
        	"titletextcolor": "#4c4c4c",
        	"titletextfont": "bold 12pt \"맑은 고딕\"",
        	"ticklinestyle": "1px solid #525252",
        	"axislinestyle": "1px solid #525252"
        };

        _ChartBubble.default_series = {
        };

        // Define PieChart
        var _ChartPie = nexacro.CTSE.Chart.PieChart;

        _ChartPie._DEFAULT_SERIESSET = 1;

        _ChartPie.SINGLE_CONTROL_LIST = ["title", "legend", "board", "tooltip"];
        _ChartPie.ARRAY_CONTROL_LIST = ["seriesset"];

        _ChartPie.CHART_PROPERTY_LIST = ["boardspacing", "categorycolumn", "colorset",  "legendspacing", "locale", "titlespacing"];

        _ChartPie.NON_UPDATE_PROPERTY = {
        	"seriesset": ["selectcolumn", "valuecolumn"]
        };

        _ChartPie.default_contents = {
        	"title": {
        		"id": "title",
        		"text": "Pie Chart",
        		"textfont": "20pt/normal \"맑은 고딕\"",
        		"padding": "0px 0px 5px"
        	},
        	"legend": {
        		"id": "legend",
        		"padding": "3px 10px 3px 10px",
        		"itemtextfont": "9pt \"맑은 고딕\"",
        		"itemtextcolor": "#4c4c4c"
        	},
        	"tooltip": {
        		"id": "tooltip",
        		"background": "#4b4b4b",
        		"linestyle": "0px none",
        		"textcolor": "#ffffff",
        		"textfont": "10pt/normal \"맑은 고딕\"",
        		"padding": "5px"
        	},
        	"board": {
        		"id": "board"
        	},
        	"seriesset": [
        		{
        			"id": "series0",
        			"radius": 150,
        			"innerradius": 70,
        			"linestyle": "2px solid #ffffff",
        			"itemtextvisible": true,
        			"itemtextfont": "10pt/normal \"맑은 고딕\"",
        			"autogradation": "none",
        			"highlightfilltype": false
        		}
        	]
        }

        _ChartPie.default_title = {
        	"id": "title",
        	"text": "Pie Chart",
        	"textfont": "20pt/normal \"맑은 고딕\"",
        	"padding": "0px 0px 5px",
        	"linestyle": "0px none"
        };

        _ChartPie.default_legend = {
        	"id": "legend",
        	"padding": "3px 10px 3px 10px",
        	"itemtextfont": "9pt \"맑은 고딕\"",
        	"itemtextcolor": "#4c4c4c"
        };

        _ChartPie.default_board = {
        	"id": "board"
        };

        _ChartPie.default_tooltip = {
        	"id": "tooltip",
        	"background": "#4b4b4b",
        	"linestyle": "0px none",
        	"textcolor": "#ffffff",
        	"textfont": "10pt/normal \"맑은 고딕\"",
        	"padding": "5px"
        };

        _ChartPie.default_series = {
        	"id": "series"
        };

        _ChartPie.template_series_pie = {
        	"innerradius": 0
        };

        _ChartPie.template_series_donut = {
        	"innerradius": 70
        };

        // Define RadarChart
        var _ChartRadar = nexacro.CTSE.Chart.RadarChart;


        _ChartRadar._DEFAULT_SERIESSET = 1;
        _ChartRadar._DEFAULT_VALUEAXES = 1;
        _ChartRadar.SINGLE_CONTROL_LIST = ["title", "legend", "board", "tooltip", "categoryaxis"];
        _ChartRadar.ARRAY_CONTROL_LIST = ["valueaxes","seriesset"];

        _ChartRadar.CHART_PROPERTY_LIST = ["radius","radartype", "boardspacing", "categorycolumn", "colorset", "legendspacing", "locale", "titlespacing"];

        _ChartBasic.NON_UPDATE_PROPERTY = {
        	"seriesset": ["selectcolumn", "valuecolumn"]
        };

        _ChartRadar.default_contents = {
        	"title": {
        		"id": "title",
        		"text": "Radar Chart",
        		"textfont": "20pt/normal \"맑은 고딕\"",
        		"padding": "0px 0px 5px"
        	},
        	"legend": {
        		"id": "legend",
        		"padding": "3px 10px 3px 10px",
        		"itemtextfont": "9pt \"맑은 고딕\"",
        		"itemtextcolor": "#4c4c4c"
        	},
        	"tooltip": {
        		"id": "tooltip",
        		"background": "#4b4b4b",
        		"linestyle": "0px none",
        		"textcolor": "#ffffff",
        		"textfont": "10pt/normal \"맑은 고딕\"",
        		"padding": "5px"
        	},
        	"board": {
        		"id": "board"
        	},
        	"categoryaxis": {
        		"id": "categoryaxis",
        		"labeltextcolor": "#6f6f6f",
        		"labeltextfont": "10pt \"맑은 고딕\"",
        		"axislinestyle": "1px solid #525252",
            "boardlinevisible": true,
        	  "boardlinestyle": "1px solid #525252"
        	},
        	"valueaxes": [
        		{
        			"id": "valueaxis0",
        			"labeltextcolor": "#6f6f6f",
        			"labeltextfont": "10pt/normal \"맑은 고딕\"",
        			"axislinestyle": "1px solid #525252",
              "boardlinevisible": true,
        	    "boardlinestyle": "1px solid #525252"
        		}
        	],
        	"seriesset": [
        		{
        			"id": "series0",
        			"titletext": "series",
        			"linevisible": true,
        			"linestyle": "1px solid #0172c3",
        			"linefillstyle": "#1a22bf",
        			"pointvisible": true,
        			"pointsize": "10",
        			"pointlinestyle": "1px solid #0172c3",
        			"pointfillstyle": "#0172c3",
        			"lineareavisible": true,
        			"lineareafillstyle": "rgba(0,148,253,0.3)",
        			"itemtextvisible": true,
        			"itemtextcolor": "#003860",
        			"itemtextfont": "bold 6pt \"맑은 고딕\""
        		}
        	]
        };

        _ChartRadar.default_title = {
        	"id": "title",
        	"text": "Radar Chart",
        	"textfont": "20pt/normal \"맑은 고딕\"",
        	"padding": "0px 0px 5px",
        	"linestyle": "0px none"
        };

        _ChartRadar.default_legend = {
        	"id": "legend",
        	"padding": "3px 10px 3px 10px",
        	"itemtextfont": "9pt \"맑은 고딕\"",
        	"itemtextcolor": "#4c4c4c"
        };

        _ChartRadar.default_board = {
        	"id": "board"
        };

        _ChartRadar.default_tooltip = {
        	"id": "tooltip",
        	"background": "#4b4b4b",
        	"linestyle": "0px none",
        	"textcolor": "white",
        	"textfont": "10pt/normal \"맑은 고딕\"",
        	"padding": "5px"
        };

        _ChartRadar.default_categoryaxis = {
        	"id": "categoryaxis",
        	"labeltextcolor": "#6f6f6f",
        	"labeltextfont": "10pt \"맑은 고딕\"",
        	"axislinestyle": "1px solid #525252",
          "boardlinevisible": true,
        	"boardlinestyle": "1px solid #525252"
        };

        _ChartRadar.default_valueaxes = {
        	"id": "valueaxis",
          "labeltextcolor": "#6f6f6f",
        	"labeltextfont": "10pt/normal \"맑은 고딕\"",
        	"axislinestyle": "1px solid #525252",
          "boardlinevisible": true,
        	"boardlinestyle": "1px solid #525252"
        };

        _ChartRadar.default_series = {
        };

        _ChartRadar.template_series_line= {
        	"linevisible": false
        };

        _ChartRadar.template_series_point = {
        	"pointvisible": false
        };
        _ChartRadar.template_series_linearea = {
        	"lineareavisible": true
        };

        // Define RoseChart
        var _ChartRose = nexacro.CTSE.Chart.RoseChart;


        _ChartRose._DEFAULT_SERIESSET = 1;
        _ChartRose._DEFAULT_VALUEAXES = 1;
        _ChartRose.SINGLE_CONTROL_LIST = ["title", "legend", "board", "tooltip", "categoryaxis"];
        _ChartRose.ARRAY_CONTROL_LIST = ["valueaxes","seriesset"];

        _ChartRose.CHART_PROPERTY_LIST = ["radius","Rosetype", "boardspacing", "categorycolumn", "colorset", "legendspacing", "locale", "titlespacing"];

        _ChartBasic.NON_UPDATE_PROPERTY = {
        	"seriesset": ["selectcolumn", "valuecolumn"]
        };

        _ChartRose.default_contents = {
        	"title": {
        		"id": "title",
        		"text": "Rose Chart",
        		"textfont": "20pt/normal \"맑은 고딕\"",
        		"padding": "0px 0px 5px"
        	},
        	"legend": {
        		"id": "legend",
        		"padding": "3px 10px 3px 10px",
        		"itemtextfont": "9pt \"맑은 고딕\"",
        		"itemtextcolor": "#4c4c4c"
        	},
        	"tooltip": {
        		"id": "tooltip",
        		"background": "#4b4b4b",
        		"linestyle": "0px none",
        		"textcolor": "#ffffff",
        		"textfont": "10pt/normal \"맑은 고딕\"",
        		"padding": "5px"
        	},
        	"board": {
        		"id": "board"
        	},
        	"categoryaxis": {
        		"id": "categoryaxis",
        		"labeltextcolor": "#6f6f6f",
        		"labeltextfont": "10pt \"맑은 고딕\"",
        		"axislinestyle": "1px solid #525252",
        		"boardlinevisible": true,
        		"boardlinestyle": "1px solid #525252"
        	},
        	"valueaxes": [
        		{
        		"id": "valueaxis0",
        		"labeltextcolor": "#6f6f6f",
        		"labeltextfont": "10pt/normal \"맑은 고딕\"",
        		"axislinestyle": "1px solid #525252",
        		"boardlinevisible": true,
        	    "boardlinestyle": "1px solid #525252"
        		}
        	],
        	"seriesset": [
        		{
        			"id": "series0",
        			"titletext": "series",
        			"linevisible": true,
        			"linestyle": "1px solid #0172c3",
        			"fillstyle": "#1a22bf",
        			"itemtextvisible": true,
        			"itemtextcolor": "#003860",
        			"itemtextfont": "bold 6pt \"맑은 고딕\""
        		}
        	]
        };

        _ChartRose.default_title = {
        	"id": "title",
        	"text": "Rose Chart",
        	"textfont": "20pt/normal \"맑은 고딕\"",
        	"padding": "0px 0px 5px",
        	"linestyle": "0px none"
        };

        _ChartRose.default_legend = {
        	"id": "legend",
        	"padding": "3px 10px 3px 10px",
        	"itemtextfont": "9pt \"맑은 고딕\"",
        	"itemtextcolor": "#4c4c4c"
        };

        _ChartRose.default_board = {
        	"id": "board"
        };

        _ChartRose.default_tooltip = {
        	"id": "tooltip",
        	"background": "#4b4b4b",
        	"linestyle": "0px none",
        	"textcolor": "white",
        	"textfont": "10pt/normal \"맑은 고딕\"",
        	"padding": "5px"
        };

        _ChartRose.default_categoryaxis = {
        	"id": "categoryaxis",
        	"labeltextcolor": "#6f6f6f",
        	"labeltextfont": "10pt \"맑은 고딕\"",
        	"axislinestyle": "1px solid #525252",
          "boardlinevisible": true,
        	"boardlinestyle": "1px solid #525252"
        };

        _ChartRose.default_valueaxes = {
        	"id": "valueaxis",
          "labeltextcolor": "#6f6f6f",
        	"labeltextfont": "10pt/normal \"맑은 고딕\"",
        	"axislinestyle": "1px solid #525252",
          "boardlinevisible": true,
        	"boardlinestyle": "1px solid #525252"
        };

        _ChartRose.default_series = {
        };

        _ChartRose.template_series_line= {
        	"linevisible": false
        };

        _ChartRose.template_series_point = {
        	"pointvisible": false
        };
        _ChartRose.template_series_linearea = {
        	"lineareavisible": true
        };


        // Define GaugeChart
        var _ChartGauge = nexacro.CTSE.Chart.GaugeChart;


        _ChartGauge._DEFAULT_SERIESSET = 1;
        _ChartGauge._DEFAULT_VALUEAXES = 1;
        _ChartGauge.SINGLE_CONTROL_LIST = ["title", "legend", "board", "tooltip", "indicator"];
        _ChartGauge.ARRAY_CONTROL_LIST = ["valueaxes","seriesset"];

        _ChartGauge.CHART_PROPERTY_LIST = ["gaugetype", "boardspacing", "categorycolumn", "colorset", "legendspacing", "locale", "titlespacing"];

        _ChartBasic.NON_UPDATE_PROPERTY = {
        	"seriesset": ["selectcolumn", "valuecolumn"]
        };

        _ChartGauge.default_contents = {
        	"title": {
        		"id": "title",
        		"text": "Gauge Chart",
        		"textfont": "20pt/normal \"맑은 고딕\"",
        		"padding": "0px 0px 5px"
        	},
        	"legend": {
        		"id": "legend",
        		"padding": "3px 10px 3px 10px",
        		"itemtextfont": "9pt \"맑은 고딕\"",
        		"itemtextcolor": "#4c4c4c"
        	},
        	"tooltip": {
        		"id": "tooltip",
        		"background": "#4b4b4b",
        		"linestyle": "0px none",
        		"textcolor": "#ffffff",
        		"textfont": "10pt/normal \"맑은 고딕\"",
        		"padding": "5px"
        	},
        	"board": {
        		"id": "board"
        	},
        	"indicator": {
        		"id": "indicator",
        		"visible": "true",
        		"image": "",
        		"size": "",
        		"indent": "",
        		"fillstyle": "#4b4b4b",
        		"linestyle": "0px none",
        		"opacity": "1",
        		"centerpinradius": "0",
        		"indentouter": "",
        		"linestyle": true
        	},
        	"valueaxes": [
        		{
        			"id": "valueaxis0",
        			"labeltextcolor": "#6f6f6f",
        			"labeltextfont": "10pt/normal \"맑은 고딕\"",
        			"axislinestyle": "1px solid #525252",
        			"ticklinestyle": "1px solid #525252"
            }
        	],
        	"seriesset": [
        		{
        			"id": "series0",
        			"titletext": "series",
        			"linestyle": "1px solid #0172c3",
        			"fillstyle": "rgba(0,148,253,0.3)",
        			"itemtextvisible": true,
        			"itemtextcolor": "#003860",
        			"itemtextfont": "bold 9pt \"맑은 고딕\""
        		}
        	]
        };

        _ChartGauge.default_title = {
        	"id": "title",
        	"text": "Gauge Chart",
        	"textfont": "20pt/normal \"맑은 고딕\"",
        	"padding": "0px 0px 5px",
        	"linestyle": "0px none"
        };

        _ChartGauge.default_legend = {
        	"id": "legend",
        	"padding": "3px 10px 3px 10px",
        	"itemtextfont": "9pt \"맑은 고딕\"",
        	"itemtextcolor": "#4c4c4c"
        };

        _ChartGauge.default_board = {
        	"id": "board"
        };

        _ChartGauge.default_tooltip = {
        	"id": "tooltip",
        	"background": "#4b4b4b",
        	"linestyle": "0px none",
        	"textcolor": "white",
        	"textfont": "10pt/normal \"맑은 고딕\"",
        	"padding": "5px"
        };

        _ChartGauge.default_indicator = {
        	"id": "indicator",
        	"visible": "true",
        	"indicatorimage": "",
        	"indicatorsize": "",
        	"indicatorindent": "",
        	"indicatorfillstyle": "#4b4b4b",
        	"indicatorlinestyle": "0px none",
        	"indicatoropacity": "1"
        };

        _ChartGauge.default_valueaxes = {
        	"id": "valueaxis0",
        	"labeltextcolor": "#6f6f6f",
        	"labeltextfont": "10pt/normal \"맑은 고딕\"",
        	"axislinestyle": "1px solid #525252",
        	"ticklinestyle": "1px solid #525252"
        };

        _ChartGauge.default_series = {
        };


        // Define PyramidChart
        var _ChartPyramid = nexacro.CTSE.Chart.PyramidChart;

        _ChartPyramid._DEFAULT_SERIESSET = 1;

        _ChartPyramid.SINGLE_CONTROL_LIST = ["title", "board", "tooltip"];
        _ChartPyramid.ARRAY_CONTROL_LIST = ["seriesset"];

        _ChartPyramid.CHART_PROPERTY_LIST = ["boardspacing", "categorycolumn", "colorset",  "titlespacing", "graphtype"];

        _ChartPyramid.NON_UPDATE_PROPERTY = {
        	"seriesset": ["valuecolumn"]
        };

        _ChartPyramid.default_contents = {
        	"title": {
        		"id": "title",
        		"text": "Pyramid Chart",
        		"textfont": "20pt/normal \"맑은 고딕\"",
        		"padding": "0px 0px 5px"
        	},
        	"legend": {
        		"id": "legend",
        		"padding": "3px 10px 3px 10px",
        		"itemtextfont": "9pt \"맑은 고딕\"",
        		"visible": "false",
        		"itemtextcolor": "#4c4c4c"
        	},
        	"tooltip": {
        		"id": "tooltip",
        		"background": "#4b4b4b",
        		"linestyle": "0px none",
        		"textcolor": "#ffffff",
        		"textfont": "10pt/normal \"맑은 고딕\"",
        		"padding": "5px"
        	},
        	"board": {
        		"id": "board"
        	},
        	"seriesset": [
        		{
        			"id": "series0",
        			"marginleftright": 10,
        			"margintopdown": 10,
        			"graphhalign": "center",
        			"graphratio": 60,
        			"linestyle": "2px solid #ffffff",
        			"itemtextvisible": true,
        			"itemtextfont": "10pt/normal \"맑은 고딕\"",
        			"autogradation": "none",
        			"highlightfilltype": false
        		}
        	]
        }

        _ChartPyramid.default_title = {
        	"id": "title",
        	"text": "Pyramid Chart",
        	"textfont": "20pt/normal \"맑은 고딕\"",
        	"padding": "0px 0px 5px",
        	"linestyle": "0px none"
        };

        _ChartPyramid.default_board = {
        	"id": "board"
        };

        _ChartPyramid.default_tooltip = {
        	"id": "tooltip",
        	"background": "#4b4b4b",
        	"linestyle": "0px none",
        	"textcolor": "#ffffff",
        	"textfont": "10pt/normal \"맑은 고딕\"",
        	"padding": "5px"
        };

        _ChartPyramid.default_series = {
        	"id": "series"
        };

        _ChartPyramid.template_series_Pyramid = {
        	"graphratio": 80
        };




        });
    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
