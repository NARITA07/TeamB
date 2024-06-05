//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2017 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacrochart-public-license-readme-1.0.html
//
//==============================================================================
if (!nexacro.RoseChart)
{
    //==============================================================================
    // nexacro.RoseChartEventInfo
    //==============================================================================


    //==============================================================================
    // nexacro.RoseChart
    //==============================================================================
    nexacro.RoseChart = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
    {
        nexacro.RadarChart.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this.categorycolumn = new nexacro.BindableValue("");
		this._visibleSeriesset = [];
		this._radarangleinfo = [];  
		this.valueaxes = []; 
		
    };

    var _pRoseChart = nexacro._createPrototype(nexacro.RadarChart, nexacro.RoseChart);
    nexacro.RoseChart.prototype = _pRoseChart;
    _pRoseChart._type_name = "RoseChart";

    /* control */
	
	
   
    /* default properties */
	_pRoseChart.categoryaxis = null; // readonly
	//_pRoseChart.valueaxis = null;    // readonly->inner
	_pRoseChart.valueaxes = null;    // readonly
	_pRoseChart.radius = undefined;
	_pRoseChart.rosesize = 80;
	_pRoseChart.radartype = "circle";
    /* internal variable */
	
    _pRoseChart._boardWidth = 0;
    _pRoseChart._boardHeight = 0;
    _pRoseChart._centerLeft = 0;
    _pRoseChart._centerTop = 0;

	_pRoseChart._drawing = false;
	_pRoseChart._isnegativedata = false;
    _pRoseChart._invalidcategorycolumn = false;
    _pRoseChart._startangle = null;
	_pRoseChart._endangle = null;
    
	
    /* status */

    /* event list */

    //===============================================================
    // nexacro.RoseChart : Create & Update
    //===============================================================
	_pRoseChart.on_create_contents = function ()
	{
		var control = this.getElement();
		if (control)
		{
			nexacro._ChartBase.prototype.on_create_contents.call(this);
		}
	};
    _pRoseChart.on_destroy_contents = function ()
    {
		this.rosesize = null;
		
		return nexacro.RadarChart.prototype.on_destroy_contents.call(this);

    };

    //===============================================================
    // nexacro.RoseChart : Properties
    //===============================================================
	_pRoseChart.set_rosesize = function (val)
    {
        var lVal = null;
        if (val !== undefined && val !== null && val !== "")
        {
            if (nexacro._isNumber(val))
            {
                lVal = val;
            }
            else
            {
                if (val.length > 0)
                {
                    lVal = +val;
                    if (isNaN(lVal))
                    {
                        return;
                    }
                }
            }
        }

        if (lVal < 0 || lVal > 100)
        {
            return;
        }

        if (this.rosesize != val)
        {
            
            this.rosesize = val;
            this.on_apply_rosesize(lVal);
        }

        this._draw();
    };
     
    _pRoseChart.on_apply_rosesize = function (rosesize)
    {
        this._changedData = true;
    };	
	
	_pRoseChart.on_apply_categorycolumn = function ()
    {
        this.on_apply_binddataset();
    };

	//===============================================================
	// nexacro.RoseChart : Methods
	//===============================================================
	_pRoseChart._appendValueaxis = function (contents)
    {
        var axis,
            id,
            axisContents = {},
            valueaxesLeng = -1;
            //charttype = this._type_name,
            //seriesset = this.seriesset,
            //s1, s2,
            //linevisible1 = false,
            //location,
            //linevisible2 = false;

		if(this.valueaxes.length > 0)return null;
        if (!this._isApplyContents && nexacro._ChartGraphicsLib.isEmpty(contents))
        {
            return valueaxesLeng;
        }

        if (typeof (contents) == "object")
        {
            axisContents = contents;
            id = contents.id;
        }

        if (!id)
        {
            valueaxesLeng = this.valueaxes.length + 1;
            id = "Valueaxis" + valueaxesLeng;
            contents.id = id;
        }

        if (!this._isApplyContents)
        {
            this.contents.valueaxes.push(axisContents);
        }

        axis = new nexacro.ChartRoseValueAxisControl(id, this, this._graphicsControl);
		axis._type_name = "ChartRoseValueAxisControl";
        axis._type = "valueAxis";

		this._drawing = true;
		this._setProperties(axisContents, axis);
		this._drawing = false;
		this.valueaxes.push(axis);
        valueaxesLeng = this.valueaxes.length - 1;

        return axis;

    };

    _pRoseChart._createSeries = function (contents, id)
    {
        var series = new nexacro.ChartRoseSeriesControl(id, this, this._graphicsControl);
        return series;
    };
	
    _pRoseChart._getHighlightVisible = function ()
    {
        var seriesset = this.seriesset;
        if (seriesset)
        {
            var length = seriesset.length,
				highlightvisible = false;

            for (var i = 0; i < length; i++)
            {
                var s = seriesset[i];
                if (s)
                {
                    //highlightareavisible?
                    if (s.highlightvisible)
                    {
                        highlightvisible = true;
                        break;
                    }
                }
            }
            return highlightvisible;
        }
    };
	
 
	_pRoseChart._getVisibleSeries = function ()
    {
        var length = this.seriesset.length,
			pointvisible = false,
			linevisible = false,
			visibleSeriesset = [];

        for (var i = 0; i < length; i++)
        {
            var series = this.seriesset[i];
            if (series)
            {
                var data = series._data;
                if (data)
                {
                    if (data.length <= 2)
                        continue;
                }

               
                linevisible = series.visible;
                if (linevisible)
                {
                    visibleSeriesset.push(series);
                }
            }
        }
		
        this._visibleSeriesset = visibleSeriesset;
        
    };

    // datapoint format 정보 설정
    _pRoseChart._setSeriesDatapointsFormat = function (series)
    {
        var format = series._datapoints.format;
		//categoryaxis = this.categoryaxis,
		//valueaxis    = this.valueaxes[0];

        
        if (!format)
        {
            format = [];
            format.push(
			{
			    x: true,
			    category: true,
			    required: true
			});
            format.push(
			{
			    y: true,
			    category: false,
			    required: true,
				defaultvalue: null
			});
             
            if (series.visible)
            {
				// angle 요소 포함 
				format.push(
				{
				    angle: true,
				    category: false,
				    required: true
				   
				});
			}

            series._datapoints.format = format;
        }
    };

	
    // datamin, datamax 설정
    _pRoseChart._setSeriesDataMinMax = function (series)
    {
        var datapoints = series._datapoints,
			
			xmin = Number.POSITIVE_INFINITY,
			ymin = Number.POSITIVE_INFINITY,
			xmax = Number.NEGATIVE_INFINITY,
			ymax = Number.NEGATIVE_INFINITY,
			points,
			pointsize,
			val, f,
			categoryaxis = this.categoryaxis,
		    valueaxis    = this.valueaxes[0],
			format;

        points = datapoints.points;
        pointsize = datapoints.pointsize;
        format = datapoints.format;
		var series_ymax = (valueaxis._datamax==Number.NEGATIVE_INFINITY?0:valueaxis._datamax);
		var cum_val = 0;
        for (var i = 0; i < points.length; i += pointsize)
        {
            if (points[i] == null)
            {
                continue;
            }

            for (var j = 0; j < pointsize; j++)
            {
                val = points[i + j];
				cum_val = val + series_ymax;
				
                f = format[j];
                if (!f || val == Number.MAX_VALUE || val == -Number.MAX_VALUE)
                {
                    continue;
                }

                if (f.x)
                {
                    if (val < xmin)
                    {
                        xmin = val;
                    }
                    if (val > xmax)
                    {
                        xmax = val;
                    }
                }
                if (f.y)
                {
                    if (val < ymin)
                    {
                        ymin = val;
                    }
                    if (cum_val > ymax)
                    {
                        ymax = cum_val;
                    }
                }
            }
        }
		if(categoryaxis._tickmin /*&&xaxis._tickmin < xmin*/)
		{
			xmin = categoryaxis._tickmin;
		}
		if(categoryaxis._tickmax /*&&xaxis._tickmax > xmax*/)
		{
			xmax = categoryaxis._tickmax;
		}
		if(valueaxis._tickmin /*&&yaxis._tickmin < ymin*/)
		{
			ymin = valueaxis._tickmin;
		}
		if(valueaxis._tickmax /*&& yaxis._tickmax > ymax*/)
		{
			ymax = valueaxis._tickmax;
		}
        
		// datamin/max, rulermain/max 설정
        if (categoryaxis && categoryaxis._updateMinMax)
        {
            categoryaxis._updateMinMax(xmin, xmax);
        }
        if (valueaxis && valueaxis._updateMinMax)
        {
            valueaxis._updateMinMax(ymin, ymax);
        }
    };


	_pRoseChart._createCategoryaxis = function (o, id)
    {
        if (this.categoryaxis)
            return false;

        //var series = this.seriesset,
		var	axis;
        if (!id)
        {
            id = "Categoryaxis";
        }

        axis = new nexacro.ChartRoseCategoryAxisControl(id, this, this._graphicsControl);
        axis._type_name = "ChartRoseCategoryAxisControl";
        axis._type = "categoryAxis";

        
        this.categoryaxis = axis;
        
		return axis;
    };

    _pRoseChart._createValueaxes = function (o, id)
    {
        //var seriesset = this.seriesset;
        if(this.valueaxes.length > 0) return null;
        var valueaxis;
         if (!id)
        {
            id = "Valueaxis" + this.valueaxes.length;
        }

		valueaxis = new nexacro.ChartRoseValueAxisControl(id, this, this._graphicsControl);
		valueaxis._type_name = "ChartRoseValueAxisControl";
        valueaxis._type = "valueAxis";

        this.valueaxes.push(valueaxis);

        return valueaxis;
    };

    //===============================================================
    // nexacro.RoseChart : Util Function
    //===============================================================
    _pRoseChart._setDataset = function ()
    {
        nexacro._ChartBase.prototype._setDataset.call(this);

        // 각 ChartControl._setDataset( ) 호출 하는 구조로...

    };


}

// AxisControl

// ChartRoseCategoryAxisControl
if (!nexacro.ChartRoseCategoryAxisControl)
{
    //==============================================================================
    // nexacro.ChartRoseCategoryAxisControl
    //==============================================================================
    nexacro.ChartRoseCategoryAxisControl = function (id, parent, graphicsControl)
    {
        nexacro.ChartRadarCategoryAxisControl.call(this, id, parent, graphicsControl);

		this._direction = "x";
    };

    var _pChartRoseCategoryAxisControl = nexacro._createPrototype(nexacro.ChartRadarCategoryAxisControl, nexacro.ChartRoseCategoryAxisControl);
    nexacro.ChartRoseCategoryAxisControl.prototype = _pChartRoseCategoryAxisControl;
    _pChartRoseCategoryAxisControl._type_name = "ChartRoseCategoryAxisControl";

	_pChartRoseCategoryAxisControl.boardlinevisible = true;
	
	_pChartRoseCategoryAxisControl.destroy = function ()
    {
        this._destroy(true);
    };

    _pChartRoseCategoryAxisControl._destroy = function (parent_clear)
    {
		
        if (parent_clear)
        {
            // category, valueaxis 구분하여 삭제 - 하나씩 삭제 확인
            //var axisId = this.id;
            if (this.parent)
            {
				this.parent.categoryaxis = null;
                this.parent._deleteContentsProp("categoryaxis");
			}
        }

        delete this.locale;
        delete this.labeltype;
        delete this.labelmask;
        delete this._axisLine;
        delete this._axisRect;
	
        if (this._title)
        {
            this._title.destroy();
            delete this._title;
            this._title = null;
        }
		
        if (this._ticks)
        {
            for (var i = 0; i < this._ticks.length; i++)
            {
                var tick = this._ticks[i];
                var ticktext = tick.labelElement;
                if (ticktext)
                {
                    ticktext.destroy();
                    ticktext = null;
                }

                var tickline = tick.lineElement;
                if (tickline)
                {
                    tickline.destroy();
                    tickline = null;
                }

                var tickboardline = tick.boardlineElement;
                if (tickboardline)
                {
                    tickboardline.destroy();
                    tickboardline = null;
                }
                tick = null;
            }
        }
		
        this.id = null;
        this.locale = null;
        this.opposite = null;
        this.datetickunit = null;
        this.tickinterval = null;
        this.ticks = null;
        this.autotickscale = null;
        this.tickstartgap = null;
        this.tickendgap = null;
        this.tickmin = null;
        this.tickmax = null;
        this.gap = null;
        this.boardlinevisible = null;
        this.boardlinestyle = null;
        this.boardlineopacity = null;
        this.axislinestyle = null;
        this.axislineopacity = null;
        this.ticksize = null;
        this.ticklinestyle = null;
        this.ticklineopacity = null;
        this.labeltype = null;
        this.labelmask = null;
        this.labeltextfont = null;
        this.labeltextcolor = null;
        this.labelrotate = null;
        this.labeltextwidth = null;
        this.labelgap = null;
        this.titletext = null;
        this.titletextfont = null;
        this.titletextcolor = null;
        this.titlegap = null;
        this.titletextalign = null;
        this.titlerotate = null;
        this.id = null;

        this._axisRect = null;
        this._type = null;
        this._used = null;
        this._direction = null;
        this._location = null;
        this._datamin = null;
        this._datamax = null;
        this._min = null;
        this._max = null;
        this._tickstartgap = null;
        this._tickendgap = null;
        this._delta = null;
        this._tickinterval = null;
        this._datetickunit = null;
		this._tickmax = null;
		this._tickmin = null;
        this._ticks = null;
        this._labeltextfont = null;
        this._labelWidth = null;
        this._labelHeight = null;
        this._tickendspace = null;
        this._labeltextcolor = null;
        this._title = null;
        this._titleHeight = null;
        this._titleWidth = null;
        this._titletextfont = null;
        this._titletextcolor = null;
        this._halign = null;
        this._valign = null;
        this._boardlinestyle = null;
        this._axislinestyle = null;
        this._axisLine = null;
        this._axislineopacity = null;
        this._ticklinestyle = null;
        this._ticklineopacity = null;
        this._scale = null;
        this._categories = null;
        this._titlerotate = null;
        this._changedTicks = null;
        this._changedTickStyle = null;
        this._changedBoardLineStyle = null;
        this._changedTickLabelStyle = null;
        this._changedTickLabelRotate = null;
        this._rearrange = null;

        this._tickLabelTextAlign = null;
        this._tickLabelVerticalAlign = null;
        this._selectionMin = null;
        this._selectionMax = null;
        this._isTimeAxis = null;

        this._timeUnitSize = null;
        this._specMonths = null;
        this._axislineindex = null;
		
        if (this._boardLineGroup)
        {
            this._boardLineGroup.destroy();
            this._boardLineGroup = null;
        }

        if (this._tickGroup)
        {
            this._tickGroup.destroy();
            this._tickGroup = null;
        }

        if (this._labelGroup)
        {
            this._labelGroup.destroy();
            this._labelGroup = null;
        }
	
        if (this._group)
        {
			
			var itemID = this._group.id;
		
			var item = this._graphicsControl.getObjectByID(itemID);
			if (item)
			{
				this._graphicsControl.removeChild(item);
			}
            this._group.destroy();
            this._group = null;
        }
		
        if (this.parent)
        {
			this.parent._rearrange = true;
            this.parent._recreate = true;
            this.parent = null;
        }
        nexacro.Object.prototype.destroy.call(this);
        return true;
    };
	//===============================================================
    // nexacro._pChartRoseCategoryAxisControl : Logical part
    //===============================================================
	// axis line 생성

	_pChartRoseCategoryAxisControl._getTickLabelAlign = function (labelrotate,labelangle)
    {
		// 자동 처리 
		return;
       
    };
	_pChartRoseCategoryAxisControl._arrangeTickGroup = function (width, height)
    {
        // line 처리 
        
		//var x = 0, y = 0,
		var chart = this.parent,
        ticks = this._ticks,
		//tick,
		value,
		//index,
		tickmin = this._min,
        tickmax = this._max,
		axisLine,
		centerX = chart._centerLeft,
	    centerY = chart._centerTop,
		categoryaxis = this,
		categoryaxislinewidth = 1,
		//valueaxislinewidth = 1,
		//valueaxisboardlinewidth = 1,
		valueaxis = chart.valueaxes[0];
		//var length = valueaxis._ticks.length-1;
		var max = Math.max(valueaxis._max,0);
      
		//var endvalue = 0;
        var startX = centerX;
		var startY = centerY;
		var endX = centerX;
        var endY = centerY;
        var range;
		var bstartline = false;
		var halfX = endX;
		var halfy;	// = endY;
		

		categoryaxislinewidth = (categoryaxis && categoryaxis._axislinestyle) ? categoryaxis._axislinestyle._getBorderLeftWidth() : 1;
        //valueaxislinewidth = (valueaxis && valueaxis._axislinestyle) ? valueaxis._axislinestyle._getBorderLeftWidth() : 1;
		//valueaxisboardlinewidth = (valueaxis && valueaxis._boardlinestyle) ? valueaxis._boardlinestyle._getBorderLeftWidth() : 1;
		//var polygonstartx = categoryaxislinewidth/8;
		
        for (var i = 0; i < ticks.length; i++)
        {
			axisLine = ticks[i].boardlineElement;
            value = ticks[i].v;
            if (isNaN(value) || value < tickmin || value > tickmax)
            {
                continue;
            }

			endX = this.p2c(value,max);
            endY = valueaxis.p2c(max,value);
			halfX = this.p2chalf(value,max);
            halfY = valueaxis.p2chalf(max,value);
            if (axisLine)
			{
				axisLine.moveTo(startX, startY);
				axisLine.lineTo(endX,endY);
				ticks[i]._point = {"x": endX,"y": endY, "hx" : halfX, "hy" : halfY };
			}
        }
	
		// 외곽선 처리 
		var categorylength = 0;
		if(chart._radarangleinfo)
			categorylength = chart._radarangleinfo.length;
		if(this._axisLine && ticks.length > 0)
		{
			for(var j = 0; j < categorylength; j++)
			{
				
				if(j == 0)
				{
					startX = categoryaxis.p2c(j,max);
					startY = valueaxis.p2c(max,j);
					this._axisLine.moveTo(startX, startY);
					bstartline = true;
				}
				
				else
				{	
					endX = categoryaxis.p2c(j,max);
					endY = valueaxis.p2c(max,j);
					
					if(bstartline)
					{
						range = valueaxis.p2range(max,j);
						this._axisLine.arcTo(new nexacro.Point(endX, endY),new nexacro._ChartGraphicsSize(range,range),0,1,0);
					}
				}
				
			}
			if(bstartline)
			{
				this._axisLine.arcTo(new nexacro.Point(startX, startY),new nexacro._ChartGraphicsSize(range,range),0,1,0);
			}
		}
       
    };
	_pChartRoseCategoryAxisControl._arrangeLabelGroup = function ()
    {
        // category label 처리 
        var ticks = this._ticks,
			chart = this.parent,
			tick, labelEle,
			//dX = 0, 
			textW = 0,
            textH = 0,
			x = 0, y = 0,
			value,
			maxRadius = Math.min(chart._boardWidth, chart._boardHeight) / 2,
			//labelrotate = this.labelrotate,
			//location = this._location,
			labelgap = +this._labelgap ,
			centerX = chart._centerLeft,
	        centerY = chart._centerTop,
			categoryaxis = this,
			valueaxis = chart.valueaxes[0], 
			radius,
			startangle,
			ptPos,
			originpoint,
			vPoint = {x: 0, y: 0},
			vUnit,
			rotateX = 0,
			rotateY = 0,
			targetX = 0,
            targetY = 0,
           
			categoryaxislinewidth = 1,
			valueaxislinewidth = 1,
			valueaxisboardlinewidth = 1,
            labelBoundRect;

		categoryaxislinewidth = (categoryaxis && categoryaxis._axislinestyle) ? categoryaxis._axislinestyle._getBorderLeftWidth() : 1;
        valueaxislinewidth = (valueaxis && valueaxis._axislinestyle) ? valueaxis._axislinestyle._getBorderLeftWidth() : 1;
		valueaxisboardlinewidth = (valueaxis && valueaxis._boardlinestyle) ? valueaxis._boardlinestyle._getBorderLeftWidth() : 1;
		var linewidth = Math.max(categoryaxislinewidth,valueaxisboardlinewidth);
		function getDistance(x1, y1, x2, y2)
        {
            var nLen = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            return nLen;
        }

        function getUnitVector(ptAnchor, ptPos)
        {
            var pt = { x: 0, y: 0 };
            if (ptAnchor.x - ptPos.x == 0 && ptAnchor.y - ptPos.y == 0)
            {
                return pt;
            }

            var dx = ptAnchor.x - ptPos.x;
            var dy = ptAnchor.y - ptPos.y;

            var len = getDistance(ptAnchor.x, ptAnchor.y, ptPos.x, ptPos.y);
            pt.x = dx / len;
            pt.y = dy / len;

            return pt;
        }

		if (nexacro._ChartGraphicsLib.isEmpty(chart.radius))
        {
			radius = maxRadius * 0.8;
        }
        else
        {
            radius = maxRadius * chart._radius;
        }
		if(labelgap)
		{
			if(labelgap > 0)
				labelgap++;
		}
		labelgap += (linewidth/2);
		for (var i = 0; i < ticks.length; i++)
        {
            tick = ticks[i];
			labelEle = tick.labelElement;
            value = tick.v;

            if (nexacro._ChartGraphicsLib.isEmpty(tick.label) || nexacro._ChartGraphicsLib.isEmpty(labelEle) || value < this._min || value > this._max)
            {
                continue;
            }
			var angledata = chart._radarangleinfo[value];
			
			if(angledata)
			{
				x = Math.floor(tick._point.hx * 1000)/1000;
				y = Math.floor(tick._point.hy * 1000)/1000;

				labelBoundRect = labelEle.getGlobalBoundRect(),
				textW = labelBoundRect.width,
                textH = labelBoundRect.height;
                
				var _txtHeight =  (labelEle._txtSize[1] || textH),
				    _txtWidth =  (labelEle._txtSize[0] || textW);
				var textAlign = "center";
				var verticalAlign = "middle";
				

				if(y > centerY )
				{
					verticalAlign = "top";
					
				}
				else if(y < centerY)
				{
					verticalAlign = "bottom";
					
				}
				if(x > centerX)
				{
					textAlign = "left";
					
				}
				else if(x < centerX )
				{
					textAlign = "right";
					
					
				}
				if(labelEle._lines && labelEle._lines.length > 1)
						verticalAlign  = "middle";

				

				labelEle.set_verticalAlign(verticalAlign);
				labelEle.set_textAlign(textAlign);
				
				//startangle = angledata.startangle * 180 / Math.PI;
				startangle = angledata.halfangle * 180 / Math.PI;
				ptPos = {x:x,y:y};
				originpoint = { x: centerX, y: centerY };
                vPoint = {x:0,y:0};

				vUnit = getUnitVector(ptPos, originpoint);
                
				labelEle.set_x(x);
				labelEle.set_y(y);
				if(labelgap != 0)
				{
					rotateX = ptPos.x + vUnit.x * labelgap;
					rotateY = ptPos.y + vUnit.y * labelgap;
				
					if ((0 <= Number(startangle) && Number(startangle) < 90) || (360 <= Number(startangle) && Number(startangle) < 450))
					{
						targetX = rotateX + labelgap;
					}
					else if ((90 <= Number(startangle) && Number(startangle) < 180) || (450 <= Number(startangle) && Number(startangle) < 540))
					{
						targetX = rotateX + labelgap;
					}
					else if ((180 <= Number(startangle) && Number(startangle) < 270) || (540 <= Number(startangle) && Number(startangle) < 630))
					{
						targetX = rotateX - labelgap;
					}
					else
					{
						targetX = rotateX - labelgap;
					}
					targetY = rotateY;
				
					labelEle.set_x(targetX);
					labelEle.set_y(targetY);
				}
				
				chart._setAxislabelChangeInBoardAreaPos(labelEle);
			}
		}


		// position util
		

		function positionlefttop(itemText,cx,cy,rotate,width)
        {
			var vPoint = {x:0,y:0};
			var verticalAlign = "bottom";
			var textAlign = "right";
			
			var labelBoundRect = itemText.getGlobalBoundRect(),
				textW = labelBoundRect.width,
				textH = labelBoundRect.height,
				_txtHeight =  (itemText._txtSize[1] || textH),
				_txtWidth =  (itemText._txtSize[0] || textW);
			



			
			 itemText.set_verticalAlign(verticalAlign);
             itemText.set_textAlign(textAlign);
			 var textLeft = cx;
             var textTop = cy - (width / 2);
			
			 vPoint.x = textLeft;
			 vPoint.y = textTop;
			 return vPoint;
			
		}
		function positioncentertop(itemText,cx,cy,rotate,width)
        {
			var vPoint = {x:0,y:0};
			var verticalAlign = "bottom";
			var textAlign = "center";
			// y
			itemText.set_verticalAlign("bottom");
            itemText.set_textAlign("center");

			itemText.set_verticalAlign(verticalAlign);
            itemText.set_textAlign(textAlign);
			var textLeft = cx;
            var textTop = cy - (width / 2);
			 
			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positionrighttop(itemText,cx,cy,rotate,width)
        {
			var vPoint = {x:0,y:0};
			var verticalAlign = "bottom";
			var textAlign = "left";
			//xy
			

			itemText.set_verticalAlign(verticalAlign);
            itemText.set_textAlign(textAlign);
			var textLeft = cx;
            var textTop = cy - (width / 2);

			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positionleftmiddle(itemText,cx,cy,rotate,width)
        {
			var vPoint = {x:0,y:0};
			var verticalAlign = "middle";
			var textAlign = "right";
			//x
			
			itemText.set_verticalAlign(verticalAlign);
            itemText.set_textAlign(textAlign);
			var textLeft = cx;
            var textTop = cy - (width / 2);

			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positioncentermiddle(itemText,cx,cy,rotate,width)
        {
			var vPoint = {x:0,y:0};
			var verticalAlign = "middle";
			var textAlign = "center";
			//y
			

			itemText.set_verticalAlign(verticalAlign);
            itemText.set_textAlign(textAlign);
			var textLeft = cx;
            var textTop = cy - (width / 2);
			
			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positionrightmiddle(itemText,cx,cy,rotate,width)
        {
			var vPoint = {x:0,y:0};
			var verticalAlign = "middle";
			var textAlign = "left";
			//x
			

			itemText.set_verticalAlign(verticalAlign);
            itemText.set_textAlign(textAlign);
			var textLeft = cx;
            var textTop = cy - (width / 2);
			
			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;

		}
		function positionleftbottom(itemText,cx,cy,rotate,width)
        {
			var vPoint = {x:0,y:0};
			var verticalAlign  = "top";
			var textAlign = "right";
			//xy
			itemText.set_verticalAlign(verticalAlign);
            itemText.set_textAlign(textAlign);
			var textLeft = cx;
            var textTop = cy - (width / 2);
			
			
			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positioncenterbottom(itemText,cx,cy,rotate,width)
        {
			var vPoint = {x:0,y:0};
			var verticalAlign = "top";
			var textAlign = "center";
			//y
			

			itemText.set_verticalAlign(verticalAlign);
            itemText.set_textAlign(textAlign);
			var textLeft = cx;
            var textTop = cy - (width / 2);
			
			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		function positionrightbottom(itemText,cx,cy,rotate,width)
        {
			var vPoint = {x:0,y:0};
			var verticalAlign = "top";
			var textAlign = "left";
			//xy
			

			itemText.set_verticalAlign(verticalAlign);
            itemText.set_textAlign(textAlign);
			var textLeft = cx;
            var textTop = cy - (width / 2);
			
			vPoint.x = textLeft;
			vPoint.y = textTop;
			return vPoint;
		}
		
    };
	_pChartRoseCategoryAxisControl._changeContentsProperty = function (nm, newVal, oldVal)
    {
        

        var contents = this.parent.contents;
		if (contents && contents.categoryaxis)
        {
			contents.categoryaxis[nm] = newVal;
        }
        
    };
	_pChartRoseCategoryAxisControl._setTransformationHelpers = function ()
    {

		var chart = this.parent,
		
		maxRadius = Math.min(chart._boardWidth,chart._boardHeight) / 2,
		radius = 0,
		w = 0,
		centerX = chart._centerLeft,
		centerY = chart._centerTop,
        s, m, range,
		tickmin = chart.valueaxes[0]._min,
		tickmax = chart.valueaxes[0]._max;
		 
        if (nexacro._ChartGraphicsLib.isEmpty(chart.radius))
        {
            radius = maxRadius * 0.8;
        }
        else
        {
            radius = maxRadius * chart._radius;
        }
		w = radius;
		
		s = this._scale = w / Math.abs(tickmax - tickmin);
		m = Math.min(tickmax, tickmin);

        // data point를 좌표값으로 변경
        this.p2c = function (p,y) // y는 cos range를 알기 위해 필수
        {
			var angledata = chart._radarangleinfo[p];
			if(angledata)
			{
				range = (y - m) * s;
				return ((Math.sin(angledata.startangle) * range + centerX));
			}
			else
			{
				return centerX;
			}
            
        };
        this.p2chalf = function (p,y) // y는 cos range를 알기 위해 필수
        {
			var angledata = chart._radarangleinfo[p];
			if(angledata)
			{
				if((y - m) < m)
				{
					range = (y - (m/2)) * s;
				}
				else
				{
					range = (y - m) * s;
				}
				//range = (y - m) * s;
				return ((Math.sin(angledata.halfangle) * range + centerX));
			}
			else
			{
				return centerX;
			}
            
        };
		this.p2range = function (p,y) // y는 cos range를 알기 위해 필수
        {
			var angledata = chart._radarangleinfo[p];
			if(angledata)
			{
				range = (y - m) * s;
				return range;
			}
			else
			{
				return radius;
			}
            
        };
		

    };
	_pChartRoseCategoryAxisControl._setupTickGeneration = function (width, height)
    {
		// do noting (고정)
	};
}

if (!nexacro.ChartRoseValueAxisControl)
{
    //==============================================================================
    // nexacro.ChartRoseValueAxisControl
    //==============================================================================

    nexacro.ChartRoseValueAxisControl = function (id, parent, graphicsControl)
    {
		nexacro.ChartRadarValueAxisControl.call(this, id, parent, graphicsControl);
		this._direction = "y";
	};

    var _pChartRoseValueAxisControl = nexacro._createPrototype(nexacro.ChartRadarValueAxisControl, nexacro.ChartRoseValueAxisControl);
    nexacro.ChartRoseValueAxisControl.prototype = _pChartRoseValueAxisControl;
    _pChartRoseValueAxisControl._type_name = "ChartRoseValueAxisControl";

	// 신규 propertes
	_pChartRoseValueAxisControl.axislineindex = "0";  //0 ~~~ (categoryaxis rowcount -1)
	_pChartRoseValueAxisControl._axislineindex = 0;
	//_pChartRoseValueAxisControl.axislinetype = "polygon";  //circle
	_pChartRoseValueAxisControl.labelgapangle = "0";
    _pChartRoseValueAxisControl.boardlinevisible = true;

 	
	//logical method 
	_pChartRoseValueAxisControl.destroy = function()
	{
		this._destroy(true);
	};
	_pChartRoseValueAxisControl._destroy = function(parent_clear)
	{
		
		if (parent_clear)
        {
            // category, valueaxis 구분하여 삭제 - 하나씩 삭제 확인
            var axisId = this.id;
            if (this.parent)
            {
				 var index = -1;
                 nexacro._ChartGraphicsLibArray.forEach(this.parent.valueaxes, function (axis, i)
                 {
					if (axis instanceof nexacro.ChartAxisControl && axis.id == axisId)
                    {
						axis.parent._deleteContentsProp("valueaxes", i);
                        index = i;
                    }
                 });
                 nexacro._ChartGraphicsLibArray.removeAt(this.parent.valueaxes, index);
			}
        }

        delete this.locale;
        delete this.labeltype;
        delete this.labelmask;
        delete this._axisLine;
        delete this._axisRect;

        if (this._title)
        {
            this._title.destroy();
            delete this._title;
            this._title = null;
        }

        if (this._ticks)
        {
            for (var i = 0; i < this._ticks.length; i++)
            {
                var tick = this._ticks[i];
                var ticktext = tick.labelElement;
                if (ticktext)
                {
					var ticktextitem;
					for (var j = 0; j < 2; j++)
					{
						ticktextitem = ticktext[j];
						ticktextitem.destroy();
						ticktextitem = null;						
					}
					ticktext = null;
                }

                var tickline = tick.lineElement;
                if (tickline)
                {
                    tickline.destroy();
                    tickline = null;
                }

                var tickboardline = tick.boardlineElement;
                if (tickboardline)
                {
                    tickboardline.destroy();
                    tickboardline = null;
                }
                tick = null;
            }
        }

        this.id = null;
        this.locale = null;
        this.opposite = null;
        this.datetickunit = null;
        this.tickinterval = null;
        this.ticks = null;
        this.autotickscale = null;
        this.tickstartgap = null;
        this.tickendgap = null;
        this.tickmin = null;
        this.tickmax = null;
        this.gap = null;
        this.boardlinevisible = null;
        this.boardlinestyle = null;
        this.boardlineopacity = null;
        this.axislinestyle = null;
        this.axislineopacity = null;
        this.ticksize = null;
        this.ticklinestyle = null;
        this.ticklineopacity = null;
        this.labeltype = null;
        this.labelmask = null;
        this.labeltextfont = null;
        this.labeltextcolor = null;
        this.labelrotate = null;
        this.labeltextwidth = null;
        this.labelgap = null;
        this.titletext = null;
        this.titletextfont = null;
        this.titletextcolor = null;
        this.titlegap = null;
        this.titletextalign = null;
        this.titlerotate = null;
        this.id = null;

        this._axisRect = null;
        this._type = null;
        this._used = null;
        this._direction = null;
        this._location = null;
        this._datamin = null;
        this._datamax = null;
        this._min = null;
        this._max = null;
        this._tickstartgap = null;
        this._tickendgap = null;
        this._delta = null;
        this._tickinterval = null;
        this._datetickunit = null;
		this._tickmax = null;
		this._tickmin = null;
        this._ticks = null;
        this._labeltextfont = null;
        this._labelWidth = null;
        this._labelHeight = null;
        this._tickendspace = null;
        this._labeltextcolor = null;
        this._title = null;
        this._titleHeight = null;
        this._titleWidth = null;
        this._titletextfont = null;
        this._titletextcolor = null;
        this._halign = null;
        this._valign = null;
        this._boardlinestyle = null;
        this._axislinestyle = null;
        this._axisLine = null;
        this._axislineopacity = null;
        this._ticklinestyle = null;
        this._ticklineopacity = null;
        this._scale = null;
        this._categories = null;
        this._titlerotate = null;
        this._changedTicks = null;
        this._changedTickStyle = null;
        this._changedBoardLineStyle = null;
        this._changedTickLabelStyle = null;
        this._changedTickLabelRotate = null;
        this._rearrange = null;

        this._tickLabelTextAlign = null;
        this._tickLabelVerticalAlign = null;
        this._selectionMin = null;
        this._selectionMax = null;
        this._isTimeAxis = null;

        this._timeUnitSize = null;
        this._specMonths = null;
        
		
        if (this._boardLineGroup)
        {
            this._boardLineGroup.destroy();
            this._boardLineGroup = null;
        }

        if (this._tickGroup)
        {
            this._tickGroup.destroy();
            this._tickGroup = null;
        }

        if (this._labelGroup)
        {
            this._labelGroup.destroy();
            this._labelGroup = null;
        }
		
        if (this._group)
        {
			
			var itemID = this._group.id;
		
			var item = this._graphicsControl.getObjectByID(itemID);
			if (item)
			{
				this._graphicsControl.removeChild(item);
			}
            this._group.destroy();
            this._group = null;
        }

        if (this.parent)
        {
			this.parent._rearrange = true;
            this.parent._recreate = true;
            this.parent = null;
        }

        nexacro.Object.prototype.destroy.call(this);
        return true;
	};
	//===============================================================
    // nexacro._pChartRoseValueAxisControl : Logical part
    //===============================================================

	
	_pChartRoseValueAxisControl._setData = function(clientWidth, clientHeight)
	{
		 var changedTicks = this._changedTicks,
			axislinestyle = this._axislinestyle,
			axislineopacity = this._axislineopacity,
			boardlinestyle = this._boardlinestyle,
			boardlinevisible = this.boardlinevisible,
			boardlineopacity = this._boardlineopacity,
			boardlineWidth = 0,
			axislineWidth = 0;
           
 
        if (changedTicks || this._changedTickLabelRotate)
        {
            this._setRange();
			this._setupTickGeneration(clientWidth, clientHeight);
            this._setMinMaxTicks();

			this._setTicks();

            this._labelGroup.clear();
			this._boardLineGroup.clear();
			if(this._axisLine)
				this._axisLine.clear();
        }

        var ticks = this._ticks,
			tick, value, 
			chart = this.parent,
			align, tickLabel,
			labeltextfont = this.labeltextfont ? this.labeltextfont.value || this.labeltextfont : "10pt Verdana",
			labeltextcolor = this.labeltextcolor ? this.labeltextcolor.value || this.labeltextcolor : "#000000",
			labelrotate = this.labelrotate,
			textAlign = this._tickLabelTextAlign,
			verticalAlign = this._tickLabelVerticalAlign,
			labelmaxwidth = this.labeltextwidth,
			checkmaxvalue,
			axisLine;
		
		this.labeltextposition = "both";
		var labelPos = this.labeltextposition;	// hsji
		var arrtickIDPrefix = ["ChartAxisLabelX","ChartAxisLabelY"];

        if (changedTicks && (nexacro._isNull(textAlign) || nexacro._isNull(verticalAlign)))
        {
            this._getTickLabelAlign(labelrotate);
            textAlign = this._tickLabelTextAlign;
            verticalAlign = this._tickLabelVerticalAlign;
        }

        if (changedTicks || this._changedTickStyle || this._changedBoardLineStyle
			|| this._changedTickLabelRotate || this._changedTickLabelStyle)
        {
            for (var i = 0; i < ticks.length; i++)
            {
                tick = ticks[i];

                value = tick.v;
                if (nexacro._ChartGraphicsLib.isEmpty(tick.label) || value < this._min || value > this._max)
                {
                    continue;
                }
				checkmaxvalue = value;
                if (changedTicks)
                {
					// guidepath 생성 
                    axisLine = new nexacro.ChartGraphicsPaths();
                    axisLine.set_id("ChartAxisTickBoardLine" + i);
                    this._boardLineGroup.addChild( axisLine);
                    tick.boardlineElement =  axisLine;
                    axisLine._axis = this;

                    axisLine.set_strokepen(boardlinestyle ? boardlinestyle.value || boardlinestyle : "1px solid #d0d0d0");
                    axisLine.set_opacity(boardlineopacity ? boardlineopacity._sysvalue : 1);
                }
				else
                {
					if (this._changedBoardLineStyle)
                    {
						axisLine = tick.boardlineElement;
						if (axisLine)
                        {
                           axisLine.set_strokepen(boardlinestyle ? boardlinestyle.value || boardlinestyle : "1px solid #d0d0d0");
						   axisLine.set_opacity(boardlineopacity ? boardlineopacity._sysvalue : 1);
                        }
					}
                }

                if (changedTicks || this._changedTickLabelRotate)
                {
					if(!tick.labelElement) tick.labelElement = [];
					for (var k = 0; k < 2; k++)
					{
						tickLabel = new nexacro.ChartGraphicsText(0, 0);
						tickLabel.set_id("ChartAxisLabel_" + k + "_" + i);
						tickLabel.set_text(tick.label);
						this._labelGroup.addChild(tickLabel);
						tick.labelElement[k] = tickLabel;
						tickLabel._axis = this;

						tickLabel.set_font(labeltextfont);
						tickLabel.set_color(labeltextcolor);
						if (labelmaxwidth > 0)
						{
							tickLabel.set_wordWrap(true);
							tickLabel.set_width(labelmaxwidth);
						}
						else
						{
							tickLabel.set_wordWrap(false);
						}

						tickLabel.set_textAlign(textAlign);
						tickLabel.set_verticalAlign(verticalAlign);
						tickLabel.setTransform("rotate(" + labelrotate + ",0,0)");
					}
                }
                else
                {
                    if (this._changedTickLabelStyle)
                    {
						for (var k = 0; k < 2; k++)
						{
							tickLabel = tick.labelElement[k];
							tickLabel.set_font(labeltextfont);
							tickLabel.set_color(labeltextcolor);
						   if (labelmaxwidth > 0)
							{
								tickLabel.set_wordWrap(true);
								tickLabel.set_width(labelmaxwidth);
							}
							else
							{
								tickLabel.set_wordWrap(false);
							}							
						}
                    }
                }
            }
			/*if(ticks.length > 0 && checkmaxvalue < this._max)
			{
				if (changedTicks)
                {
						this._axislimitline = new nexacro.ChartGraphicsPaths();
						this._axislimitline.set_id("ChartAxisTickBoardLine" + ticks.length);
						this._boardLineGroup.addChild(this._axislimitline);
						this._axislimitline.set_strokepen(axislinestyle ? axislinestyle.value || axislinestyle : "1px solid #d0d0d0");
						this._axislimitline.set_opacity(axislineopacity ? axislineopacity._sysvalue : 1);
				}
				else
                {
					if (this._changedTickStyle)
                    {
						this._axislimitline.set_strokepen(axislinestyle ? axislinestyle.value || axislinestyle : "1px solid #d0d0d0");
						this._axislimitline.set_opacity(axislineopacity ? axislineopacity._sysvalue : 1);
					}
				}
			}
			*/
        }
		if(changedTicks || this._changedTickStyle)
		{
			this._axisLine.set_strokepen(axislinestyle ? axislinestyle.value || axislinestyle : "1px solid #d0d0d0");
			this._axisLine.set_opacity(axislineopacity ? axislineopacity._sysvalue : 1);
		}
        this._changedTicks = false;
        this._changedTickStyle = false;
        this._changedBoardLineStyle = false;
        this._changedTickLabelStyle = false;
        this._changedTickLabelRotate = false;

        var info = this._labelGroup.getGlobalBoundRect(false, true);

        this._labelHeight = info.height;
		this._labelWidth = info.width;
		
        
	};
	_pChartRoseValueAxisControl._getTickLabelAlign = function(labelrotate,index)
	{
		return;
		
	};
	_pChartRoseValueAxisControl._arrangeTickGroup = function()
	{
		// line 처리 
        var x = 0, y = 0,
		chart = this.parent,
        ticks = this._ticks,
		tick,
		value,index,
		maxRadius = Math.min(chart._boardWidth, chart._boardHeight) / 2,
		tickmin = this._min,
        tickmax = this._max,
		axisLine,
		centerX = chart._centerLeft,
	    centerY = chart._centerTop,
		categoryaxis = chart.categoryaxis,
        range,
        radius,
        tickposition = this._axislineindex || 0,
		categoryaxislinewidth = 1,
		valueaxislinewidth = 1,
        valueaxisboardlinewidth = 1,
        angledata,
		valueaxis = this;

		var startX = centerX;
		var startY = centerY;
		var endX = centerX;
		var endY = centerY;
		var bstartline = false;
		var categorylength = 0;

		categoryaxislinewidth = (categoryaxis && categoryaxis._axislinestyle) ? categoryaxis._axislinestyle._getBorderLeftWidth() : 1;
        valueaxislinewidth = (valueaxis && valueaxis._axislinestyle) ? valueaxis._axislinestyle._getBorderLeftWidth() : 1;
		valueaxisboardlinewidth = (valueaxis && valueaxis._boardlinestyle) ? valueaxis._boardlinestyle._getBorderLeftWidth() : 1;

		var polygonstartx = valueaxisboardlinewidth/8;
		if(chart._radarangleinfo)
			categorylength = chart._radarangleinfo.length;
		var tickspointarr = [];
		if (nexacro._ChartGraphicsLib.isEmpty(chart.radius))
        {
			radius = maxRadius * 0.8;
        }
        else
        {
            radius = maxRadius * chart._radius;
        }
		for (var i = 0; i < ticks.length; i++)
        {
            axisLine = ticks[i].boardlineElement;
            value = ticks[i].v;
			tickspointarr = [];
            if (isNaN(value) || value < tickmin || value > tickmax)
            {
                continue;
            }
			
            for(var j = 0; j < categorylength; j++)
			{
				var _point;
				range = valueaxis.p2range(value,j);
				if(j == 0)
				{
					startX = categoryaxis.p2c(j,value);
					startY = valueaxis.p2c(value,j);
					axisLine.moveTo(startX, startY);
					angledata = chart._radarangleinfo[j];
					_point = {"x": startX,"y": startY ,"startangle": angledata.startangle,"range":range};
					bstartline = true;
				}
				else
				{	
					endX = categoryaxis.p2c(j,value);
					endY = valueaxis.p2c(value,j);
					
					if(bstartline)
					{
						axisLine.arcTo(new nexacro.Point(endX, endY),new nexacro._ChartGraphicsSize(range,range),0,1,0);
					}
					angledata = chart._radarangleinfo[j];
					_point = {"x": endX,"y": endY ,"startangle": angledata.startangle,"range":range};				
				}
				tickspointarr.push(_point);	
			}
			// value는 array임 
			if(bstartline)
			{
				axisLine.arcTo(new nexacro.Point(startX, startY),new nexacro._ChartGraphicsSize(range,range),0,1,0);
			}
			ticks[i]._point = tickspointarr; 
        }
       
		if(this._axisLine && ticks.length > 0 && categorylength > 0)
		{
			startX = centerX;
			startY = centerY;
			if(tickposition > categorylength-1)tickposition = 0;
            ticks = categoryaxis._ticks;
            var indextick = tickposition;
			value = ticks[indextick].v;
			endX = categoryaxis.p2c(value,this._max);
            endY = this.p2c(this._max,value);
            
			this._axisLine.moveTo(startX, startY);
			chart._centerx = startX;
			chart._centery = startY;
			
			this._axisLine.lineTo(endX,endY);

		}
		 
	};
	_pChartRoseValueAxisControl._arrangeLabelGroup = function()
	{
		// value label 처리 
        var ticks = this._ticks,
			chart = this.parent,
			tick, labelEle, labelEleItm,
			dX = 0, textW = 0,
            textH = 0,
			x = 0, y = 0,
			value,
		    maxRadius = Math.min(chart._boardWidth, chart._boardHeight) / 2,
			labelrotate = this.labelrotate,
			location = this._location,
			labelgap = +this._labelgap,
			centerX = chart._centerLeft,
	        centerY = chart._centerTop,
			categoryaxis = chart.categoryaxis,
			valueaxis = this, 
			radius,
            startangle,
            range,
			ptPos,
			originpoint,
			vPoint = {x: 0, y: 0},
			vUnit,
			rotateX = 0,
			rotateY = 0,
			targetX = 0,
			targetY = 0,
			tickposition = this._axislineindex || 0,
			labelposition = this._labelposition,
			categoryaxislinewidth = 1,
			valueaxislinewidth = 1,
			labelBoundRect;

		categoryaxislinewidth = (categoryaxis && categoryaxis._axislinestyle) ? categoryaxis._axislinestyle._getBorderLeftWidth() : 1;
        valueaxislinewidth = this._axislinestyle ? this._axislinestyle._getBorderLeftWidth() : 1;

		if (nexacro._ChartGraphicsLib.isEmpty(chart.radius))
        {
			radius = maxRadius * 0.8;
        }
        else
        {
            radius = maxRadius * chart._radius;
        }
		var tickpos = [0, ((Math.PI * 0.5) * 180 / Math.PI)];

		for (var i = 0; i < ticks.length; i++)
        {
            tick = ticks[i];
			labelEle = tick.labelElement;
            value = tick.v;

            if (nexacro._ChartGraphicsLib.isEmpty(tick.label) || nexacro._ChartGraphicsLib.isEmpty(labelEle) || value < this._min || value > this._max || tick._point.length <= 0)
            {
                continue;
            }
			
			var textAlign = "center";
			var verticalAlign = "middle";
			if(tick._point && tick._point.length-1 < tickposition)tickposition = 0;
			for (var j = 0; j < 2; j++)
			{
				labelEleItm = labelEle[j];
				if(nexacro._ChartGraphicsLib.isEmpty(labelEleItm)) continue;
				
				//targetX = tick._point[tickposition].x;
				//targetY = tick._point[tickposition].y;
				//startangle = tick._point[tickpos[j]].startangle * 180 / Math.PI;
				
				range = tick._point[tickposition].range;		
				
				labelEleItm.set_verticalAlign(verticalAlign);
				labelEleItm.set_textAlign(textAlign);
				/*
				if(labelgap != 0)
				{
					startangle = startangle + labelgap;
					var radian = startangle * Math.PI / 180;
					targetX = ((Math.sin(radian) * (range) + centerX));
					targetY = ((-Math.cos(radian) * (range) + centerY));
				}
				*/
				//tick._point[tickposition].startangle * 180 / Math.PI;
				labelgap = 1;
				startangle = tickpos[j];
				startangle = startangle + labelgap;
				var radian = startangle * Math.PI / 180;
				targetX = ((Math.sin(radian) * (range) + centerX));
				targetY = ((-Math.cos(radian) * (range) + centerY));				
				
				targetY = targetY - (valueaxislinewidth / 2);

				labelEleItm.set_x(targetX);
				labelEleItm.set_y(targetY);			

				chart._setAxislabelChangeInBoardAreaPos(labelEleItm);
			}
		}
	};
	
	_pChartRoseValueAxisControl._setTransformationHelpers = function ()
    {
        var chart = this.parent,
		maxRadius = Math.min(chart._boardWidth,chart._boardHeight) / 2,
		radius = 0,
		h = 0,
		centerX = chart._centerLeft,
		centerY = chart._centerTop,
		s, m,
        tickmin = this._min,
        range,
		tickmax = this._max;

        if (nexacro._ChartGraphicsLib.isEmpty(chart.radius))
        {
            radius = maxRadius * 0.8;
        }
        else
        {
            radius = maxRadius * chart._radius;
        }
		h = radius;
		s = this._scale = h / Math.abs(tickmax - tickmin);
		m = Math.min(tickmax, tickmin);
		//scale 지정 

        // data point를 좌표값으로 변경    x는 angle을 알기 위해 필수 
        this.p2c = function (p,x)
        {
			var angledata = chart._radarangleinfo[x];
			if(angledata)
			{
				range = (p - m) * s;
				return ((-Math.cos(angledata.startangle) * range + centerY));
			}
			else
			{
				return centerY;
			}
            
        };
        this.p2chalf = function (p,x)
        {
			var angledata = chart._radarangleinfo[x];
			if(angledata)
			{
				if((p - m) < m)
				{
					range = (p - (m/2)) * s;
				}
				else
				{
					range = (p - m) * s;
				}				
				return ((-Math.cos(angledata.halfangle) * range + centerY));
			}
			else
			{
				return centerY;
			}
            
        };
		 this.p2range = function (p,x, effect)
        {
			var angledata = chart._radarangleinfo[x];
			if(angledata)
			{
				if(effect && effect.isloadanimation)
				{
					range = (p - m) * s;
				}
				else
				{
					if((p - m) < m)
					{
						range = (p - (m/2)) * s;
					}
					else
					{
						range = (p - m) * s;
					}
				}
				range = (p - m) * s;
				return range;
			}
			else
			{
				return radius;
			}
        };

    };


}
// SeriesControl
if (!nexacro.ChartRoseSeriesControl)
{
    //==============================================================================
    // nexacro.ChartRoseSeriesEventInfo
    //==============================================================================


    //==============================================================================
    // nexacro.ChartRoseSeries
    //==============================================================================
    nexacro.ChartRoseSeriesControl = function (id, parent, graphicsControl)
    {
        nexacro._SeriesBase.prototype.constructor.apply(this, arguments);

        this._seriesitems = [];

        // TODO: Legend item click show, hide
        this._clickItemIndex = [];
        this._clickShow = false;
    };

    var _pChartRoseSeriesControl = nexacro._createPrototype(nexacro._SeriesBase, nexacro.ChartRoseSeriesControl);
    nexacro.ChartRoseSeriesControl.prototype = _pChartRoseSeriesControl;
    _pChartRoseSeriesControl._type_name = "ChartRoseSeriesControl";

    /* default properties */

   
    _pChartRoseSeriesControl.visible = true;

	/////////////// line
	
	_pChartRoseSeriesControl.lineopacity = 1;
    _pChartRoseSeriesControl.linestyle = "";

    _pChartRoseSeriesControl.highlightlinestyle = "";
    _pChartRoseSeriesControl.highlightlineopacity = 1;
    _pChartRoseSeriesControl.highlightfillstyle = "";
	_pChartRoseSeriesControl.fillstyle = "";
  
    _pChartRoseSeriesControl.roseopacity = 1;
	_pChartRoseSeriesControl._roseopacity = null;

	_pChartRoseSeriesControl.highlightvisible = false;
    _pChartRoseSeriesControl.highlightopacity = 1;
	_pChartRoseSeriesControl._highlightopacity = null;

	_pChartRoseSeriesControl.lineitemtextposition = "";

	_pChartRoseSeriesControl._pointshape = null;
    _pChartRoseSeriesControl._pointborderwidth = null;
    _pChartRoseSeriesControl._lineborderwidth = null;
    _pChartRoseSeriesControl._linebordercolor = null;
	_pChartRoseSeriesControl._highlightfillstyle = null;
	_pChartRoseSeriesControl._fillstyle = null;
	_pChartRoseSeriesControl._highlightlinestyle = null;
    _pChartRoseSeriesControl._color = null;
    _pChartRoseSeriesControl._changedSeriesColor = true;


    /* internal variable */
   

    //============================================================
    // nexacro.ChartRoseSeries : Properties
    //============================================================
	 _pChartRoseSeriesControl.destroy = function ()
    {
        /*
		TODO - 해당 Graphics Object를 삭제
		config index에 해당하는 Object만 찾아서 destroy() - 현재 미구현
		series별로 Group을 생성하는 구조 검토 필요
		*/
        if (!this._chart)
            return;

        if (this._seriesitems.length > 0)
        {
            for (var i = 0; i < this._seriesitems.length; i++)
            {
                if (this._seriesitems[i])
                {
                    if (this._seriesitems[i]._series)
                    {
                        delete this._seriesitems[i]._series;
                        this._seriesitems[i]._series = null;
                    }

                    this._seriesitems[i].destroy();
                    delete this._seriesitems[i];
                    this._seriesitems[i] = null;
                }
            }
        }

		 /* default properties */

   
		this.visible = true;

		/////////////// line
	
		this.highlightfillstyle = null;
		this.fillstyle = null;
		this.highlightlinestyle = null;
		
		this._highlightfillstyle = null;
		this._fillstyle = null;
		this._highlightlinestyle = null;
		
		this.lineopacity = null;
		this.linestyle = null;

		this.highlightlinestyle = null;
		this.highlightlineopacity = null;
	
		this.roseopacity = null;
		this._roseopacity = null;

		this.highlightvisible = null;
		this.highlightopacity = null;
		this._highlightopacity = null;

		this.pointitemtextposition = null;
		this.lineitemtextposition = null;

		this._pointshape = null;
		this._pointborderwidth = null;
		this._lineborderwidth = null;
		this._linebordercolor = null;
		this._color = null;
		this._changedSeriesColor = null;
      
       return true;

    };

    _pChartRoseSeriesControl.set_visible = function (val)
    {
        if (val === undefined || val === null)
        {
            return;
        }

        val = nexacro._toBoolean(val);
        if (this.visible != val)
        {
            this._changeContentsProperty("visible", val, this.visible);
            this.visible = val;
            this.on_apply_visible(val);
        }

        this._chart._draw();
    };

    _pChartRoseSeriesControl.on_apply_visible = function (visible)
    {
        if (this._is_initprop)
            return;

        if (visible)
        {
            var selecttype = this.selecttype;
            if (selecttype)
            {
                this._chart._changedData = true;
            }
            else
            {
                this._redrawSeries = false;
                this._applyPropertySeries("visible", true);
            }

            if (this.itemtextvisible)
            {
                this.on_apply_itemtextvisible(true);
            }
        }
        else
        {
            this._redrawSeries = false;
            this._applyPropertySeries("visible", false);

            if (!this._itemtextvisible)
            {
                this.on_apply_itemtextvisible(false);
            }
        }

        if (this._chart.legend)
        {
            this._chart._applyLegendItem();
        }
    };

	
	_pChartRoseSeriesControl.set_linestyle = function (val)
    {
        this.linestyle = val;
        if (val)
        {
            if (this._linestyle == null || this._linestyle.value != val)
            {
                var oldValue;
                if (this._linestyle)
                {
                    oldValue = this._linestyle.value;
                }
                this._changeContentsProperty("linestyle", val, oldValue);

                var linestyle = nexacro.BorderLineObject(val);
                this._linestyle = linestyle;
                this.on_apply_linestyle(linestyle);
            }
        }
        else
        {
            if (this._linestyle)
            {
                this._linestyle = null;
                this.on_apply_linestyle(null);
            }
        }

        this._chart._draw();
    };

    _pChartRoseSeriesControl.on_apply_linestyle = function (linestyle)
    {
        if (linestyle)
        {
            this._borderwidth = linestyle._width;
 
            this._linebordercolor = linestyle.color.value;
        
        }
        this._redrawSeries = false;
		
		this._applyPropertySeries("Line","linestyle", linestyle);
    };

	 _pChartRoseSeriesControl.set_lineopacity = function (val)
    {
        this.lineopacity = val;
        if (0 === val || val)
        {
            if (this._lineopacity == null || this._lineopacity.value != val)
            {
                var oldValue;
                if (this._lineopacity)
                {
                    oldValue = this._lineopacity.value;
                }
                this._changeContentsProperty("lineopacity", val, oldValue);

                var lineopacity = nexacro.OpacityObject(val);
                this._lineopacity = lineopacity;
                this.on_apply_lineopacity(lineopacity);
            }
        }
        else
        {
            if (this._lineopacity)
            {
                this._lineopacity = null;
                this.on_apply_lineopacity(null);
            }
        }

        this._chart._draw();
    };

    _pChartRoseSeriesControl.on_apply_lineopacity = function (lineopacity)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("Line", "lineopacity", lineopacity);
    };

    _pChartRoseSeriesControl.set_highlightlinestyle = function (val)
    {
        this.highlightlinestyle = val;
        if (val)
        {
            if (this._highlightlinestyle == null || this._highlightlinestyle.value != val)
            {
                var oldValue;
                if (this._highlightlinestyle)
                {
                    oldValue = this._highlightlinestyle.value;
                }
                this._changeContentsProperty("highlightlinestyle", val, oldValue);

                var highlightlinestyle = nexacro.BorderLineObject(val);
                this._highlightlinestyle = highlightlinestyle;
                this.on_apply_highlightlinestyle(highlightlinestyle);
            }
        }
        else
        {
            if (this._highlightlinestyle)
            {
                this._highlightlinestyle = null;
                this.on_apply_highlightlinestyle(null);
            }
        }

        this._chart._draw();
    };

    _pChartRoseSeriesControl.on_apply_highlightlinestyle = function (highlightlinestyle)
    {
        // TODO style만 변경처리 여부 검토
    };

    _pChartRoseSeriesControl.set_highlightlineopacity = function (val)
    {
        this.highlightlineopacity = val;
        if (0 === val || val)
        {
            if (this._highlightlineopacity == null || this._highlightlineopacity.value != val)
            {
                var oldValue;
                if (this._highlightlineopacity)
                {
                    oldValue = this._highlightlineopacity.value;
                }
                this._changeContentsProperty("highlightlineopacity", val, oldValue);

                var highlightlineopacity = nexacro.OpacityObject(val);
                this._highlightpointopacity = highlightlineopacity;
                this.on_apply_highlightlineopacity(highlightlineopacity);
            }
        }
        else
        {
            if (this._highlightpointopacity)
            {
                this._highlightpointopacity = null;
                this.on_apply_highlightlineopacity(null);
            }
        }

        this._chart._draw();
    };

    _pChartRoseSeriesControl.on_apply_highlightlineopacity = function (highlightlineopacity)
    {
        // TODO style만 변경처리 여부 검토
    };
	
    _pChartRoseSeriesControl.set_fillstyle = function (val)
    {
        this.fillstyle = val;
        if (val)
        {
            if (this._fillstyle == null || this._fillstyle.value != val)
            {
                var oldValue;
                if (this._fillstyle)
                {
                    oldValue = this._fillstyle.value;
                }
                this._changeContentsProperty("fillstyle", val, oldValue);
				
				var fillstyle = val;
				var arrColorList = this._spliterColor(val, true);
				if(!arrColorList) {
				} else if(arrColorList.length == 1) {
					fillstyle = arrColorList[0];
				} else {
					fillstyle = arrColorList;				
				}				

                this._fillstyle = fillstyle;
                this.on_apply_fillstyle(fillstyle);
            }
        }
        else
        {
            if (this._fillstyle)
            {
                this._fillstyle = null;
                this.on_apply_fillstyle(null);
            }
        }

        this._chart._draw();
    };

    _pChartRoseSeriesControl.on_apply_fillstyle = function (fillstyle)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("Area", "fillstyle", fillstyle);

        if (this._chart.legend)
        {
            this._chart._applyLegendItem();
        }
    };
	
    _pChartRoseSeriesControl.set_highlightfillstyle = function (val)
    {
        this.highlightfillstyle = val;
        if (val)
        {
            if (this._highlightfillstyle == null || this._highlightfillstyle.value != val)
            {
                var oldValue;
                if (this._highlightfillstyle)
                {
                    oldValue = this._highlightfillstyle.value;
                }
                this._changeContentsProperty("highlightfillstyle", val, oldValue);
				
				var highlightfillstyle = val;
				var arrColorList = this._spliterColor(val, true);
				if(!arrColorList) {
				} else if(arrColorList.length == 1) {
					highlightfillstyle = arrColorList[0];
				} else {
					highlightfillstyle = arrColorList;				
				}				

                this._highlightfillstyle = highlightfillstyle;
                this.on_apply_highlightfillstyle(highlightfillstyle);
            }
        }
        else
        {
            if (this._highlightfillstyle)
            {
                this._highlightfillstyle = null;
                this.on_apply_highlightfillstyle(null);
            }
        }

        this._chart._draw();
    };

    _pChartRoseSeriesControl.on_apply_highlightfillstyle = function (highlightfillstyle)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("Area", "highlightfillstyle", highlightfillstyle);
    };	

    _pChartRoseSeriesControl.set_roseopacity = function (val)
    {
        this.roseopacity = val;
        if (0 === val || val)
        {
            if (this._roseopacity == null || this._roseopacity.value != val)
            {
                var oldValue;
                if (this._roseopacity)
                {
                    oldValue = this._roseopacity.value;
                }
                this._changeContentsProperty("roseopacity", val, oldValue);

                var opacity = nexacro.OpacityObject(val);
                this._roseopacity = opacity;
                this.on_apply_roseopacity(opacity);
            }
        }
        else
        {
            if (this.roseopacity)
            {
                this._roseopacity = null;
                this.on_apply_roseopacity(null);
            }
        }

        this._chart._draw();
    };
	_pChartRoseSeriesControl.on_apply_roseopacity = function (opacity)
    {
        this._applyPropertySeries("Area", "roseopacity", opacity);
    };
	_pChartRoseSeriesControl.set_highlightvisible = function (val)
    {
        if (val === undefined || val === null)
        {
            return;
        }

        val = nexacro._toBoolean(val);
        if (this.highlightvisible != val)
        {
            this._changeContentsProperty("highlightvisible", val, this.highlightvisible);
            this.highlightvisible = val;
            this.on_apply_highlightvisible(val);
        }

        this._chart._draw();
    };

    _pChartRoseSeriesControl.on_apply_highlightvisible = function (highlightvisible)
    {
        // TODO style만 변경처리 여부 검토
    };
   

	_pChartRoseSeriesControl.set_highlightopacity  = function (val)
    {
        this.highlightopacity  = val;
        if (0 === val || val)
        {
            if (this._highlightopacity  == null || this._highlightopacity .value != val)
            {
                var oldValue;
                if (this._highlightopacity )
                {
                    oldValue = this._highlightopacity .value;
                }
                this._changeContentsProperty("highlightopacity", val, oldValue);

                var highlightopacity = nexacro.OpacityObject(val);
                this._highlightopacity = highlightopacity;
                this.on_apply_highlightopacity(highlightopacity);
            }
        }
        else
        {
            if (this._highlightopacity)
            {
                this._highlightopacity = null;
                this.on_apply_highlightopacity(null);
            }
        }

        this._chart._draw();
    };

    _pChartRoseSeriesControl.on_apply_highlightopacity = function (highlightopacity)
    {
        // TODO style만 변경처리 여부 검토
    };

	_pChartRoseSeriesControl.set_lineitemtextgap = function (val)
    {
        if (val !== undefined && val !== null && val !== "")
        {
            if (isNaN(val))
            {
                return;
            }

            val = parseInt(val);
        }
        if (this.lineitemtextgap != val)
        {
            this._changeContentsProperty("lineitemtextgap", val, this.lineitemtextgap);
            this.lineitemtextgap = val;
            this.on_apply_lineitemtextgap();
        }
    };
    _pChartRoseSeriesControl.on_apply_lineitemtextgap = function ()
    {
		this._chart._rearrange = true;
        this._chart._recreate = true;
    };
	_pChartRoseSeriesControl.set_pointitemtextposition = function (val)
    {
        var itemtextposition_enum = ["lefttop", "centertop", "righttop", "leftmiddle",
            "centermiddle", "rightmiddle", "leftbottom", "centerbottom", "rightbottom"];
        if (itemtextposition_enum.indexOf(val) == -1)
        {
            return;
        }

        if (this.pointitemtextposition != val)
        {
            this._changeContentsProperty("pointitemtextposition", val, this.pointitemtextposition);
            this.pointitemtextposition = val;
            this.on_apply_pointitemtextposition();
        }

        this._chart._draw();

    };
    _pChartRoseSeriesControl.on_apply_pointitemtextposition = function ()
    {
        this._chart._recreate = true;
		this._chart._rearrange = true;
    };
	_pChartRoseSeriesControl.set_lineitemtextposition = function (val)
    {
        var itemtextposition_enum = ["lefttop", "centertop", "righttop", "leftmiddle",
            "centermiddle", "rightmiddle", "leftbottom", "centerbottom", "rightbottom"];
        if (itemtextposition_enum.indexOf(val) == -1)
        {
            return;
        }

        if (this.lineitemtextposition != val)
        {
            this._changeContentsProperty("lineitemtextposition", val, this.lineitemtextposition);
            this.lineitemtextposition = val;
            this.on_apply_lineitemtextposition();
        }

        this._chart._draw();

    };
    _pChartRoseSeriesControl.on_apply_lineitemtextposition = function ()
    {
        this._chart._recreate = true;
		this._chart._rearrange = true;
    };
    //============================================================
    // nexacro.ChartRoseSeries : Methods
    //============================================================

    //============================================================
    // nexacro.ChartRoseSeries : Logical part
    //============================================================	
    _pChartRoseSeriesControl._applyPropertySeries = function (type, style, value, select)
   {
        var item = null,
			seriesGroup = this._chart._graphicsControl.getObjectByID("ChartSeriesGroup");

        if (seriesGroup)
        {
            for (var i = 1; i <= this._itemCnt; i++)
            {
                // series type별 분기 처리 - Bar, Point, Line, Area
                var itemID = this._configIndex + " SeriesRoseItem_" + (i - 1),
					isselectitem = false;

                item = seriesGroup.getObjectByID(itemID);
                if (!nexacro._isNull(item))
                {
					if (style == "fillstyle")
					{
						item.set_fillstyle(value);
					}
					else if (style == "linestyle")
					{
						item.set_strokepen(value);
					}
					else if (style == "roseopacity" || style == "lineopacity" || style == "highlightopacity")
					{
						item.set_opacity(value);
					}
                }
            }
        }
    };

    _pChartRoseSeriesControl._draw2 = function (redraw)
    {
		if (!redraw)
            return;
		this._itemCnt = 0;
		this._itemtextlist = [];
		
		
		if (this.visible)
        {
            this._drawSeriesLines();
        }
		/*
        if (this.pointvisible)
        {
            this._drawSeriesPoints();
        }
		*/

       
    };
	// 최신 
	_pChartRoseSeriesControl._draw = function (redraw)
    {
		nexacro._SeriesBase.prototype._draw.call(this);
		var effect = this._chart_aniframe_obj;
        if (!redraw)
		{
			if(this._chart._isanimationloading)
			{
				this._end_animation_series_callback();
			}
			return;
		}
		this._itemCnt = 0;
		this._itemtextlist = [];
		
		if(effect.enableanimation)   // 삭제 체크
		{

			if(this._chart._isanimationloading)
			{
				this._end_animation_series_callback();
			}
			else
			{
				this._start_animate();
			}
		}
		else
		{
			
			this._drawnow();
			
		}

       
    };
	_pChartRoseSeriesControl._drawnow = function()
	{
		
		if (this.visible)
        {
            this._drawSeriesLines();
        }
	};
	_pChartRoseSeriesControl._drawSeriesLines = function ()
    {
		var linestyle = this.linestyle || "1px solid " + this._color,
			categoryaxis = this._chart.categoryaxis,
			valueaxis = this._chart.valueaxes[0],
			path,
			area,
			datapoints = this._datapoints,
			seriesGroup = this._chart._seriesGroup,
			effect = this._chart_aniframe_obj,
			length = 0;
			// 접근성 추가 코드 적용 

			path = this._drawRose(datapoints, 0, 0, categoryaxis, valueaxis);
			
			var itemtextvisible = this.itemtextvisible,
			pointvisible = this.pointvisible;
			if (itemtextvisible)
			{
				if (path)
				{
					if(effect && effect.isloadanimation)
					{
					}
					else
						this._drawRoseItemText(datapoints, categoryaxis, valueaxis, path);
				}
			}

	};

   _pChartRoseSeriesControl._drawHighlight = function (item)
    {
        var highlightlinestyle = this._highlightlinestyle || "1px solid " + this._chart._highlightcolorset[0],
			highlightfillstyle = this._highlightfillstyle,
			highlightopacity = this.highlightopacity,
			slice,
			highlightPathData,
			highlightGroup = this._chart._highlightGroup;

        if (item)
        {
            highlightPathData = item._pathdata;
            if (highlightPathData)
            {
                slice = new nexacro.ChartGraphicsPath();
                slice.setPathData(highlightPathData);
                slice.set_id("SeriesHighlightRoseItem");
				slice.set_strokepen(highlightlinestyle);
				if(highlightfillstyle)
				{
					if(highlightfillstyle instanceof Array) 
					{
						var fillstyle_sv = highlightfillstyle[item.index%highlightfillstyle.length];
						slice.set_fillstyle(fillstyle_sv);
					}
					else
					{
						slice.set_fillstyle(highlightfillstyle);
					}
				}

                slice.set_strokejoin("round");
                if(highlightopacity) slice.set_opacity(highlightopacity);
				slice.set_strokepen(highlightlinestyle);

                highlightGroup.addChild(slice);

                item._highlight = slice;
                slice._item = item;
                slice._series = this;
            }
        }
    };	

	_pChartRoseSeriesControl._showRoseHighlight = function (item)
    {
		if (!this.highlightvisible)
        {
            return;
        }
		if (!item || (item.id.search("RoseItem") < 0)) return;
        var highlight = item._highlight;
        if (!highlight)
        {
            this._drawHighlight(item);
           
			this._chart._chageGroupObject(this._chart._seriesGroup,this._chart._highlightGroup,this._itemtextlist ,false);
			this._chart._graphicsControl.draw();
        }	
	};
	
	_pChartRoseSeriesControl._hideRoseHighlight = function (item)
    {
		if (!this.highlightvisible)
        {
            return;
        }
        var highlight = item._highlight;
        if (highlight && !nexacro._ChartGraphicsLib.isEmpty(highlight.parent))
        {
			this._chart._chageGroupObject(this._chart._seriesGroup,this._chart._highlightGroup,this._itemtextlist ,true);
            this._chart._highlightGroup.removeChild(highlight);
			highlight.destroy();
            delete item._highlight;
			
            this._chart._graphicsControl.draw();
        }
	};

    _pChartRoseSeriesControl._drawRose = function (datapoints, xoffset, yoffset, categoryaxis, valueaxis)
    {
        var points = datapoints.points.slice(0),
			ps = datapoints.pointsize,
			path,
			effect = this._chart_aniframe_obj,
			seriesid,
			seriesGroup = this._chart._seriesGroup;

		xoffset += -this._chart._boardRectLeft;
		yoffset += -this._chart._boardRectTop;  
		
		var centerX = this._chart._centerLeft,
			centerY = this._chart._centerTop;
		
		centerX += xoffset;
		centerY += yoffset;
		
		if(points.length <= 0)return;

		if(effect && effect.isloadanimation)
		{
			points = this._getanimationdrawvalue(points);
		} else {
		}

		var index = -1;
		var pathData, la, p0, p1, p2, p3, range;
		var angleitem;
		var valueaxis = this._chart.valueaxes[0];
		var preSeries, preDatapoint, prePoints, innerw;
		if(this._configIndex > 0)
		{
			preSeries = this._chart.seriesset[this._configIndex-1];
			preDatapoint = preSeries._datapoints;
			prePoints = preDatapoint.points.slice(0);
			
			if(effect && effect.isloadanimation)
				prePoints = this._getanimationdrawvalue(prePoints);			
		}
		var startangle, endangle;
		var fillstyle = this._fillstyle;
		var linestyle = this._linestyle;
		var opacity = this.roseopacity;
        for (var i = 0; i < points.length; i += ps)
        {
			var x1, y1, x2, y2;
			index++;
			
			if(!points[i + 1]) continue;	// value

			seriesId = this._configIndex + " SeriesRoseItem_" + index;
			path = seriesGroup.getObjectByID(seriesId);
			if(!path)
			{
				path = new nexacro.ChartGraphicsPaths();
				path.set_id(seriesId);
				seriesGroup.addChild(path);
			}
			angleitem = points[i + 2];
			startangle = angleitem.startanglerose;
			endangle = angleitem.endanglerose;
			if(preSeries)
			{
				range = valueaxis.p2range(points[i + 1] + prePoints[i + 1], index, effect);
			}
			else
			{
				range = valueaxis.p2range(points[i + 1], index, effect);
			}
			
			p0 = (Math.sin(startangle) * range + centerX) + " " + (-Math.cos(startangle) * range + centerY);
			p1 = (Math.sin(endangle) * range + centerX) + " " + (-Math.cos(endangle) * range + centerY);
			if(preSeries)
			{
				la = " 0";
				pathData = "M" + p0 + " A" + range + " " + range+ " 1" + la + " 1 " + p1;

				innerw = valueaxis.p2range(prePoints[i + 1], index, effect);

				p2 = (Math.sin(startangle) * innerw + centerX) + " " + (-Math.cos(startangle) * innerw + centerY);
				p3 = (Math.sin(endangle) * innerw + centerX) + " " + (-Math.cos(endangle) * innerw + centerY);

				pathData += " L" + p3 + " A" + innerw + " " + innerw + " 1" + la + " 0 " + p2 + " Z";
			}
			else
			{
				la = " 0";
				pathData = "M" + p0 + " A" + range + " " + range + " 0" + la + " 1 " + p1 + " L" + centerX + " " + centerY + " Z";
			}
			
			path.setPathData(pathData);
			
			if(fillstyle instanceof Array) 
			{
				var fillstyle_sv = fillstyle[index%fillstyle.length];
				path.set_fillstyle(fillstyle_sv);
			}
			else
			{
				if(fillstyle)
				{
					path.set_fillstyle(fillstyle);
				}
				else
				{
					path.set_fillstyle(nexacro._ChartColorset.color20[this._configIndex]);
				}
			}
			if(linestyle && linestyle != "") path.set_strokepen(linestyle);
			if(opacity !== null && opacity !== undefined && opacity !== "") path.set_opacity(opacity);

			path.set_strokejoin("round");
			path._pathdata = pathData;
            path._series = this;
            path.index = index;
            path.value = points[i + 1];
			
			this._itemCnt++;		
		}

        return path;
    };

    _pChartRoseSeriesControl._drawRoseItemText = function (datapoints, axisx, axisy, item)
    {
        var points = datapoints.points,
			xoffset = 0,
			yoffset = 0,
			ps = datapoints.pointsize;
        var itemtextPosition = this.lineitemtextposition,
            itemtextGap = this.lineitemtextgap;
		var rotateaxis = this._chart.rotateaxis;
		
		xoffset += -this._chart._boardRectLeft;
		yoffset += -this._chart._boardRectTop;

        function positionlefttop(itemText,cx,cy,itemtextGap,width)
        {
			// xy
			 itemText.set_verticalAlign("bottom");
             itemText.set_textAlign("right");
			 var textLeft = cx;
             var textTop = cy - (width / 2);
			 if(!itemtextGap)itemtextGap = 0;

			 itemText.set_x(textLeft - itemtextGap);
             itemText.set_y(textTop - itemtextGap);
			
		}
		function positioncentertop(itemText,cx,cy,itemtextGap,width)
        {
			// y
			 itemText.set_verticalAlign("bottom");
             itemText.set_textAlign("center");
			 var textLeft = cx;
             var textTop = cy - (width / 2);
			 if(!itemtextGap)itemtextGap = 0;

			 itemText.set_x(textLeft);
             itemText.set_y(textTop - itemtextGap);
		}
		function positionrighttop(itemText,cx,cy,itemtextGap,width)
        {
			//xy
			itemText.set_verticalAlign("bottom");
            itemText.set_textAlign("left");
			var textLeft = cx;
            var textTop = cy - (width / 2);
			if(!itemtextGap)itemtextGap = 0;

			itemText.set_x(textLeft + itemtextGap);
            itemText.set_y(textTop - itemtextGap);
		}
		function positionleftmiddle(itemText,cx,cy,itemtextGap,width)
        {
			//x
			itemText.set_verticalAlign("middle");
            itemText.set_textAlign("right");
			var textLeft = cx;
            var textTop = cy - (width / 2);
			if(!itemtextGap)itemtextGap = 0;

			itemText.set_x(textLeft - itemtextGap);
            itemText.set_y(textTop);
		}
		function positioncentermiddle(itemText,cx,cy,itemtextGap,width)
        {
			//y
			itemText.set_verticalAlign("middle");
            itemText.set_textAlign("center");
			var textLeft = cx;
            var textTop = cy - (width / 2);
			if(!itemtextGap)itemtextGap = 0;
			itemText.set_x(textLeft);
            itemText.set_y(textTop- itemtextGap);
		}
		function positionrightmiddle(itemText,cx,cy,itemtextGap,width)
        {
			//x
			itemText.set_verticalAlign("middle");
            itemText.set_textAlign("left");
			var textLeft = cx;
            var textTop = cy - (width / 2);
			if(!itemtextGap)itemtextGap = 0;
			itemText.set_x(textLeft + itemtextGap);
            itemText.set_y(textTop);

		}
		function positionleftbottom(itemText,cx,cy,itemtextGap,width)
        {
			//xy
			itemText.set_verticalAlign("top");
            itemText.set_textAlign("right");
			var textLeft = cx;
            var textTop = cy - (width / 2);
			if(!itemtextGap)itemtextGap = 0;
			itemText.set_x(textLeft - itemtextGap);
            itemText.set_y(textTop + itemtextGap);
		}
		function positioncenterbottom(itemText,cx,cy,itemtextGap,width)
        {
			//y
			itemText.set_verticalAlign("top");
            itemText.set_textAlign("center");
			var textLeft = cx;
            var textTop = cy - (width / 2);
			if(!itemtextGap)itemtextGap = 0;
			itemText.set_x(textLeft);
            itemText.set_y(textTop + itemtextGap);
		}
		function positionrightbottom(itemText,cx,cy,itemtextGap,width)
        {
			//xy
			itemText.set_verticalAlign("top");
            itemText.set_textAlign("left");
			var textLeft = cx;
            var textTop = cy - (width / 2);
			if(!itemtextGap)itemtextGap = 0;
			itemText.set_x(textLeft + itemtextGap);
            itemText.set_y(textTop + itemtextGap);
		}
		
		var valueaxis = this._chart.valueaxes[0];
		var preSeries, preDatapoint, prePoints, innerw;
		if(this._configIndex > 0)
		{
			preSeries = this._chart.seriesset[this._configIndex-1];
			preDatapoint = preSeries._datapoints;
			prePoints = preDatapoint.points.slice(0);
		}
		var startangle, endangle;
        for (var i = 0; i < points.length; i += ps)
        {
            var itemindex = points[i],
			preitemindex = points[i + ps],
			value = points[i + 1],
			point = [],
			linetype = this.linetype,
			itemText;
			
			item.index = itemindex;
			item.value = value;
			
            itemText = this._createSeriesItemText(item);
            if (!nexacro._isNull(itemText))
            {
                var textRect = null,
				textWidth = 0,
				textHeight = 0,
				textLeft = 0,
				textTop = 0,
				cx = 0, cy = 0,
				width = this._lineborderwidth,
				seriesGroup = this._chart._seriesGroup;
				
				if(preSeries)
				{
					cx = axisx.p2chalf(itemindex, value + prePoints[i + 1]) + xoffset;
					cy = axisy.p2chalf(value + prePoints[i + 1], itemindex) + yoffset;
				}
				else
				{
					cx = axisx.p2chalf(itemindex, value) + xoffset;
					cy = axisy.p2chalf(value, itemindex) + yoffset;
				}
               
				if (itemtextPosition)
				{
					 switch(itemtextPosition)
						{
						case "lefttop":
							positionlefttop(itemText,cx,cy,itemtextGap,width);
						break;
                    
						case "centertop":
							positioncentertop(itemText,cx,cy,itemtextGap,width);
						break;
                    
						case "righttop":
							positionrighttop(itemText,cx,cy,itemtextGap,width);
						break;
                    
						case "leftmiddle":
							positionleftmiddle(itemText,cx,cy,itemtextGap,width);
						break;

						case "centermiddle":
							positioncentermiddle(itemText,cx,cy,itemtextGap,width);
						break;
                    
						case "rightmiddle":
							positionrightmiddle(itemText,cx,cy,itemtextGap,width);
						break;
                    
						case "leftbottom":
							positionleftbottom(itemText,cx,cy,itemtextGap,width);
						break;
                    
						case "centerbottom":
							positioncenterbottom(itemText,cx,cy,itemtextGap,width);
						break;
                    
						case "rightbottom":
							positionrightbottom(itemText,cx,cy,itemtextGap,width);
						break;
                    
						default:
							 positioncentermiddle(itemText,cx,cy,itemtextGap,width);
						break;
        			} // switch
				}
				else
				{
					positioncentermiddle(itemText,cx,cy,itemtextGap,width);
				}
				this._chart._setChangeInBoardAreaPos(itemText);
				
                seriesGroup.addChild(itemText);
                itemText._series = this;
                this._itemCnt++;
                this._seriesitems[itemindex] = itemText;
            }
        }
		
    };
    _pChartRoseSeriesControl._setItemData = function ()
    {
        var data = this._data,
			itemdata;

        if (data)
        {
            itemdata = this._processItemData(data);
        }
        return itemdata;
    };

    _pChartRoseSeriesControl._setItemColor = function (items)
    {
        var colorcnt = 0;
        var colorset = this._chart._colorset;
        var item;

        for (var i = 0; i < items.length; i++)
        {
            item = items[i];
            if (item._isShow && item.value)
            {
                var itemColor = colorset[colorcnt];
                if (itemColor)
                {
                    colorcnt++;
                }
                else
                {
                    colorcnt = 0;
                }

                if (colorcnt == 0)
                {
                    itemColor = colorset[colorcnt];
                    colorcnt++;
                }

                items[i].color = itemColor;
                var slice = items[i]._slice;
                if (slice)
                {
                    slice.set_fillstyle(itemColor);
                }
            }
        }
    };
	
    _pChartRoseSeriesControl._processItemData = function (data)
    {
        var length = data.length,
            slice = [],
            i = 0,
			total = 0;

		if(length <= 2)return slice;
        for (i = 0; i < length; i++)
        {
            var angleItems = {};
            if (data[i] != null && data[i][0] != undefined)
            {
                

                angleItems.index = i;
                slice.push(angleItems);

            }
        }

        var items = slice;
		var checkangleval = 10;
        for (i = 0; i < items.length; ++i)
        {
            total += checkangleval;
        }
		var startangle = 0;
		var percent = 0;
		var angle = 0;
		var endangle = Math.PI * 2;
		angle = checkangleval * endangle / total;
		percent = (checkangleval / (total / 100)).toFixed(2);
		
		var angle_ea = angle;
		var rosesize = this._chart.rosesize * 0.01;
		if(rosesize < 1)
		{
			angle_ea = angle * ((1 - rosesize)/2);	// hsji
		}
        for (i = 0; i < items.length; ++i)
        {
			items[i].startangle = 0;
            items[i].angle = angle;
			items[i].startangle = startangle;	// hsji
			items[i].startanglerose = (startangle + angle_ea);	
			startangle += angle;
			items[i].endangle  = startangle;
			items[i].endanglerose = (startangle - angle_ea);
			items[i].halfangle = items[i].startangle + ((items[i].endangle - items[i].startangle)/2);
            items[i].percent = nexacro.toNumber(percent);
        }

		return items;
    };


	_pChartRoseSeriesControl._afterSetProperties = function ()
    {
        // TODO
        var legend = this._chart.legend;
        if (legend)
        {
            this._chart._applyLegendItem();
        }
    };
	_pChartRoseSeriesControl._setColor = function (colorset)
    {
        this._color = colorset;
        this._changedSeriesColor = true;

        var changedColorset = this._chart._changedColorset;
        var width,
        style,
        color;
        if (changedColorset)
        {
			var linevisible = this._linestyle,
			linestyle;
			
			if (this.fillstyle)
			{
				this.set_fillstyle(this.fillstyle);
			}
			else
			{
				this.set_fillstyle(colorset);
				//this._applyPropertySeries("Rose", "fillstyle", colorset);
			}			
       }
    };
	// 재정의 : 기본값 처리 
	_pChartRoseSeriesControl.on_apply_itemtextfont = function (itemtextfont)
    {
        if (this._is_initprop)
            return;

        var chart = this._chart,
			seriesGroup = chart._seriesGroup,
			items = this._seriesitems;

        if (seriesGroup && this._itemCnt > 0)
        {
            var length = items.length,
				item;
            for (var i = 0; i < length; i++)
            {
                var itemID = this._configIndex + " SeriesItemText_" + i;
                item = seriesGroup.getObjectByID(itemID);
                if (item)
                {
                    item.set_font(itemtextfont ? itemtextfont.value || itemtextfont : "6pt Verdana");
                }
            }
        }
    };
}
