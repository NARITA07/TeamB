
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
if (!nexacro.GaugeChart)
{
    //==============================================================================
    // nexacro.GaugeChartEventInfo
    //==============================================================================


    //==============================================================================
    // nexacro.GaugeChart
    //==============================================================================
    nexacro.GaugeChart = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
    {
        nexacro._ChartBase.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

        this.categorycolumn = new nexacro.BindableValue("");
        this.valueaxes = []; 
        this.indicator = null;
    };

    var _pGaugeChart = nexacro._createPrototype(nexacro._ChartBase, nexacro.GaugeChart);
    nexacro.GaugeChart.prototype = _pGaugeChart;
    _pGaugeChart._type_name = "GaugeChart";

    /* control */

    /* default properties */
    _pGaugeChart.categorycolumn = "";
    _pGaugeChart.gaugetype = "vertical";
    _pGaugeChart.valueaxes = null; // readonly
    _pGaugeChart.indicator = null;

    /* internal variable */
    _pGaugeChart._boardWidth = 0;
    _pGaugeChart._boardHeight = 0;
    _pGaugeChart._centerLeft = 0;
    _pGaugeChart._centerTop = 0;
    _pGaugeChart._barWidth = 0;
    _pGaugeChart._gaugeradius = 0;
    _pGaugeChart._gaugeinnerradius = 0;
    _pGaugeChart.indicator = null;

    _pGaugeChart._invalidcategorycolumn = false;
	
    /* status */

    /* event list */

    //===============================================================
    // nexacro.GaugeChart : Create & Update
    //===============================================================
    _pGaugeChart.on_create_contents = function ()
    {
        var control = this.getElement();
             
        if (control)
        {
            nexacro._ChartBase.prototype.on_create_contents.call(this);
        }
    };

    _pGaugeChart.on_destroy_contents = function ()
    {
        this.categorycolumn = null;
        this.gaugetype = null;
        this.valueaxes = null;

        this._boardWidth = null;
        this._boardHeight = null;
        this._centerLeft = null;
        this._centerTop = null;
        this._barWidth = null;
        this._gaugeradius = null;
        this._gaugeinnerradius = null;
        this.indicator = null;

        this._invalidcategorycolumn = null;
		
        nexacro._ChartBase.prototype.on_destroy_contents.call(this);

        return true;
    };

    //===============================================================
    // nexacro.GaugeChart : Properties
    //===============================================================
    _pGaugeChart.set_valueaxes = function () { };

    _pGaugeChart.set_gaugetype = function (val)
    {
        var type_enum = ["circular", "vertical", "horizontal"];
        if (type_enum.indexOf(val) == -1)
        {
            return;
        }

        if (this.gaugetype != val)
        {
            this.gaugetype = val;
            this.on_apply_gaugetype();
            this._draw();
        }
    };

    _pGaugeChart.on_apply_gaugetype = function (type)
    {
        this._changedData = true;
        if (this.valueaxes && this.valueaxes[0])
            this.valueaxes[0].on_apply_opposite(this.valueaxes[0].opposite);
    };

    _pGaugeChart.set_categorycolumn = function (v)
    {
        if (this.categorycolumn._value != v)
        {
            this.categorycolumn._set(v);
            this.on_apply_categorycolumn();
        }

        this._draw();
    };

    _pGaugeChart.on_apply_categorycolumn = function ()
    {
        this.on_apply_binddataset();
    };


    _pGaugeChart.showSeries = function (id)
    {
        var s = this.getSeriesByID(id);
        if (s)
        {
            var visible = s._orgVisible;
            s._orgVisible = undefined;
            if (visible)
            {
                s.set_visible(true);
            }
        }
    };

    _pGaugeChart.hideSeries = function (id)
    {
        var s = this.getSeriesByID(id);
        if (s)
        {
            if (s._orgVisible === undefined || s._orgVisible === null)
                s._orgVisible = s.visible;
            s.set_visible(false);
        }
    };

    _pGaugeChart.showIndicator = function ()
    {
        if (this.indicator)
        {
            this.indicator.set_visible(true);
        }
        this._draw();
    };

    _pGaugeChart.hideIndicator = function ()
    {
        if (this.indicator)
        {
            this.indicator.set_visible(false);
        }
        this._draw();
    };

    _pGaugeChart.getValueaxisByID = function (id)
    {
        var index = nexacro._ChartGraphicsLibArray.indexOfProp(this.valueaxes, "id", id);
        if (index > -1)
        {
            return this.valueaxes[index];
        }
        return null;
    };

    _pGaugeChart.showValueaxis = function (id)
    {
        var axis = this.getValueaxisByID(id);

        if (axis != this.valueaxes[0])
            return;

        if (axis)
        {
            axis.set_visible(true);
        }

        this._draw();
    };

    _pGaugeChart.hideValueaxis = function (id)
    {
        var axis = this.getValueaxisByID(id);

        if (axis != this.valueaxes[0])
            return;

        if (axis)
        {
            axis.set_visible(false);
        }

        this._draw();
    };

    //===============================================================
    // nexacro.GaugeChart : Events
    //===============================================================


    //===============================================================
    // nexacro.GaugeChart : Logical part
    //===============================================================	
    _pGaugeChart._destroySubControl = function ()
    {
        nexacro._ChartBase.prototype._destroySubControl.call(this);

        if (this.valueaxes && this.valueaxes.length > 0)
            this.deleteAllValueaxes();

        if (this.indicator)
        {
            this.indicator.destroy();
            this.indicator = null;
        }
    };

    _pGaugeChart.deleteAllValueaxes = function ()
    {
        var length = this.valueaxes.length,
        valueaxis;

        for (var i = 0; i < length; i++)
        {
            var index = length - i - 1;
            valueaxis = this.valueaxes[index];

            if (valueaxis)
            {
                this.deleteValueaxis(valueaxis.id);
            }
        }

        if (length > 0)
        {
            this._rearrange = true;
        }

        this._draw();

        return length;
    };

    _pGaugeChart.deleteValueaxis = function (val)
    {
        var ret = false;

        if (typeof (val) == "string")
        {
            var axis = this.getValueaxisByID(val);
            if (axis)
            {
                var index = nexacro._ChartGraphicsLibArray.indexOf(this.valueaxes, axis);
                if (index > -1)
                {
                    this._deleteAxis(axis, index);
                    ret = true;
                }
            }
        }

        if (ret)
        {
            this._changedData = true;
        }

        this._draw();

		return ret;
    };


    _pGaugeChart._measure = function ()
    {
        nexacro._ChartBase.prototype._measure.call(this);
  
        if (this._recreate)
        {
            this._initAxes();
            this._setDatapointFormat();
            this._setDatapoint();
            this._setDataMinMax();
            this._resetAxes();
        }
  
        this._setAxes();
    };
      
    _pGaugeChart._initAxes = function ()
    {
        var axis = this.valueaxes[0];
        if(axis)
        {
            axis._initData();
        }
    };

    _pGaugeChart._resetAxes = function ()
    {
        var axis = this.valueaxes[0];
        if(axis)
        {
            axis._resetData();
        }
    };

    _pGaugeChart._setDatapointFormat = function ()
    {
        var series = this.seriesset;
        var s;
        for (var i = 0; i < series.length; i++)
        {
            s = series[i];
            if (s)
            {
                if (nexacro._isNull(s._data))
                {
                    break;
                }

                this._initSeriesDatapoints(s);
                this._setSeriesDatapointsFormat(s);
            }
        }
		
        this._getVisibleSeries();
    };

    _pGaugeChart._getVisibleSeries = function ()
    {
        var length = this.seriesset.length,
			visible = false,
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
               
                visible = series.visible;
                if (visible)
                {
                    visibleSeriesset.push(series);
                }
            }
        }
		
        this._visibleSeriesset = visibleSeriesset;
    };

    _pGaugeChart._setDatapoint = function ()
    {
        var seriesset = this.seriesset,
           s, valueaxis;

        for (var i = 0; i < seriesset.length; i++)
        {
            s = seriesset[i];
            if (s)
            {
                var data = s._data;
                if (nexacro._isNull(data))
                {
                    break;
                }

                if (s._datapoints.pointsize != null)
                {
                    continue;
                }

                if (!s._datapoints.format)
                {
                    continue;
                }       

                this._setSeriesDatapoints(s); 

                valueaxis = s.axis;
                if (s.visible)
                    valueaxis._used = true;
            }
        }
    };

    // datapoints 구성
    _pGaugeChart._setSeriesDatapoints = function (series)
    {
        var datapoints,
			format,
			pointsize,
			points,
			data,
			p, val, f;

        datapoints = series._datapoints;
        format = datapoints.format;
        datapoints.pointsize = format.length;
        pointsize = datapoints.pointsize;
        points = datapoints.points;   
        data = series._data;

        var i = 0,
            j = 0;
        //for (i = j = 0; i < 1; i++, j += pointsize) // 단일 시리즈만 처리함. data.length
        i = this._rowposition;
        {
            p = data[i];

            var nullify = p == null;
            if (!nullify)
            {
                for (var k = 0; k < pointsize; k++)
                {
                    val = p[k];
					
                    f = format[k];
                    if (f)
                    {
                        if (f.category == false && val != null)
                        {
                            val = +val;
                            if (isNaN(val))
                            {
                                val = null;
								
                            }
                            else if (val == Infinity)
                            {
                                val = Number.MAX_VALUE;
                            }
                            else if (val == -Infinity)
                            {
                                val = -Number.MAX_VALUE;
                            }
                        }
                        if (val == null && p.length > k)
                        {
                            if (f.defaultValue != null)
                            {
                                val = f.defaultValue;  // 대체 prop처리 
                            }
                            else
                                val = null;
                        }
                    }

                    points[j + k] = val;
                }
            }
        }
    };

    // datapoint 초기화
    _pGaugeChart._initSeriesDatapoints = function (series)
    {
        series._datapoints = {
            points: []
        };
    };

    // datapoint format 정보 설정
    _pGaugeChart._setSeriesDatapointsFormat = function (series)
    {
        var format = series._datapoints.format;
        
        if (!format)
        {
            format = [];
            format.push(
			{
			    x: true,
			    category: false,
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
                format.push(
				{
				    category: false,
				    required: true,
				});
            }

            series._datapoints.format = format;
        }
    };

    _pGaugeChart._setDataMinMax = function ()
    {
        // datamin, datamax 설정
        var series = this.seriesset;
        for (var i = 0; i < series.length; i++)
        {
            var s = series[i],
				data;

            if (s)
            {
                data = s._data;
                if (nexacro._isNull(data))
                {
                    s._redrawSeries = false;
                    break;
                }
                this._setSeriesDataMinMax(s);
            }
        }
    };

    // datamin, datamax 설정
    _pGaugeChart._setSeriesDataMinMax = function (series)
    {
        var datapoints = series._datapoints,
			min = Number.POSITIVE_INFINITY,
			max = Number.NEGATIVE_INFINITY,
			points,
			pointsize,
			val, f,
            valueaxis = this.valueaxes[0],
			format;

        points = datapoints.points;
        pointsize = datapoints.pointsize;
        format = datapoints.format;

        for (var i = 0; i < points.length; i += pointsize)
        {
            if (points[i] == null)
            {
                continue;
            }

            for (var j = 0; j < pointsize; j++)
            {
                val = points[i + j];
				
                f = format[j];
                if (!f || val == Number.MAX_VALUE || val == -Number.MAX_VALUE)
                {
                    continue;
                }

                if (f.x)
                {
                    if (val < min)
                    {
                        min = val;
                    }
                    if (val > max)
                    {
                        max = val;
                    }
                }
                if (f.y)
                {
                    if (val < min)
                    {
                        min = val;
                    }
                    if (val > max)
                    {
                        max = val;
                    }
                }
            }
        }
        
        if (valueaxis)
        {
            val = points[1];
            if (valueaxis._tickmin /*&&xaxis._tickmin < xmin*/)
            {
                min = valueaxis._tickmin;
            }
            else
            {
                if (val > 0)
                {
                    min = 0;
                }
                else if (val < 0)
                {
                    min = val;
                }
            }

            if (valueaxis._tickmax /*&&xaxis._tickmax > xmax*/)
            {
                max = valueaxis._tickmax;
            }
            else
            {
                if (val > 0)
                {
                    max = val;
                }
                else if (val < 0)
                {
                    max = 0;
                }
            }
        
            // datamin/max, rulermain/max 설정
            if (valueaxis._updateMinMax)
            {
                valueaxis._updateMinMax(min, max);
            }
        }
    };

    _pGaugeChart._setAxes = function ()
    {
        var valueaxis    = this.valueaxes[0],
			clientWidth  = this._getClientWidth(),
            clientHeight = this._getClientHeight(),
            changedData  = this._changedData;
		
        if (valueaxis)
        {
            if (!valueaxis._used)
            {
                return;
            }

            if (changedData)
            {
                valueaxis._changedTicks = true;
            }
        
            valueaxis._setData(clientWidth, clientHeight);

            if (this._reset == true)
            {
                this._reset = false;
            }
        }
    };

    _pGaugeChart._arrange = function ()
    {
        nexacro._ChartBase.prototype._arrange.call(this);
   
        if (this._rearrange)
        {
            this._arrangeBoard();
        }
   
        this._arrangeAxes();
           
        var s = this.seriesset[0];
        if(s)
        {
            s._rearrangeProcessItemData();
        }
   
        this._arrangeSeries();
    };

    _pGaugeChart._arrangeAxesRect = function ()
    {
        var valueaxis = this.valueaxes;
        var axes = valueaxis;

        if (axes)
        {
            var boardRect = this._boardRect,
				axis,
				axisRect,
				axisRectLeft = 0,
				axisRectTop = 0,
				gap = 0;
			
            for (var i = axes.length - 1; i >= 0; --i)
            {
                axis = axes[i];
                if (axis)
                {
                    if (!axis._used)
                    {
                        axis.on_apply_visible(false);
                        axis.on_apply_boardlinevisible(false);
                        continue;
                    }

                    axisRect = axis._axisRect._getRect(false, true);
                    gap = axis.gap || 0;

                    if (axis._direction == "x")
                    {
                        if (axis._location == "top")
                        {
                            axisRectTop = boardRect.top;
                            boardRect.set_top(boardRect.top + axisRect.height + gap);
                            boardRect.set_height(boardRect.height - gap - axisRect.height);
                        }
                        else
                        {
                            boardRect.set_top(boardRect.top);
                            boardRect.set_height(boardRect.height - gap - axisRect.height);
                            axisRectTop = boardRect.bottom + gap;
                        }

                        axis._axisRect.set_y(axisRectTop);
                    }
                    else
                    {
                        if (axis._location == "left")
                        {
                            axisRectLeft = boardRect.left;
                            boardRect.set_left(boardRect.left + axisRect.width + gap);
                            boardRect.set_width(boardRect.width - gap - axisRect.width);
                        }
                        else
                        {
                            boardRect.set_left(boardRect.left);
                            boardRect.set_width(boardRect.width - gap - axisRect.width);
                            axisRectLeft = boardRect.left + boardRect.width + gap;
                        }
                        axis._axisRect.set_x(axisRectLeft);
                    }
                }
            }
        }
    };

    _pGaugeChart._arrangeAxes = function ()
    {
        if (this.valueaxes[0])
        {
			var boardRect = this._boardRect,
			    boardBorderSize = this._boardBorderSize,
			    boardBorderWidth = this._boardBorderWidth,
			    boardBorderHeight = this._boardBorderHeight,
			    boardspacing = this._boardspacing || this._nullspacing,
			    left = 0, top = 0, width = 0, height = 0,
			    rearrange = this._rearrange,
                valueaxis = this.valueaxes[0],
                axissize = valueaxis._axissize,
                axisLine = valueaxis._axisLine,
			    axislinestyle = valueaxis._axislinestyle,
			    axislinewidth = 0;

            if (axisLine)
            {
                axislinewidth = axislinestyle ? axislinestyle._getBorderLeftWidth() : 0;
                axislinewidth *= 0.5;
            }

            var tickendspace = 0;
            if (valueaxis)
            {
                tickendspace = valueaxis._tickendspace;
            }

            if (this.gaugetype == "circular")    
            {
                if (rearrange || valueaxis._rearrange || valueaxis._rearrangeTitle)
                {
                    left = this._boardRectLeft;
				    top = this._boardRectTop;
				    width = this._boardWidth; 
				    height = this._boardHeight; 
				    valueaxis._processItemData(valueaxis._ticks);
                    valueaxis._arrange(left, top, width, height);
                }
            }
            else
            {
                var rotateaxis = this.gaugetype == "horizontal" ? true : false;
        
                if (!rotateaxis)
                {
                    left = boardRect.left + boardBorderSize.left + boardspacing.left + valueaxis._tickstartgap;
                    width = axislinewidth;
                    top = boardRect.top + boardBorderSize.top + boardspacing.top;
                    height = boardRect.height - boardBorderHeight;
                }
                else
                {
                    left = boardRect.left + boardBorderSize.left + boardspacing.left;
                    width = boardRect.width - boardBorderWidth;
                    top = boardRect.top + boardBorderSize.top + boardspacing.top + valueaxis._tickstartgap;
                    height = axislinewidth;
                }

                if (rearrange)
                {
                    if (valueaxis._direction == "y")
                    {
                        width = width - tickendspace;
                        valueaxis._axisRect.set_x(left);
                        valueaxis._axisRect.set_width(width);
                        valueaxis._axisRect.set_y(top);
                        valueaxis._axisRect.set_height(height);
                    }
                    else if (valueaxis._direction == "x")
                    {
                        top = top + tickendspace;
                        height = height - tickendspace;
                        valueaxis._axisRect.set_x(left);
                        valueaxis._axisRect.set_height(height);
                        valueaxis._axisRect.set_y(top);
                        valueaxis._axisRect.set_width(width);
                    }

                    valueaxis._setTransformationHelpers(width, height);
                }

                if (rearrange || valueaxis._rearrange)
                {
                    if (axissize)
                    {
                        axissize.x = left;
                        axissize.y = top;
                        axissize.width = width;
                        axissize.height = height;
                    }
                    valueaxis._arrange(left, top, width, height);
                }
            }
        }
    };

    _pGaugeChart._arrangeSeries = function ()
    {
        var seriesset = this.seriesset;
		var useanimation = false;
		var starttimestamp = null;
        var loadanimation = false;
        if (seriesset)
        {
            var seriesLength = seriesset.length,
			rearrange = this._rearrange,
			recreate = this._recreate;
			if (rearrange || recreate)
            {
				if (this.contents != null)
					this._setSeriesGroup();
            }
            if (seriesLength > 0)
            {
                if (!nexacro._isNull(this._seriesGroup))
                {
                    if (rearrange)
                    {
                        this._seriesGroup.setTransform("translate(" + this._boardRectLeft + "," + this._boardRectTop + ")");
                        this._highlightGroup.setTransform("translate(" + this._boardRectLeft + "," + this._boardRectTop + ")");
                        
                        var axis = this.valueaxes[0];
                        if (axis)
                        {
                            var axissize = axis._axissize;
                            var location = axis._location;
                            var top = this._boardRectTop;
                            var left = this._boardRectLeft;
                            var gap = axis.gap ? axis.gap : 0;
                            var boardhalfwidth = 0;
                            var barwidth = 0;

                            if (location == "top")
                            {
                                boardhalfwidth = this._boardRect.height / 2;
                                barwidth = this._barWidth = boardhalfwidth - axissize.height;
                                top = boardhalfwidth - ((barwidth + axissize.height) / 2);
                                top += (axissize.height - gap);
                                top -= 3; // here
                                left = 0;
                            }
                            else if (location == "bottom")
                            {
                                boardhalfwidth = this._boardRect.height / 2;
                                barwidth = this._barWidth = boardhalfwidth - axissize.height;
                                top = boardhalfwidth - ((barwidth + axissize.height) / 2);
                                top += (barwidth + gap);
                                left = 0;
                            }
                            else if (location == "left")
                            {
                                top = 0;
                                boardhalfwidth = this._boardRect.width / 2;
                                barwidth = this._barWidth = boardhalfwidth - axissize.width;
                                left = boardhalfwidth - ((barwidth + axissize.width) / 2);
                                left += (axissize.width - gap - 3);
                            }
                            else if (location == "right")
                            {
                                top = 0;
                                boardhalfwidth = this._boardRect.width / 2;
                                barwidth = this._barWidth = boardhalfwidth - axissize.width;
                                left = boardhalfwidth - ((barwidth + axissize.width) / 2);
                                left += (barwidth + gap + 1);
                            }
                            else // location == "outside" || location == "indide"
                            {
                                top -= this._boardRectTop;
                                left -= this._boardRectLeft;
                            }
                        
                            axis._group.setTransform("translate(" + left + "," + top + ")");
                        }
                    }
                }
            }

			if((this._runanimation || (this.enableanimation && (rearrange || recreate))) && !this._ani_exception
			&& !nexacro.isDesignMode && !this._iscontents_editor)
			{
				// Animation 진입
				if(this._loadanimation == true)
				{
					useanimation = true;
					starttimestamp = + new Date();
				}
			}
            var i;
            var series;
            var effect;

            for (i = 0; i < seriesLength; i++)
            {
                series = seriesset[i];
                if (series)
                {
                    var redrawSeries = series._redrawSeries;
                    if (rearrange || recreate)
                    {
                        redrawSeries = true;
						
                    }
					if(useanimation && series._chart_aniframe_obj)
					{
						// effect관련 추가 기능 이후 변경
						effect = series._chart_aniframe_obj;
						effect.enableanimation = useanimation;
						effect.starttime = starttimestamp;
					}
					series._draw(redrawSeries);
                }
            }
            for (i = 0; i < seriesLength; i++)
            {
                series = seriesset[i];
                if (series)
                {
                    effect = series._chart_aniframe_obj;
					if(effect.isloadanimation)loadanimation = true;
				}
			}
			if(loadanimation)
				if(!this._isanimationloading)this._isanimationloading = true;
        }
    };

    _pGaugeChart._createSeriesset = function (o, id)
    {
        if (!this._seriesGroup)
        {
            return false;
        }

        var seriesset = this.seriesset,
            series,
            seriesLength = -1;

        if (seriesset)
        {
            seriesLength = seriesset.length;
            if (seriesLength > 0)
            {
                // trace("gauge chart의 경우 gaugeseries하나만 가질 수 있습니다.");
                return;
            }
        }

        var s = seriesset[0],
            seriesId;
        if (s)
        {
            seriesId = s.id;
            if (seriesId == id)
            {
                //trace("이미 id를 가지는 Series가 존재합니다.");
                throw nexacro.MakeNativeError(this, "native_exist_id", seriesId);
                //return;
            }
        }

        series = this._appendSeries(o);
        return series;
    };

    _pGaugeChart._createSeries = function (contents, id)
    {
        var series = new nexacro.ChartGaugeSeriesControl(id, this, this._graphicsControl);
        return series;
    };

    _pGaugeChart._setSeries = function ()
    {
        var colorset = this._colorset;
        var highlightcolorset = this._highlightcolorset;
        var selectcolorset = this._selectcolorset;
        var colorcnt = 0;

        var valueaxis;

        //var series = this.seriesset,
		var items;

        nexacro._ChartGraphicsLibArray.forEach(this.seriesset, function (obj, index)
        {
            if (obj)
            {
                if (this._changedData)
                {
                    obj._setData();

                if (nexacro._isNull(obj._data))
                {
                    return false;
                }

                items = obj._setItemData();
                this._seriesitems = items;
                this._changedColorset = true;
            }

            /*if (this._changedColorset && !obj._changedFillStyle)
                {
                    items = this._seriesitems;
                    if (items)
                    {
                        obj._setItemColor(items);
                    }
                    this._changedColorset = false;

                }
                else
                {
                    items = this._seriesitems;
                    if (items)
                    {
                        obj.on_apply_fillstyle();
                    }
                }*/

                if (this._changedColorset || obj._changedSeriesColor)
                {
                    if (nexacro._isString(colorset))
                    {
                        obj._setDefault(colorset);
                    }
                    else
                    {
                        var seriesColor = colorset[colorcnt];
                        var highlightColor = highlightcolorset[colorcnt];
                        var selectColor = selectcolorset[colorcnt];

                        if (seriesColor)
                        {
                            colorcnt++;
                        }
                        else
                        {
                            colorcnt = 0;
                        }

                        if (colorcnt == 0)
                        {
                            seriesColor = colorset[colorcnt];
                            colorcnt++;
                        }

                        obj._setDefault(seriesColor, highlightColor, selectColor);
                    }

                    obj._changedSeriesColor = false;
                }

                valueaxis = this.valueaxes[0];

                if (valueaxis)
                {
                    valueaxis._afterSetProperties();
                    valueaxis.on_apply_visible(valueaxis.visible);
                }

                if (!valueaxis)
                {
                    return false;
                }

                obj.axis = valueaxis;
            }
        }, this);
    };

    _pGaugeChart._getHighlightVisible = function ()
    {
        var series = this.seriesset,
            length = series.length,
            highlightbarvisible = false;

        for (var i = 0; i < length; i++)
        {
            var s = series[i];
            if (s.highlightbarvisible)
            {
                highlightbarvisible = true;
                break;
            }
        }

        return highlightbarvisible;
    };

    _pGaugeChart._showSeriesItem = function (id)
    {
        var s = this.seriesset[0];
        if (s)
        {
            var seriesitems = s._seriesitems,
                length = seriesitems.length;

            for (var i = 0; i < length; i++)
            {
                var item = seriesitems[i],
                    name = item.category;

                if (name == id)
                {
                    item._isShow = true;
                    this._rearrange = true;
                    // this._changedData = true; here
                    if (this.legend)
                    {
                        this._applyLegendItem();
                    }
                }
            }
        }

        this._draw();
    };

    _pGaugeChart._hideSeriesItem = function (id)
    {
        var s = this.seriesset[0];

        if (s)
        {
            var seriesitems = s._seriesitems,
                length = seriesitems.length;

            for (var i = 0; i < length; i++)
            {
                var item = seriesitems[i],
                    name = item.category;

                if (name == id)
                {
                    item._isShow = false;
                    this._rearrange = true;

                    if (this.legend)
                    {
                        this._applyLegendItem();
                    }
                }
            }
        }

        this._draw();
    };

    _pGaugeChart._createValueaxes = function (o, id)
    {
        if (this.valueaxes.length > 0) 
            return null;
        var valueaxis;
        
        valueaxis = new nexacro.ChartGaugeValueAxisControl(id, this, this._graphicsControl);
        valueaxis._type_name = "ChartGaugeValueAxisControl";
        valueaxis._type = "valueAxis";

        var opposite = o.opposite || valueaxis.opposite;
        valueaxis.on_apply_opposite(opposite);

        this.valueaxes.push(valueaxis);

        return valueaxis;
    };

    _pGaugeChart._deleteValueaxes = function ()
    {
        var valueaxis = this.valueaxis;
        if (valueaxis)
        {
            this._deleteAxis(valueaxis);
            this._changedData = true;
        }
    };

    _pGaugeChart._deleteAxis = function (axis, index)
    {

        if (this.valueaxes.length > 0)
        {
			this._deleteContentsProp("valueaxes", index);
            nexacro._ChartGraphicsLibArray.remove(this.valueaxes, axis);
        }

        axis._destroy(false);
    };

    _pGaugeChart._checkcategorycolumn = function ()
    {
        var categorycolumn = this.categorycolumn;
        var bindtype = categorycolumn._bindtype;
        if (bindtype == 0)
        {
            this._invalidcategorycolumn = true;
        }
        else
        {
            categorycolumn = this._getBindableValue("categorycolumn");
            var binddataset = this._binddataset;
            if (binddataset)
            {
                var coltype = binddataset._getColumnType(categorycolumn);
                if (!coltype)
                {
                    this._invalidcategorycolumn = true;
                }
                else
                {
                    this._invalidcategorycolumn = false;
                }
            }
        }
    };

    _pGaugeChart._createIndicator = function (o, id)
    {
        if (!this.indicator)
        {
            this.indicator = new nexacro.ChartGaugeIndicatorControl(id || "ChartGaugeIndicatorControl", this, this._graphicsControl);
        }

        return this.indicator;
    };

    _pGaugeChart._GetSeriesItemFromIndex = function (index)
    {
		var s = this.seriesset[0];
        if (s)
        {
            var seriesitems = s._seriesitems,
				length = seriesitems.length;

            for (var i = 0; i < length; i++)
            {
                var item = seriesitems[i];
					//name = item.category;

                if (i == index)
                {
                    return item;
                }
            }
        }
	};
	_pGaugeChart._GetSeriesItemIndexFromSlice = function (_slice)
    {
		var s = this.seriesset[0];
        if (s)
        {
            var seriesitems = s._seriesitems,
				length = seriesitems.length;

            for (var i = 0; i < length; i++)
            {
                var item = seriesitems[i];
					//name = item._slice;
				var itemslice = item._slice;
				if(itemslice)
				{
					if (_slice == itemslice )
					{
						return i;
					}
					else if(itemslice.highlightbarvisible == true)
					{
						if(itemslice._highlight)
						{
							if(itemslice._highlight == _slice)
							{
								return i;
							}
						}
					}
					else if(s.valuelineblurangle != undefined && s.valuelineblurangle != null)
					{
						if(item._sliceborder)
						{
							if(item._sliceborder == _slice)
							{
								return i;
							}
						}
					}
				}
            }
        }
    };

    //===============================================================
    // nexacro.GaugeChart : Util Function
    //===============================================================

}


// ChartGaugaSeriesControl
if (!nexacro.ChartGaugeSeriesControl)
{
    nexacro.ChartGaugeSeriesControl = function (id, parent, graphicsControl)
    {
        nexacro._SeriesBase.prototype.constructor.apply(this, arguments);

        this._seriesitems = [];
        this._clickItemIndex = [];
    };

    var _pChartGaugeSeriesControl = nexacro._createPrototype(nexacro._SeriesBase, nexacro.ChartGaugeSeriesControl);
    nexacro.ChartGaugeSeriesControl.prototype = _pChartGaugeSeriesControl;
    _pChartGaugeSeriesControl._type_name = "ChartGaugeSeriesControl";

    /* default properties */
    _pChartGaugeSeriesControl.highlightbarfillstyle = "";
    _pChartGaugeSeriesControl.highlightbarlinestyle = "";
    _pChartGaugeSeriesControl.highlightbaropacity = 1;
    _pChartGaugeSeriesControl.highlightbarvisible = false;
    
    _pChartGaugeSeriesControl.fillstyle = "";
    _pChartGaugeSeriesControl.linestyle = "";
    _pChartGaugeSeriesControl.opacity = 0.5;
    _pChartGaugeSeriesControl.barfillstyle = "";
    _pChartGaugeSeriesControl.barlinestyle = "";
    _pChartGaugeSeriesControl.baropacity = 1;
	
	// 8.27
	_pChartGaugeSeriesControl.boardouterstyle = "";
	_pChartGaugeSeriesControl.boardinnerstyle = "";
	_pChartGaugeSeriesControl.boardouterlinestyle = "";
	_pChartGaugeSeriesControl._boardouterstyle = "";
	_pChartGaugeSeriesControl._boardinnerstyle = "";
	_pChartGaugeSeriesControl._boardouterlinestyle = "";
	_pChartGaugeSeriesControl.userrange = null;
	_pChartGaugeSeriesControl._userrange = null;
	_pChartGaugeSeriesControl.userrangeinnerradius = 80;
	_pChartGaugeSeriesControl.userrangeradius = 95;
	

    _pChartGaugeSeriesControl.selectbarfillstyle = "";
    _pChartGaugeSeriesControl.selectbarlinestyle = "";
    _pChartGaugeSeriesControl.selectbaropacity = 1;
    _pChartGaugeSeriesControl.visible = true;

    /* GaugeChart 용*/
    _pChartGaugeSeriesControl.itemtextposition = "";  //
    _pChartGaugeSeriesControl.itemtextgap = undefined;
    _pChartGaugeSeriesControl.barsize = 80;
    
    _pChartGaugeSeriesControl.radius = undefined;
    _pChartGaugeSeriesControl.innerradius = undefined;
    _pChartGaugeSeriesControl.startangle = undefined;
    _pChartGaugeSeriesControl.endangle   = undefined;

    _pChartGaugeSeriesControl._startangle = 0;
    _pChartGaugeSeriesControl._endangle = 6.28319;

    _pChartGaugeSeriesControl._barsize = 0.8;
    _pChartGaugeSeriesControl._itemtextgap_h = 0;
    _pChartGaugeSeriesControl._itemtextgap_v = 0;
    _pChartGaugeSeriesControl._gaugerect = null;
    _pChartGaugeSeriesControl._radius = 0.8;
    _pChartGaugeSeriesControl._innerradius = 0;
    _pChartGaugeSeriesControl._borderwidth = 1;
    _pChartGaugeSeriesControl._barborderwidth = 1;

    /* internal variable */

    //============================================================
    // nexacro.ChartGaugeSeries : Properties
    //============================================================
    _pChartGaugeSeriesControl.destroy = function ()
    {
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

        this._seriesitems = null;
        this._clickItemIndex = null;

		this._pointshape = null;
		this._pointborderwidth = null;
		this._lineborderwidth = null;
		this._linebordercolor = null;
		this._color = null;
		this._changedSeriesColor = null;

        this.highlightbarfillstyle = null;
        this.highlightbarlinestyle = null;
        this.highlightbaropacity = null;
        this.highlightbarvisible = null;
		
		// 8.27
		this.boardouterstyle = null;
		this.boardinnerstyle = null;
		this.boardouterlinestyle = null;
		this._boardouterstyle = null;
		this._boardinnerstyle = null;
		this._boardouterlinestyle = null;
		this.userrange = null;
		this._userrange = null;
		this.userrangeinnerradius = null;
		this.userrangeradius = null;	
    
        this.fillstyle = null;
        this.linestyle = null;
        this.opacity = null;
        this.barfillstyle = null;
        this.barlinestyle = null;
        this.baropacity = null;

        this.selectbarfillstyle = null;
        this.selectbarlinestyle = null;
        this.selectbaropacity = null;
        this.visible = null;

        /* GaugeChart 용*/
        this.itemtextposition = null;
        this.itemtextgap = null;
        this.barsize = null;
    
        this.radius = null;
        this.innerradius = null;
        this.startangle = null;
        this.endangle   = null;

        this._barsize = null;
        this._itemtextgap_h = null;
        this._itemtextgap_v = null;
        this._gaugerect = null;
        this._radius = null;
        this._innerradius = null;
        this._borderwidth = null;
        this._barborderwidth = null;
      
       return true;
    };

    _pChartGaugeSeriesControl.set_highlightbarfillstyle = function (val)
    {
        this.highlightbarfillstyle = val;
        if (val)
        {
            if (this._highlightbarfillstyle == null || this._highlightbarfillstyle.value != val)
            {
                var oldValue;
                if (this._highlightbarfillstyle)
                {
                    oldValue = this._highlightbarfillstyle.value;
                }
                this._changeContentsProperty("highlightbarfillstyle", val, oldValue);

                var highlightbarfillstyle = nexacro.BackgroundObject(val, this);
                this._highlightbarfillstyle = highlightbarfillstyle;
                this.on_apply_highlightbarfillstyle(highlightbarfillstyle);
            }
        }
        else
        {
            if (this._highlightbarfillstyle)
            {
                this._highlightbarfillstyle = null;
                this.on_apply_highlightbarfillstyle(null);
            }
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_highlightbarfillstyle = function (highlightbarfillstyle)
    {
        // ?
    };

    _pChartGaugeSeriesControl.set_highlightbarlinestyle = function (val)
    {
        this.highlightbarlinestyle = val;
        if (val)
        {
            if (this._highlightbarlinestyle == null || this._highlightbarlinestyle.value != val)
            {
                var oldValue;
                if (this._highlightbarlinestyle)
                {
                    oldValue = this._highlightbarlinestyle.value;
                }
                this._changeContentsProperty("highlightbarlinestyle", val, oldValue);

                var highlightbarlinestyle = nexacro.BorderLineObject(val);
                this._highlightbarlinestyle = highlightbarlinestyle;
                this.on_apply_highlightbarlinestyle(highlightbarlinestyle);
            }
        }
        else
        {
            if (this._highlightbarlinestyle)
            {
                this._highlightbarlinestyle = null;
                this.on_apply_highlightbarlinestyle(null);
            }
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_highlightbarlinestyle = function ()
    {
        // ?
    };

    _pChartGaugeSeriesControl.set_highlightbaropacity = function (val)
    {
        this.highlightbaropacity = val;
        if (val === 0 || val)
        {
            if (this._highlightbaropacity == null || this._highlightbaropacity.value != val)
            {
                var oldValue;
                if (this._highlightbaropacity)
                {
                    oldValue = this._highlightbaropacity.value;
                }
                this._changeContentsProperty("highlightbaropacity", val, oldValue);

                var highlightbaropacity = nexacro.OpacityObject(val);
                this._highlightbaropacity = highlightbaropacity;
                this.on_apply_highlightbaropacity(highlightbaropacity);
            }
        }
        else
        {
            if (this._highlightbaropacity)
            {
                this._highlightbaropacity = null;
                this.on_apply_highlightbaropacity(null);
            }
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_highlightbaropacity = function (highlightbaropacity)
    {
        // ?
    };

    _pChartGaugeSeriesControl.set_highlightbarvisible = function (val)
    {
        if (val === undefined || val === null)
        {
            return;
        }

        val = nexacro._toBoolean(val);
        if (this.highlightbarvisible != val)
        {
            this._changeContentsProperty("highlightbarvisible", val, this.highlightbarvisible);
            this.highlightbarvisible = val;
            this.on_apply_highlightbarvisible(val);
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_highlightbarvisible = function (highlightbarvisible)
    {

    };

    // fillstyle
    _pChartGaugeSeriesControl.set_fillstyle = function (val)
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

                var fillstyle = nexacro.BackgroundObject(val, this);
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

    _pChartGaugeSeriesControl.on_apply_fillstyle = function (fillstyle)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("fillstyle", fillstyle);
    };

    _pChartGaugeSeriesControl.set_barfillstyle = function (val)
    {
        this.barfillstyle = val;
        if (val)
        {
            if (this._barfillstyle == null || this._barfillstyle.value != val)
            {
                var oldValue;
                if (this._barfillstyle)
                {
                    oldValue = this._barfillstyle.value;
                }
                this._changeContentsProperty("barfillstyle", val, oldValue);

                var barfillstyle = nexacro.BackgroundObject(val, this);
                this._barfillstyle = barfillstyle;
                this.on_apply_barfillstyle(barfillstyle);
            }
        }
        else
        {
            if (this._barfillstyle)
            {
                this._barfillstyle = null;
                this.on_apply_barfillstyle(null);
            }
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_barfillstyle = function (barfillstyle)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("barfillstyle", barfillstyle, "Bar");

        if (this._chart.legend)
        {
            this._chart._applyLegendItem();
        }
    };


    // linestyle
    _pChartGaugeSeriesControl.set_linestyle = function (val)
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

    _pChartGaugeSeriesControl.on_apply_linestyle = function (linestyle)
    {
        if (linestyle)
        {
            this._borderwidth = linestyle._width;
        }
        else
        {
            this._borderwidth = 1;
        }
        this._redrawSeries = false;
        this._applyPropertySeries("linestyle", linestyle);
    };

    _pChartGaugeSeriesControl.set_barlinestyle = function (val)
    {
        this.barlinestyle = val;
        if (val)
        {
            if (this._barlinestyle == null || this._barlinestyle.value != val)
            {
                var oldValue;
                if (this._barlinestyle)
                {
                    oldValue = this._barlinestyle.value;
                }
                this._changeContentsProperty("barlinestyle", val, oldValue);

                var barlinestyle = nexacro.BorderLineObject(val);
                this._barlinestyle = barlinestyle;
                this.on_apply_barlinestyle(barlinestyle);
            }
        }
        else
        {
            if (this._barlinestyle)
            {
                this._barlinestyle = null;
                this.on_apply_barlinestyle(null);
            }
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_barlinestyle = function (barlinestyle)
    {
        if (barlinestyle)
        {
            this._barborderwidth = barlinestyle._width;
        }
        else
        {
            this._barborderwidth = 1;
        }

        this._redrawSeries = false;
        this._applyPropertySeries("barlinestyle", barlinestyle, "Bar");
    };
	
	// 8.27
    _pChartGaugeSeriesControl.set_boardouterstyle = function (val)
    {
        this.boardouterstyle = val;
        if (val)
        {
            if (this._boardouterstyle == null || this._boardouterstyle.value != val)
            {
                var oldValue;
                if (this._boardouterstyle)
                {
                    oldValue = this._boardouterstyle.value;
                }
                this._changeContentsProperty("boardouterstyle", val, oldValue);

                var boardouterstyle = nexacro.BorderLineObject(val);
                this._boardouterstyle = boardouterstyle;
                this.on_apply_boardouterstyle(boardouterstyle);
            }
        }
        else
        {
            if (this._boardouterstyle)
            {
                this._boardouterstyle = null;
                this.on_apply_boardouterstyle(null);
            }
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_boardouterstyle = function (boardouterstyle)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("boardouterstyle", boardouterstyle, "Bar");
    };	
	
   _pChartGaugeSeriesControl.set_boardinnerstyle = function (val)
    {
        this.boardinnerstyle = val;
        if (val)
        {
            if (this._boardinnerstyle == null || this._boardinnerstyle.value != val)
            {
                var oldValue;
                if (this._boardinnerstyle)
                {
                    oldValue = this._boardinnerstyle.value;
                }
                this._changeContentsProperty("boardinnerstyle", val, oldValue);

                var boardinnerstyle = nexacro.BorderLineObject(val);
                this._boardinnerstyle = boardinnerstyle;
                this.on_apply_boardinnerstyle(boardinnerstyle);
            }
        }
        else
        {
            if (this._boardinnerstyle)
            {
                this._boardinnerstyle = null;
                this.on_apply_boardinnerstyle(null);
            }
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_boardinnerstyle = function (boardinnerstyle)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("boardinnerstyle", boardinnerstyle, "Bar");
    };	

   _pChartGaugeSeriesControl.set_boardouterlinestyle = function (val)
    {
        this.boardouterlinestyle = val;
        if (val)
        {
            if (this._boardouterlinestyle == null || this._boardouterlinestyle.value != val)
            {
                var oldValue;
                if (this._boardouterlinestyle)
                {
                    oldValue = this._boardouterlinestyle.value;
                }
                this._changeContentsProperty("boardouterlinestyle", val, oldValue);

                var boardouterlinestyle = nexacro.BorderLineObject(val);
                this._boardouterlinestyle = boardouterlinestyle;
                this.on_apply_boardouterlinestyle(boardouterlinestyle);
            }
        }
        else
        {
            if (this._boardouterlinestyle)
            {
                this._boardouterlinestyle = null;
                this.on_apply_boardouterlinestyle(null);
            }
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_boardouterlinestyle = function (boardouterlinestyle)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("boardouterlinestyle", boardouterlinestyle, "Bar");
    };	
	
    _pChartGaugeSeriesControl.set_userrange = function (val)
    {
		if(val == "") val = null;
        if (val)
        {
			var oldValue = this.userrange;
			this.userrange = val = val.toString();
			var oVal;
			var newval = nexacro.replaceAll(val,"'","\"");
			var svVal = '{ "userval" : [' + newval + '] }';
			try
			{
				var oJsn = JSON.parse(svVal);
				oVal = oJsn.userval;
				if(oVal[0].length == 0) oVal = null;
				oJsn = null;
			}
			catch(e)
			{
				oVal = null;
			}
			this._changeContentsProperty("userrange", val, oldValue);
			this._userrange = oVal;
			this.on_apply_userrange(oVal);
        }
        else
        {
			this._userrange = null;
			this.on_apply_userrange(null);
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_userrange = function (oVal)
    {
        this._redrawSeries = false;
        //this._applyPropertySeries("userrange", oVal);
    };	
	
   _pChartGaugeSeriesControl.set_userrangeinnerradius = function (val)
    {
        var IVal = null;
        if (val !== undefined && val !== null && val !== "")
        {
            if (nexacro._isNumber(val))
            {
                IVal = val;
            }
            else
            {
                if (val.length > 0)
                {
                    IVal = +val;
                    if (isNaN(IVal))
                    {
                        return;
                    }
                }
            }
        }

        if (IVal < 0 || IVal > 100)
        {
            return;
        }

        if (this.userrangeinnerradius != val)
        {
            this._changeContentsProperty("userrangeinnerradius", val, this.userrangeinnerradius);
            this.userrangeinnerradius = val;
            this.on_apply_userrangeinnerradius(val);
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_userrangeinnerradius = function (innerradius)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("userrangeinnerradius", innerradius);
    };	
   _pChartGaugeSeriesControl.set_userrangeradius = function (val)
    {
        var IVal = null;
        if (val !== undefined && val !== null && val !== "")
        {
            if (nexacro._isNumber(val))
            {
                IVal = val;
            }
            else
            {
                if (val.length > 0)
                {
                    IVal = +val;
                    if (isNaN(IVal))
                    {
                        return;
                    }
                }
            }
        }

        if (val < 0 || val > 100)
        {
            return;
        }

        if (this.userrangeradius != val)
        {
            this._changeContentsProperty("userrangeradius", val, this.userrangeradius);
            this.userrangeradius = val;
            this.on_apply_userrangeradius(IVal);
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_userrangeradius = function (innerradius)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("userrangeradius", innerradius);
    };
	//-------------------------------------------------------------------------------------------
	
    // opacity
    _pChartGaugeSeriesControl.set_opacity = function (val)
    {
        this.opacity = val;
        if (val === 0 || val)
        {
            if (this._opacity == null || this._opacity.value)
            {
                var oldValue;
                if (this._opacity)
                {
                    oldValue = this._opacity.value;
                }
                this._changeContentsProperty("opacity", val, oldValue);

                var opacity = nexacro.OpacityObject(val);
                this._opacity = opacity;
                this.on_apply_opacity(opacity);
            }
        }
        else
        {
            if (this._opacity)
            {
                this._opacity = null;
                this.on_apply_opacity(null);
            }
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_opacity = function (opacity)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("opacity", opacity);
    };

    _pChartGaugeSeriesControl.set_baropacity = function (val)
    {
        this.baropacity = val;
        if (val === 0 || val)
        {
            if (this._baropacity == null || this._baropacity.value)
            {
                var oldValue;
                if (this._baropacity)
                {
                    oldValue = this._baropacity.value;
                }
                this._changeContentsProperty("baropacity", val, oldValue);

                var baropacity = nexacro.OpacityObject(val);
                this._baropacity = baropacity;
                this.on_apply_baropacity(baropacity);
            }
        }
        else
        {
            if (this._baropacity)
            {
                this._baropacity = null;
                this.on_apply_baropacity(null);
            }
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_baropacity = function (baropacity)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("baropacity", baropacity, "Bar");
    };

    // select
    _pChartGaugeSeriesControl.set_selectbarfillstyle = function (val)
    {
        this.selectbarfillstyle = val;
        if (val)
        {
            if (this._selectbarfillstyle == null || this._selectbarfillstyle.value != val)
            {
                var oldValue;
                if (this._selectbarfillstyle)
                {
                    oldValue = this._selectbarfillstyle.value;
                }
                this._changeContentsProperty("selectbarfillstyle", val, oldValue);

                var selectbarfillstyle = nexacro.BackgroundObject(val, this);
                this._selectbarfillstyle = selectbarfillstyle;
                this.on_apply_selectbarfillstyle(selectbarfillstyle);
            }
        }
        else
        {
            if (this._selectbarfillstyle)
            {
                this._selectbarfillstyle = null;
                this.on_apply_selectbarfillstyle(null);
            }
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_selectbarfillstyle = function (selectbarfillstyle)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("selectbarfillstyle", selectbarfillstyle, "Bar");
    };

    _pChartGaugeSeriesControl.set_selectbarlinestyle = function (val)
    {
        this.selectbarlinestyle = val;
        if (val)
        {
            if (this._selectbarlinestyle == null || this._selectlinestyle.value != val)
            {
                var oldValue;
                if (this._selectbarlinestyle)
                {
                    oldValue = this._selectbarlinestyle.value;
                }
                this._changeContentsProperty("selectbarlinestyle", val, oldValue);

                var selectbarlinestyle = nexacro.BorderLineObject(val);
                this._selectbarlinestyle = selectbarlinestyle;
                this.on_apply_selectbarlinestyle(selectbarlinestyle);
            }
        }
        else
        {
            if (this._selectbarlinestyle)
            {
                this._selectbarlinestyle = null;
                this.on_apply_selectbarlinestyle(null);
            }
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_selectbarlinestyle = function (selectbarlinestyle)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("selectbarlinestyle", selectbarlinestyle, "Bar");
    };

    _pChartGaugeSeriesControl.set_selectbaropacity = function (val)
    {
        this.selectbaropacity = val;
        if (val === 0 || val)
        {
            if (this._selectbaropacity == null || this._selectbaropacity.value != val)
            {
                var oldValue;
                if (this._selectbaropacity)
                {
                    oldValue = this._selectbaropacity.value;
                }
                this._changeContentsProperty("selectbaropacity", val, oldValue);

                var selectbaropacity = nexacro.OpacityObject(val);
                this._selectbaropacity = selectbaropacity;
                this.on_apply_selectbaropacity(selectbaropacity);
            }
        }
        else
        {
            if (this._selectbaropacity)
            {
                this._selectbaropacity = null;
                this.on_apply_selectopacity(null);
            }
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_selectbaropacity = function (selectbaropacity)
    {
        this._redrawSeries = false;
        this._applyPropertySeries("selectbaropacity", selectbaropacity, "Bar");
    };

    _pChartGaugeSeriesControl.set_visible = function (val)
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

    _pChartGaugeSeriesControl.on_apply_visible = function (visible)
    {
        if (visible)
        {
            this._applyPropertySeries("visible", true);

            if (this.itemtextvisible)
            {
                this.on_apply_itemtextvisible(true);
            }
        }
        else
        {
            this._applyPropertySeries("visible", false);

            if (!this._itemtextvisible)
            {
                this.on_apply_itemtextvisible(false);
            }
        }

        this._chart._seriesGroup.set_visible(visible);

        if (this._chart.legend)
        {
            this._chart._applyLegendItem();
        }
    };

      _pChartGaugeSeriesControl.set_itemtextposition = function (val)
    {
        var itemtextposition_enum = ["start", "middle", "end", "gaugecenter"];
        if (itemtextposition_enum.indexOf(val) == -1)
        {
            return;
        }

        if (this.itemtextposition != val)
        {
            this._changeContentsProperty("itemtextposition", val, this.itemtextposition);
            this.itemtextposition = val;
            this.on_apply_itemtextposition();
        }
        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_itemtextposition = function ()
    {
        this._chart._recreate = true;
        this._chart._rearrange = true;
    };

    _pChartGaugeSeriesControl.set_barsize = function (val)
    {
        var IVal = null;
        if (val !== undefined && val !== null && val != "")
        {
            if (nexacro._isNumber(val))
            {
                IVal = val;
            }
            else
            {
                if (val.length > 0)
                {
                    IVal = +val;
                    if (isNaN(IVal))
                    {
                        return;
                    }
                }
            }
        }

        if (IVal < 0 || IVal > 100)
        {
            return;
        }

        if (this.barsize != val)
        {
            this._changeContentsProperty("barsize", val, this.barsize);
            this.barsize = val;
            this.on_apply_barsize(IVal);
        }

        this._chart._reset = true;
        this._chart._draw();
    };
    
    _pChartGaugeSeriesControl.on_apply_barsize = function (barsize)
    {
        if (!nexacro._ChartGraphicsLib.isEmpty(barsize))
        {
            // gaugetype 별로 지정해야함. here
            this._barsize = this.barsize * 0.01;
        }
        else
        {
            this._barsize = 1;
        }
        this._chart._changedData = true;
    };

    _pChartGaugeSeriesControl.set_itemtextgap = function (val)
    {
        if (this.itemtextgap != val)
        {
            this._changeContentsProperty("itemtextgap", val, this.itemtextgap);
            this.itemtextgap = val;
            this.on_apply_itemtextgap(val);
        }

        this._chart._reset = true;
        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_itemtextgap = function (itemtextgap)
    {
        if (itemtextgap)
        {
            if (typeof (itemtextgap) == "number")
            {
                this._itemtext_h = this._itemtext_v = itemtextgap;
            }
            else
            {
                itemtextgap = itemtextgap.split(" ");
                this._itemtextgap_h = +itemtextgap[0];
                this._itemtextgap_v = (itemtextgap[1]) ? +itemtextgap[1] : +itemtextgap[0];
            }

            this._chart._changedData = true;
        }
    };

    _pChartGaugeSeriesControl.set_radius = function (val)
    {
        var IVal = null;
        if (val !== undefined && val !== null && val !== "")
        {
            if (nexacro._isNumber(val))
            {
                IVal = val;
            }
            else
            {
                if (val.length > 0)
                {
                    IVal = +val;
                    if (isNaN(IVal))
                    {
                        return;
                    }
                }
            }
        }

        if (IVal < 0 || IVal > 100)
        {
            return;
        }

        if (this.radius != val)
        {
            this._changeContentsProperty("radius", val, this.radius);
            this.radius = val;
            this.on_apply_radius(IVal);
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_radius = function (radius)
    {
        if (!nexacro._ChartGraphicsLib.isEmpty(radius))
        {
            this._radius = radius * 0.01;
        }
        this._chart._changedData = true;
        this._chart._recreate = true;
    };

    _pChartGaugeSeriesControl.set_innerradius = function (val)
    {
        var IVal = null;
        if (val !== undefined && val !== null && val !== "")
        {
            if (nexacro._isNumber(val))
            {
                IVal = val;
            }
            else
            {
                if (val.length > 0)
                {
                    IVal = +val;
                    if (isNaN(IVal))
                    {
                        return;
                    }
                }
            }
        }

        if (val < 0 || val > 100)
        {
            return;
        }

        if (this.innerradius != val)
        {
            this._changeContentsProperty("innerradius", val, this.innerradius);
            this.innerradius = val;
            this.on_apply_innerradius(IVal);
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_innerradius = function (innerradius)
    {
        if (!nexacro._ChartGraphicsLib.isEmpty(innerradius))
        {
            this._innerradius = innerradius * 0.01;
        }

        if (this._chart.valueaxes[0] && this._chart.valueaxes[0]._location == "inside")
        {
            this._chart.valueaxes[0]._location = "outside";
        }

        this._chart._changedData = true;
        this._chart._recreate = true;
    };

    _pChartGaugeSeriesControl.set_startangle = function (val)
    {
        if (val !== undefined)
        {
            if (isNaN(val = +val) || val < 0)
            {
                return;
            }
        }

        if (this.startangle != val)
        {
            this._changeContentsProperty("startangle", val, this.startangle);
            this.startangle = val;
            this.on_apply_startangle(val);
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_startangle = function (startangle)
    {
        if (startangle > 360)
        {
            startangle = 0;
        }

        var radian;
        // degree -> radian 변환
        radian = startangle * Math.PI / 180;
        this._startangle = radian;
        
        if (this.endangle)
            this.on_apply_endangle(this.endangle);
        
        this._chart._changedData = true;
    };

    _pChartGaugeSeriesControl.set_endangle = function (val)
    {
        if (val !== undefined)
        {
            if (isNaN(val = +val) || val < 0)
            {
                return;
            }
        }

        if (this.endangle != val)
        {
            this._changeContentsProperty("endangle", val, this.endangle);
            this.endangle = val;
            this.on_apply_endangle(val);
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_endangle = function (endangle)
    {
        var startangle = this.startangle || 0;
        if (endangle > 360)
        {
            endangle = 360;
        }

        endangle = startangle + endangle;
        if (endangle > 360)
            endangle = endangle - 360;

        var radian;
        // degree -> radian 변환
        radian = endangle * Math.PI / 180;
        this._endangle = radian;

        this._chart._changedData = true;
    };

    _pChartGaugeSeriesControl.set_valueaxis = function (val)
    {
        if (this.valueaxis != val)
        {
            this._changeContentsProperty("valueaxis", val, this.valueaxis);
            this.valueaxis = val;
            this.on_apply_valueaxis(val);
        }

        this._chart._draw();
    };

    _pChartGaugeSeriesControl.on_apply_valueaxis = function (valueaxisid)
    {
        var valueaxis = this.parent.getValueaxisByID(valueaxisid);
        if (valueaxis)
        {
            valueaxis._used = true;
            valueaxis._afterSetProperties();

            // 다른 series에서 _xaxis, _yaxis를 사용하고 있는지 확인필요
            var usedxAxis = false;
            var usedyAxis = false;
            if (this._chart.seriesset)
            {
                var seriesset = this._chart.seriesset;
                for (var i = seriesset.length - 1; i > -1; i--)
                {
                    if (seriesset[i] && seriesset[i].id != this.id)
                    {
                        if ((seriesset[i]._yaxis && this._yaxis && seriesset[i]._yaxis.id == this._yaxis.id) && !usedyAxis)
                        {
                            usedyAxis = true;

                        }
                        if ((seriesset[i]._xaxis && this._xaxis && seriesset[i]._xaxis.id == this._xaxis.id) && !usedxAxis)
                        {
                            usedxAxis = true;
                        }
                    }
                }
            }

            if (this._xaxis && this._xaxis.id != valueaxis.id && !usedxAxis)
            {
                if (this._xaxis._type != "categoryAxis")
                {
                    this._xaxis._used = false;
                    this._xaxis.on_apply_visible(false);
                }
            }
            if (this._yaxis && this._yaxis.id != valueaxis.id && !usedyAxis)
            {
                if (this._yaxis._type != "categoryAxis")
                {
                    this._yaxis._used = false;
                    this._yaxis.on_apply_visible(false);
                }
            }

            if (valueaxis._direction == "x")
            {
                if (this.categoryaxis)
                {
                    if (this.categoryaxis._direction == "x")
                    {
                        this._xaxis = this.categoryaxis;
                        this._yaxis = valueaxis;
                    }
                    else
                    {
                        this._xaxis = valueaxis;
                        this._yaxis = this.categoryaxis;
                    }
                }
                else
                {
                    this._xaxis = valueaxis;
                }
            }
            else
            {
                if (this.categoryaxis)
                {
                    if (this.categoryaxis._direction == "x")
                    {
                        this._xaxis = this.categoryaxis;
                        this._yaxis = valueaxis;
                    }
                    else
                    {
                        this._xaxis = valueaxis;
                        this._yaxis = this.categoryaxis;
                    }
                }
                else
                {
                    this._yaxis = valueaxis;
                }
            }

            this._chart._changedData = true;
        }
    };

    //============================================================
    // nexacro.ChartGaugeSeries : Methods
    //============================================================


    //============================================================
    // nexacro.ChartGaugeSeries : Logical part
    //============================================================	
    _pChartGaugeSeriesControl._setItemData = function ()
    {
        var data = this._data,
		    itemdata;

        if (data)
        {
            itemdata = this._processItemData(data);
        }
        return itemdata;
    };

    _pChartGaugeSeriesControl._processItemData = function (data)
    {
		var slice = [],
		    total = 0,
            i = 0,
            value;

       // for (i = 0; i < 1; i++) // 단일 시리즈만 처리함. data.length
        i = this.parent._rowposition;
        {
            var seriesItems = {};
            var showFlag = true;

            if (data[i] != null && data[i][0] != undefined)
            {
                if (!this._clickShow && (this._clickItemIndex.length > 0))
                {
                    for (var j = 0; j < this._clickItemIndex.length; j++)
                    {
                        var index = this._clickItemIndex[j];
                        if (i == index)
                        {
                            showFlag = false;
                        }
                    }
                }

                if (!showFlag)
                {
                    seriesItems._isShow = false;
                }
                else
                {
                    seriesItems._isShow = true;
                }

                seriesItems.index = i;
                this.set_titletext(data[i][0]);
                seriesItems.category = data[i][0];
                seriesItems.value = parseFloat(data[i][1]) || 0;
                slice.push(seriesItems);
            }
        }
        this._seriesitems = slice;

        var items = this._seriesitems;
        for (i = 0; i < items.length; ++i)
        {
            if (items[i]._isShow)
            {
                value = items[i].value;
                if (value)
                {
                    total += items[i].value;
                }
            }
        }

        for (i = 0; i < items.length; ++i)
        {
            var percent = 0;
            var angle = 0;
            var endangle = this._endangle || Math.PI * 2;
            value = items[i].value;
            angle = value * /*Math.PI * 2*/endangle / total;
            percent = (value / (total / 100)).toFixed(2);

            items[i].angle = angle;
            items[i].percent = nexacro.toNumber(percent);
        }

        //trace("_processItemData >> ", items);
        return items;
    };

    _pChartGaugeSeriesControl._applyPropertySeries = function (style, value, type)
    {
        var item,
		    seriesGroup,
		    itemID,
            effect = this._chart_aniframe_obj,
		    isselectitem = false;

        seriesGroup = this._chart._graphicsControl.getObjectByID("ChartSeriesGroup");
        if (seriesGroup)
        {
            for (var i = 1; i <= this._itemCnt; i++)
            {
                if (type === undefined)
                    type = "";
                itemID = this._configIndex + " Series" + type + "GaugeItem_" + (i - 1);
                item = seriesGroup.getObjectByID(itemID);
                if (!nexacro._isNull(item))
                {
                    var length = this._selectedItem.length;
                    if (length > 0)
                    {
                        isselectitem = this._selectedItem[i - 1];
                    }

                    if(effect && effect.isloadanimation)
					{
						isselectitem = false;
					}

                    // select 색상 변경인 경우 구분
                    if (isselectitem)
                    {
                        if (style == "selectbarlinestyle")
                        {
                            item.set_strokepen(value);
                        }
                        else if (style == "selectbarfillstyle")
                        {
                            item.set_fillstyle(value);
                        }
                        else if (style == "selectbaropacity")
                        {
                            item.set_opacity(value);
                        }
                    }
                    else
                    {
                        // style 속성별 분기 처리
                        if (style == "visible")
                        {
                            item.set_visible(value);
                        }
                        else if (style == "linestyle" || style == "barlinestyle" || style == "boardinnerstyle" || style == "boardouterlinestyle" || style == "boardouterstyle")
                        {
                            item.set_strokepen(value);
                        }
                        else if (style == "fillstyle"  || style == "barfillstyle")
                        {
                            item.set_fillstyle(value);
                        }
                        else if (style == "opacity" || style == "baropacity")
                        {
                            item.set_opacity(value);
                        }
                    }
                }
            }
        }
    };

    _pChartGaugeSeriesControl._draw = function (redraw)
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
            if (this._chart.indicator)
            {
                this._chart.indicator._clear();
            }
			this._drawnow();
		}
    };

	_pChartGaugeSeriesControl._drawnow = function (redraw)
    {
		this._drawSeriesGauge();
    };
    _pChartGaugeSeriesControl._drawSeriesGauge = function ()
    {
        var items = this._seriesitems,
		    isNullData = false,
		    board = this._chart._boardRect,
		    borderWidth = this._chart._boardBorderWidth,
		    borderHeight = this._chart._boardBorderHeight,
            effect = this._chart_aniframe_obj,
		    itemtextvisible = this.itemtextvisible;

        if (!items)
            return false;

        if (board)
        {
            this._chart._boardWidth = board.width - borderWidth;
            this._chart._boardHeight = board.height - borderHeight;
            this._chart._centerLeft = this._chart._boardWidth / 2;
            this._chart._centerTop = this._chart._boardHeight / 2;
        }

        for (var i = 0; i < items.length; i++)
        {
            var item = items[i];
            if (item && item._isShow)
            {
                var value = item.value;
                if (value === undefined || value === null)
                {
                    isNullData = true;
                    break;
                }
            }
        }

        if (items.length <= 0 || isNullData)
        {
            return;
        }

        if (this._chart.gaugetype == "circular")
        {
            this._itemCnt = 0;
			this._itemtextlist = [];
            this._drawCircle();
        }
        else // gaugetype == "vertical" || gaugetype == "horizontal"
        {
            this._drawSeriesBar();
        }

        if (itemtextvisible)
        {
			var isEffect = (effect && effect.isloadanimation);
            if(!isEffect)
			{
                this._drawLabels();
			}
        }
    };

    _pChartGaugeSeriesControl._drawCircle = function ()
    {
        var chart = this._chart,
        rEndAngle = this._endangle || 6.28319,
        rStartAngle = this._startangle || 0,
        rHighlightStartAngle,	// = this._startangle || 0,
        rHighlightEndAngle = 0,
        boardborderWidth = this._chart._boardBorderWidth ? this._chart._boardBorderWidth : 0,
        boardborderHeight = this._chart._boardBorderHeight ? this._chart._boardBorderHeight : 0,
        maxRadius = Math.min((this._chart._boardWidth - (boardborderWidth * 2)), (this._chart._boardHeight - (boardborderHeight * 2))) / 2,
        radius = 0,
        innerradius = 0,
        gaugeradius = 0,
        gaugeinnerradius,
        total = 0,
        //centerX = this._chart._centerLeft,
        //centerY = this._chart._centerTop,
        fillstyle = this.fillstyle || this._color,
        linestyle = this.linestyle || "1px solid " + this._color,
        opacity = this.opacity || 0.5,
        barfillstyle = this.barfillstyle || this._color,
        barlinestyle = this.barlinestyle || "1px solid " + this._color,
        baropacity = this.baropacity || 1,
        selectlinestyle = this.selectlinestyle || this._chart._selectcolorset[0],
        selectfillstyle = this.selectfillstyle || this._chart._selectcolorset[0],
        selectopacity = this.selectopacity || this.opacity,
        selectedallItem = this._selectedItem,
        selectedItem = [],
        isselectitem = false,
        allitems = this._seriesitems.slice(0),
        items = [],
        innerw,
        innerh,
        seriesGroup = chart._seriesGroup,
        slice,
        itemId,
        currentAngle = this._startangle || 0,
        //endangle = this._endangle || 6.28319,
        drawitemCnt = 0,
        //barsize = this.barsize,
        effect = this._chart_aniframe_obj,
        //pThis = this,
        i = 0,
        selectlength;

        var linewidth = this._linestyle ? this._linestyle._width : 1;

        maxRadius -= (chart.valueaxes[0] ? chart.valueaxes[0]._allaxisgapsize : 0);

        if (maxRadius <= 0)
            return;

        if (nexacro._ChartGraphicsLib.isEmpty(this.radius))
        {
            radius = maxRadius * 0.8;
        }
        else
        {
            radius = maxRadius * this._radius;
        }
        radius -= linewidth;

        if (nexacro._ChartGraphicsLib.isEmpty(this.innerradius) == false)
		{
            innerradius = maxRadius * this._innerradius;
        }
        innerradius -= linewidth;

        if (innerradius != 0 && this._radius > this._innerradius)
        {   
            gaugeradius = radius - ((radius - innerradius) * (1 - this._barsize) / 2); // radius * (radius - (radius - innerradius) * (1 - this._barsize) / 2);
            gaugeinnerradius = innerradius + ((radius - innerradius) * (1 - this._barsize) / 2);
            this._chart._gaugeradius = gaugeradius;
            this._chart._gaugeinnerradius = gaugeinnerradius;
        }
        else if (innerradius <= 0)
        {
            gaugeradius = radius * this._barsize;
            gaugeinnerradius = 0;
            this._chart._gaugeradius = gaugeradius;
            this._chart._gaugeinnerradius = gaugeinnerradius;
        }

        if (radius <= innerradius)
        {
            innerradius = 0;
        }

        for (i in allitems)
        {
            if (allitems[i]._isShow)
            {
                total += allitems[i].value;
            }
        }
		
        for (i = 0; i < allitems.length; i++)
        {
            selectlength = selectedItem.length;
            if (selectlength > 0)
            {
                isselectitem = selectedItem[i];
            }

            var valuedata = allitems[i].value;
            if (valuedata && allitems[i]._isShow)
            {
                selectlength = selectedallItem.length;
                if (selectlength > 0)
                {
                    selectedItem.push(selectedallItem[i]);
                }
				
                items.push(allitems[i]);
            }
            this._itemCnt++;
        }
		
        function drawCircleGauge(pThis, i)
        {
            if (items[i]._isShow)
            {
                var angle = items[i].angle;
                //var curAngle = items[i].angle * 180 / Math.PI;
                var drawvalue = items[i].value;

                //rStartAngle = rStartAngle;
                //rEndAngle = 6.28319;// 360도
                if(effect && effect.isloadanimation)
				{
					drawvalue = pThis._getanimationdrawvalue(drawvalue);
				}

                rEndAngle = pThis._calcValueradian(drawvalue, rStartAngle, rEndAngle);

                //rHighlightStartAngle = 0;
                //rHighlightEndAngle = rEndAngle;

                var startAngle = Math.round(rStartAngle * 180 / Math.PI),
				    endAngle = Math.round(rEndAngle * 180 / Math.PI),
                    rMiddleAngle = rEndAngle,
                    bEllipse = false,
                    //highlightStartAngle = rHighlightStartAngle * 180 / Math.PI,
                    //highlightEndAngle = rHighlightEndAngle * 180 / Math.PI,
				    w = gaugeradius,
				    h = gaugeradius,
				    p0, p1, p2, p3, pM0, pM1,
				    la, //lb,
				    pathData,
				    index = 0,
				    //dx = 0, dy = 0,
				    centerX = pThis._chart._centerLeft,
				    centerY = pThis._chart._centerTop;
                    //startangle = pThis._startangle || 0;

                items[i].startAngle = startAngle;
                items[i].endAngle = endAngle;
                items[i].angle = angle;
                items[i].rStartAngle = rStartAngle;
                items[i].rEndAngle = rEndAngle;

                if (rStartAngle == rEndAngle || Math.floor((rStartAngle * 180 / Math.PI)) == 0 && Math.floor((rEndAngle * 180 / Math.PI)) >= 360 || Math.floor((rStartAngle * 180 / Math.PI)) >= 360 && Math.floor((rEndAngle * 180 / Math.PI)) == 0)
                {
                    bEllipse = true;

                    if (startAngle == 0)
                    {
                        rMiddleAngle = rEndAngle / 2;
                    }
                    else
                    {
                        if (rStartAngle > (6.28319 / 2))
                        {
                            rMiddleAngle = rStartAngle - 3.141595;
                        }
                        else
                        {
                            rMiddleAngle = rStartAngle + 3.141595;
                        }
                    }
                }

                //trace("111 rStartAngle : " + rStartAngle + ", rEndAngle : " + rEndAngle + ", value : " + items[i].value);
                if (drawitemCnt == 0)
                {
                    currentAngle = 4.71238898038469; // degree = 270도
                }
                else
                {
                    currentAngle += items[drawitemCnt - 1].angle;
                }

                if (bEllipse)
                {
                    p0 = (Math.sin(rStartAngle) * w + centerX) + " " + (-Math.cos(rStartAngle) * h + centerY);
                    p1 = (Math.sin(rEndAngle) * w + centerX) + " " + (-Math.cos(rEndAngle) * h + centerY);
                    pM0 = (Math.sin(rMiddleAngle) * w + centerX) + " " + (-Math.cos(rMiddleAngle) * h + centerY);

                    la = " 1";

                    if (!nexacro._ChartGraphicsLib.isEmpty(gaugeinnerradius) && gaugeinnerradius > 0)
                    {
                        // Gauge Bar
                        pathData = "M" + p0 + " A" + w + " " + h + " 1" + la + " 1 " + pM0;
                        pathData += " A" + w + " " + h + " 1" + la + " 1 " + p1;

                        innerw = innerh = gaugeinnerradius;

                        p2 = (Math.sin(rStartAngle) * innerw + centerX) + " " + (-Math.cos(rStartAngle) * innerh + centerY);
                        p3 = (Math.sin(rEndAngle) * innerw + centerX) + " " + (-Math.cos(rEndAngle) * innerh + centerY);
                        pM1 = (Math.sin(rMiddleAngle) * innerw + centerX) + " " + (-Math.cos(rMiddleAngle) * innerh + centerY);
                        
                        pathData += " L" + p3;
                        pathData += " A" + innerw + " " + innerh + " 1" + la + " 0 " + pM1;
                        pathData += " A" + innerw + " " + innerh + " 1" + la + " 0 " + p2 + " Z";
                    }
                    else
                    {
                        pathData = "M" + p0 + " A" + w + " " + h + " 0" + la + " 1 " + pM0;
                        pathData += " A" + w + " " + h + " 0" + la + " 1 " + p0;
                        pathData += "Z";
                    }
                }
                else
                {
                    p0 = (Math.sin(rStartAngle) * w + centerX) + " " + (-Math.cos(rStartAngle) * h + centerY);
                    p1 = (Math.sin(rEndAngle) * w + centerX) + " " + (-Math.cos(rEndAngle) * h + centerY);

                    la = Math.abs(pThis._valangle) > 180 ? " 1" : " 0";

                    if (!nexacro._ChartGraphicsLib.isEmpty(gaugeinnerradius) && gaugeinnerradius > 0)
                    {
                        // Gauge Bar
                        pathData = "M" + p0 + " A" + w + " " + h + " 1" + la + " 1 " + p1;

                        innerw = innerh = gaugeinnerradius;

                        p2 = (Math.sin(rStartAngle) * innerw + centerX) + " " + (-Math.cos(rStartAngle) * innerh + centerY);
                        p3 = (Math.sin(rEndAngle) * innerw + centerX) + " " + (-Math.cos(rEndAngle) * innerh + centerY);

                        pathData += " L" + p3 + " A" + innerw + " " + innerh + " 1" + la + " 0 " + p2 + " Z";
                    }
                    else
                    {
                        pathData = "M" + p0 + " A" + w + " " + h + " 0" + la + " 1 " + p1 + " L" + centerX + " " + centerY + "Z";
                    }
                }

                if (pThis._chart.indicator)
                    pThis._chart.indicator._drawindicator(null,  null, rEndAngle, 0);

                items[i].pathData = pathData;

                index = i + 1;
                itemId = pThis._configIndex + " SeriesCircleGaugeItem_" + index;
            
                slice = seriesGroup.getObjectByID(itemId);
				if (!slice)
				{
					slice = new nexacro.ChartGraphicsPath();
					slice.set_id(itemId);
					seriesGroup.addChild(slice);
				}

                slice.setPathData(pathData);
                slice._seriesItem = items[i];
                slice._series = pThis;

                items[i]._slice = slice;

                //highlight slice path 정보 저장
                if (pThis.highlightbarvisible)
                {
                    slice.highlightPathData = pathData;
                    slice.highlightbarvisible = true;
                }

                if(effect && effect.isloadanimation)
				{
					isselectitem = false;
				}

                if (isselectitem)
                {
                    if (nexacro._isNull(selectfillstyle))
                    {
                        selectfillstyle = items[i].color;
                    }
                    slice.set_strokepen(selectlinestyle);
                    slice.set_fillstyle(selectfillstyle);
                    slice.set_opacity(selectopacity);
                }
                else
                {
                    slice.set_strokepen(barlinestyle ? barlinestyle.value || barlinestyle : "1px solid #717a8380");
                    slice.set_fillstyle(barfillstyle);
                    slice.set_opacity(baropacity);
                }

                slice.set_strokejoin("round");
                slice._series = pThis;
            }
        } // end drawCircleGauge

        function drawCircle(pThis, i)
        {
            if (items[i]._isShow)
            {
                var angle = items[i].angle;
                //var curAngle = items[i].angle * 180 / Math.PI;

                var startAngle = Math.round(rStartAngle * 180 / Math.PI),
				    endAngle = Math.round(rEndAngle * 180 / Math.PI),
                    rMiddleAngle = rEndAngle,
                    bEllipse = false,
				    w = radius,
				    h = radius,
				    p0, p1, p2, p3, pM0, pM1,
				    la, //lb,
				    pathData,
				    index = 0,
				    //dx = 0, dy = 0,
				    centerX = pThis._chart._centerLeft,
				    centerY = pThis._chart._centerTop;
                    //startangle = pThis._startangle || 0;
                items[i].startAngle = startAngle;
                items[i].endAngle = endAngle;
                items[i].angle = angle;

                if (pThis.endangle == 360 || pThis.endangle === undefined)
                {
                    bEllipse = true;

                    if (startAngle == 0)
                    {
                        rMiddleAngle = rEndAngle / 2;
                    }
                    else
                    {
                        if (rStartAngle > (6.28319 / 2))
                        {
                            rMiddleAngle = rStartAngle - 3.141595;
                        }
                        else
                        {
                            rMiddleAngle = rStartAngle + 3.141595;
                        }
                    }
                }

                if (drawitemCnt == 0)
                {
                    currentAngle = 4.71238898038469; // degree = 270도
                }
                else
                {
                    currentAngle += items[drawitemCnt - 1].angle;
                }

                if (bEllipse)
                {
                    p0 = (Math.sin(rStartAngle) * w + centerX) + " " + (-Math.cos(rStartAngle) * h + centerY);
                    p1 = (Math.sin(rEndAngle) * w + centerX) + " " + (-Math.cos(rEndAngle) * h + centerY);
                    pM0 = (Math.sin(rMiddleAngle) * w + centerX) + " " + (-Math.cos(rMiddleAngle) * h + centerY);

                    la = " 1";

                    if (!nexacro._ChartGraphicsLib.isEmpty(innerradius) && innerradius > 0)
                    {
                        pathData = "M" + p0 + " A" + w + " " + h + " 1" + la + " 1 " + pM0;
                        pathData += " A" + w + " " + h + " 1" + la + " 1 " + p1;

                        innerw = innerh = innerradius;

                        p2 = (Math.sin(rStartAngle) * innerw + centerX) + " " + (-Math.cos(rStartAngle) * innerh + centerY);
                        p3 = (Math.sin(rEndAngle) * innerw + centerX) + " " + (-Math.cos(rEndAngle) * innerh + centerY);
                        pM1 = (Math.sin(rMiddleAngle) * innerw + centerX) + " " + (-Math.cos(rMiddleAngle) * innerh + centerY);
                        
                        pathData += " L" + p3;
                        pathData += " A" + innerw + " " + innerh + " 1" + la + " 0 " + pM1;
                        pathData += " A" + innerw + " " + innerh + " 1" + la + " 0 " + p2 + " Z";
                    }
                    else
                    {
                        pathData = "M" + p0 + " A" + w + " " + h + " 0" + la + " 1 " + pM0;
                        pathData += " A" + w + " " + h + " 0" + la + " 1 " + p0;
                        pathData += "Z";
                    }
                }
                else
                {
                    p0 = (Math.sin(rStartAngle) * w + centerX) + " " + (-Math.cos(rStartAngle) * h + centerY);
                    p1 = (Math.sin(rEndAngle) * w + centerX) + " " + (-Math.cos(rEndAngle) * h + centerY);

                    la = Math.abs(pThis.endangle) > 180 ? " 1" : " 0";

                    if (!nexacro._ChartGraphicsLib.isEmpty(innerradius) && innerradius > 0)
                    {
                        // Gauge Bar
                        pathData = "M" + p0 + " A" + w + " " + h + " 1" + la + " 1 " + p1;

                        innerw = innerh = innerradius;

                        p2 = (Math.sin(rStartAngle) * innerw + centerX) + " " + (-Math.cos(rStartAngle) * innerh + centerY);
                        p3 = (Math.sin(rEndAngle) * innerw + centerX) + " " + (-Math.cos(rEndAngle) * innerh + centerY);

                        pathData += " L" + p3 + " A" + innerw + " " + innerh + " 1" + la + " 0 " + p2 + " Z";
                    }
                    else
                    {
                        pathData = "M" + p0 + " A" + w + " " + h + " 0" + la + " 1 " + p1 + " L" + centerX + " " + centerY + "Z";
                    }
                }

                items[i].pathData = pathData;

                index = i + 1;
                itemId = pThis._configIndex + " SeriesCircleItem_" + index;
                slice = seriesGroup.getObjectByID(itemId);
				if(!slice)
				{
					slice = new nexacro.ChartGraphicsPath();
					slice.set_id(itemId);
					seriesGroup.addChild(slice);
				}
                slice.set_id(itemId);
                slice._seriesItem = items[i];

                items[i]._slice = slice;

                slice.setPathData(pathData);

                slice.set_strokepen(linestyle ? linestyle.value || linestyle : "1px solid #717a8380");
                slice.set_fillstyle(fillstyle);
                slice.set_opacity(opacity);

                slice.set_strokejoin("round");
            }
        } // end drawCircle
		
		// 8.22	8.27
       function drawColorBand(pThis, i, ii, colRange, svradius, svinnerradius)
       {
			/*
			var _startangle = colRange[0];
			var _endangle = colRange[1];
			if (_startangle > 360) _startangle = 0;
			_startangle = _startangle * Math.PI / 180;
			if (_endangle > 360) _endangle = 360;
			//_endangle = _startangle + _endangle;
			//if (_endangle > 360) _endangle = _endangle - 360;
			_endangle = _endangle * Math.PI / 180;
			
			var rStartAngle = _startangle || 0;
			var rEndAngle = _endangle; // || 6.28319;
			*/
			var bEllipse = false;
			var rStartAngle;
			var rEndAngle;
			var rMiddleAngle;
			if(colRange[0] == colRange[1])
			{
				bEllipse = true;
				rStartAngle = 0;
				rEndAngle = 360 * Math.PI / 180;
				rMiddleAngle = rEndAngle / 2;
				svinnerradius = 0;
			} 
			else 
			{
				var ticks = chart.valueaxes[0]._ticks;
				var s1 = 0;
				var e1 = 0;
				for(var cnt=0;cnt<ticks.length;cnt++)
				{
					if(ticks[cnt].v == colRange[0])
					{
						s1 = cnt;
					}
					if(ticks[cnt].v == colRange[1])
					{
						e1 = cnt;
						break;
					}
				}
				rStartAngle = ticks[s1].axisangleitems.startangle;
				rEndAngle = ticks[e1].axisangleitems.startangle;
				rMiddleAngle = rEndAngle;
			}

			var fillstyle = nexacro.BackgroundObject(colRange[2], pThis);
            if (items[i]._isShow)
            {
                //var angle = items[i].angle;
				var w = svradius,
				    h = svradius,
				    p0, p1, p2, p3, pM0,
				    la, //lb,
				    pathData,
				    index = 0,
				    centerX = pThis._chart._centerLeft,
				    centerY = pThis._chart._centerTop;
                    //startangle = pThis._startangle || 0;
/*
                if (colRange[1] == 360 || pThis.endangle === undefined)
                {
					if (rStartAngle > (6.28319 / 2))
					{
						rMiddleAngle = rStartAngle - 3.141595;
					}
					else
					{
						rMiddleAngle = rStartAngle + 3.141595;
					}
                }
*/
               //currentAngle = 4.71238898038469; // degree = 270도

				if(bEllipse == false)
				{
					p0 = (Math.sin(rStartAngle) * w + centerX) + " " + (-Math.cos(rStartAngle) * h + centerY);
					p1 = (Math.sin(rEndAngle) * w + centerX) + " " + (-Math.cos(rEndAngle) * h + centerY);

					//la = Math.abs(colRange[1]) > 180 ? " 1" : " 0";
					if(rEndAngle < rStartAngle) la = " 1";	// check 필요
					else la = " 0";

					/*
					if( Math.abs(rStartAngle - rEndAngle) > (Math.PI-0.3) ) // check 필요 180로 되어있으나...
					{
						la = " 1";
					} else {
						la = " 0";
					}
					console.log(rEndAngle , rStartAngle, la);
					*/
					
					if(svinnerradius < 50 && la  == " 1") 
					{
						la = " 0";
					}

					if (!nexacro._ChartGraphicsLib.isEmpty(svinnerradius) && svinnerradius > 0)
					{
						// Gauge Bar
						pathData = "M" + p0 + " A" + w + " " + h + " 1" + la + " 1 " + p1;

						innerw = innerh = svinnerradius;

						p2 = (Math.sin(rStartAngle) * innerw + centerX) + " " + (-Math.cos(rStartAngle) * innerh + centerY);
						p3 = (Math.sin(rEndAngle) * innerw + centerX) + " " + (-Math.cos(rEndAngle) * innerh + centerY);

						pathData += " L" + p3 + " A" + innerw + " " + innerh + " 1" + la + " 0 " + p2 + " Z";
					}
					else
					{
						pathData = "M" + p0 + " A" + w + " " + h + " 0" + la + " 1 " + p1 + " L" + centerX + " " + centerY + "Z";
					}
				}
				else 
				{
                    p0 = (Math.sin(rStartAngle) * w + centerX) + " " + (-Math.cos(rStartAngle) * h + centerY);
                    //p1 = (Math.sin(rEndAngle) * w + centerX) + " " + (-Math.cos(rEndAngle) * h + centerY);
                    pM0 = (Math.sin(rMiddleAngle) * w + centerX) + " " + (-Math.cos(rMiddleAngle) * h + centerY);

                    la = " 1";
					
					pathData = "M" + p0 + " A" + w + " " + h + " 0" + la + " 1 " + pM0;
					pathData += " A" + w + " " + h + " 0" + la + " 1 " + p0;
					pathData += " Z";					
				}

                index = ii + 1;
                itemId = pThis._configIndex + " SeriesCircleColorItem_" + index;
                slice = seriesGroup.getObjectByID(itemId);
				if(!slice)
				{
					slice = new nexacro.ChartGraphicsPath();
					slice.set_id(itemId);
					seriesGroup.addChild(slice);
				}
                slice.set_id(itemId);
                slice.setPathData(pathData);

                //slice.set_strokepen(linestyle ? linestyle.value || linestyle : "1px solid #717a8380");
                slice.set_fillstyle(fillstyle);
                slice.set_opacity(opacity);

                slice.set_strokejoin("round");
            }
        } // end drawColorBand	
		
		// 8.22	8.27
       function drawBoard(pThis)
       {
			var outerstyle = pThis._boardouterstyle;	//nexacro.BorderLineObject("2px solid #ff000080");
			var innerstyle = pThis._boardinnerstyle;
			var outerline = pThis._boardouterlinestyle
			
			var rStartAngle = 0;
			var rEndAngle = 6.28319;	// 360 degree
			var svradius = maxRadius;	// * 0.95;
			var useBoard = false;

			//var startAngle = 0,
				//endAngle = 360,
			var	rMiddleAngle,
				//bEllipse = false,
				w,
				h,
				w1 = svradius,
				//h1 = svradius,
				p0, //p1, 
				pM0,
				la, 
				pathData,
				//index = 0,
				//dx = 0, dy = 0,
				centerX = pThis._chart._centerLeft,
				centerY = pThis._chart._centerTop;

			rMiddleAngle = rEndAngle / 2;

			if(outerstyle && outerstyle.value)
			{
				useBoard = true;
				w = h = (w1 - parseInt(outerstyle._width/2.0));
				if(outerline && outerline.value)
				{
					w = h = (w - parseInt(outerline._width/2.0));
				} 
	
				p0 = (Math.sin(rStartAngle) * w + centerX) + " " + (-Math.cos(rStartAngle) * h + centerY);
				//p1 = (Math.sin(rEndAngle) * w + centerX) + " " + (-Math.cos(rEndAngle) * h + centerY);
				pM0 = (Math.sin(rMiddleAngle) * w + centerX) + " " + (-Math.cos(rMiddleAngle) * h + centerY);

				la = " 1";

				pathData = "M" + p0 + " A" + w + " " + h + " 0" + la + " 1 " + pM0;
				pathData += " A" + w + " " + h + " 0" + la + " 1 " + p0;
				pathData += "Z";
				
				itemId = pThis._configIndex + " SeriesBoardItem_1";
				slice = seriesGroup.getObjectByID(itemId);
				if(!slice)
				{
					slice = new nexacro.ChartGraphicsPath();
					slice.set_id(itemId);
					seriesGroup.addChild(slice);
				}
				slice.set_id(itemId);
				slice.setPathData(pathData);
				slice.set_strokepen(outerstyle);
				slice.set_strokejoin("round");
			}
			
			if(innerstyle && innerstyle.value)
			{
				useBoard = true;
				w = w1;
				if(outerline && outerline.value)
				{
					w = (w - outerline._width);
				} 
				if(outerstyle && outerstyle.value)
				{
					w = (w - outerstyle._width);
				} 
				w = (w - parseInt(innerstyle._width/2.0));
				h = w;
				
				p0 = (Math.sin(rStartAngle) * w + centerX) + " " + (-Math.cos(rStartAngle) * h + centerY);
				//p1 = (Math.sin(rEndAngle) * w + centerX) + " " + (-Math.cos(rEndAngle) * h + centerY);
				pM0 = (Math.sin(rMiddleAngle) * w + centerX) + " " + (-Math.cos(rMiddleAngle) * h + centerY);

				la = " 1";

				pathData = "M" + p0 + " A" + w + " " + h + " 0" + la + " 1 " + pM0;
				pathData += " A" + w + " " + h + " 0" + la + " 1 " + p0;
				pathData += "Z";
				
				itemId = pThis._configIndex + " SeriesBoardItem_2";
				slice = seriesGroup.getObjectByID(itemId);
				if(!slice)
				{
					slice = new nexacro.ChartGraphicsPath();
					slice.set_id(itemId);
					seriesGroup.addChild(slice);
				}
				slice.set_id(itemId);
				slice.setPathData(pathData);
				slice.set_strokepen(innerstyle);
				slice.set_strokejoin("round");	
			}
			
			if(outerline && outerline.value)
			{
				w = h = (w1 - parseInt(outerline._width/2.0));
				p0 = (Math.sin(rStartAngle) * w + centerX) + " " + (-Math.cos(rStartAngle) * h + centerY);
				//p1 = (Math.sin(rEndAngle) * w + centerX) + " " + (-Math.cos(rEndAngle) * h + centerY);
				pM0 = (Math.sin(rMiddleAngle) * w + centerX) + " " + (-Math.cos(rMiddleAngle) * h + centerY);

				la = " 1";

				pathData = "M" + p0 + " A" + w + " " + h + " 0" + la + " 1 " + pM0;
				pathData += " A" + w + " " + h + " 0" + la + " 1 " + p0;
				pathData += "Z";
				
				itemId = pThis._configIndex + " SeriesBoardItem_3";
				slice = seriesGroup.getObjectByID(itemId);
				if(!slice)
				{
					slice = new nexacro.ChartGraphicsPath();
					slice.set_id(itemId);
					seriesGroup.addChild(slice);
				}
				slice.set_id(itemId);
				slice.setPathData(pathData);
				slice.set_strokepen(outerline);
				slice.set_strokejoin("round");
			}
			return useBoard;
        } // end drawBoard			

		// 8.22
		var useBoard = drawBoard(this);
		var colorRange = this._userrange; //[[0,360,'#ffff00']];
		if(items.length > 0 && (colorRange instanceof Array)) 
		{
			var colorRangeLeng = colorRange.length;
			var svradius, svinnerradius;

			if (nexacro._ChartGraphicsLib.isEmpty(this.userrangeradius))
			{
				svradius = maxRadius * 0.8;
			}
			else
			{
				svradius = maxRadius * (this.userrangeradius*0.01);
			}
			if (nexacro._ChartGraphicsLib.isEmpty(this.userrangeinnerradius))
			{
				svinnerradius = 0;
			}
			else
			{
				svinnerradius = maxRadius * (this.userrangeinnerradius*0.01);
			}
			if (svradius <= svinnerradius)
			{
				svinnerradius = 0;
			}
			for(i = 0; i < colorRangeLeng; i++)
			{
				drawColorBand(this, 0, i, colorRange[i], svradius, svinnerradius);
			}
			useBoard = true;
		}		

        for(i = 0; i < items.length; i++)
        {
            selectlength = selectedItem.length;
            if (selectlength > 0)
            {
                isselectitem = selectedItem[i];
            }
			if(useBoard == false)
				drawCircle(this, i);
            drawCircleGauge(this, i);
            drawitemCnt++;
        }
		
    };

	
    _pChartGaugeSeriesControl._drawSeriesBar = function ()
    {
        var barlinestyle = this.barlinestyle || "1px solid " + this._color,
			barfillstyle = this.barfillstyle || this._color,
			baropacity = this.baropacity,
            linestyle = this.linestyle || "1px solid" + this._color,
            fillstyle = this.fillstyle || this._color,
            opacity = this.opacity,
			barLeft, barRight, barGaugewidth, barGaugeLeft, barGaugeRight,
			barwidth,	/* = this._barsize || this._chart._barsize,*/
			datapoints = this._datapoints,
			points = datapoints.points,
			ps = datapoints.pointsize,
			selectedItem = this._selectedItem,
			selectbarlinestyle = this.selectbarlinestyle || "1px solid " + this._selectcolor,
			selectbarfillstyle = this.selectbarfillstyle || this._selectcolor,
			selectbaropacity = this.selectbaropacity || this.baropacity,
            location = this._chart.valueaxes[0] ? this._chart.valueaxes[0]._location : undefined,
            axissize = this._chart.valueaxes[0] ? this._chart.valueaxes[0]._axissize : undefined,
            effect = this._chart_aniframe_obj,
            axissizewidth = 0,
            axissizeheight = 0,
			isselectitem = false,
			index = 0;
            //stacktype = this._stacktype == "none" ? this._chart.stacktype : this._stacktype;

        var rotateaxis = this._chart.gaugetype == "horizontal" ? true : false;
        if (axissize && this._chart.valueaxes && this._chart.valueaxes[0].visible)
        {
            axissizewidth = axissize.width;
            axissizeheight = axissize.height;
        }

        if (rotateaxis)
        {
            if (location == "top")
            {
                barGaugewidth = this._barsize * ((this._chart._boardHeight / 2)  - axissizeheight);
                barGaugeLeft = (this._chart._boardHeight / 2) - ((barGaugewidth + axissizeheight) / 2) + axissizeheight; // top
                barGaugeRight = barGaugeLeft + barGaugewidth; // height

                barwidth = (this._chart._boardHeight / 2) - axissizeheight;
                barLeft = (this._chart._boardHeight / 2) - ((barwidth + axissizeheight) / 2) + axissizeheight; // top
                barRight = barLeft + barwidth; // height
            }
            else // location == "bottom"
            {
                barGaugewidth = this._barsize * ((this._chart._boardHeight / 2)  - axissizeheight);
                barGaugeLeft = (this._chart._boardHeight / 2) - ((barGaugewidth + axissizeheight) / 2); // top
                barGaugeRight = barGaugeLeft + barGaugewidth; // height

                barwidth = (this._chart._boardHeight / 2) - axissizeheight;
                barLeft = (this._chart._boardHeight / 2) - ((barwidth + axissizeheight) / 2); // top
                barRight = barLeft + barwidth; // height
            }
        }
        else
        {
            if (location == "right")
            {
                barGaugewidth = this._barsize * ((this._chart._boardWidth / 2) - axissizewidth);
                barGaugeLeft = this._chart._centerLeft - ((barGaugewidth + axissizewidth) / 2); // left
                barGaugeRight = barGaugeLeft + barGaugewidth; // width

                barwidth = (this._chart._boardWidth / 2) - axissizewidth;
                barLeft = this._chart._centerLeft - ((barwidth + axissizewidth) / 2); // left
                barRight = barLeft + barwidth; // width
            }
            else // location == "left"
            {
                barGaugewidth = this._barsize * ((this._chart._boardWidth / 2) - axissizewidth);
                barGaugeLeft = this._chart._centerLeft - ((barGaugewidth + axissizewidth) / 2) + axissizewidth; // left
                barGaugeRight = barGaugeLeft + barGaugewidth; // width

                barwidth = (this._chart._boardWidth / 2) - axissizewidth;
                barLeft = this._chart._centerLeft - ((barwidth + axissizewidth) / 2) + axissizewidth; // left
                barRight = barLeft + barwidth; // width
            }
        }
    
        var bottom = rotateaxis ? this._chart._boardWidth : this._chart._boardHeight;        
        var gaugebottom = rotateaxis ? this._chart._boardRectLeft: this._chart._boardHeight;        

        for (var i = 0; i < points.length; i += ps)
        {
            var length = selectedItem.length;
            if (length > 0)
            {
                isselectitem = selectedItem[index];
            }

            if(effect && effect.isloadanimation)
			{
				isselectitem = false;
			}

            this._drawBar(0, 0, bottom, barLeft, barRight, this._chart.valueaxes[0], this._chart.valueaxes[0], linestyle, fillstyle, opacity, index);
            if (isselectitem)
            {
                this._drawBarGauge(0, points[i + 1], gaugebottom, barGaugeLeft, barGaugeRight, this._chart.valueaxes[0], this._chart.valueaxes[0], selectbarlinestyle, selectbarfillstyle, selectbaropacity, index);
            }
            else
            {
                this._drawBarGauge(0, points[i + 1], gaugebottom, barGaugeLeft, barGaugeRight, this._chart.valueaxes[0], this._chart.valueaxes[0], barlinestyle, barfillstyle, baropacity, index);
            }

            index++;
        }
        this._itemCnt = index;
    };

    _pChartGaugeSeriesControl._drawBar = function (x, y, b, barLeft, barRight, axisx, axisy, linestyle, fillstyle, opacity, index, item)
    {
        var left, right, bottom, top,
			//tmp,
            rotateaxis = this._chart.gaugetype == "horizontal" ? true : false,
            //location = this._chart.valueaxes[0] ? this._chart.valueaxes[0]._location : undefined,
            tickstartgap;

        if (rotateaxis)
        {
            left = y;
            right = b;
            top = x + barLeft;
            bottom = x + barRight;
        }
        else
        {
            left = x + barLeft;
            right = x + barRight;
            bottom = b;
            top = y;
        }

        if (rotateaxis)
        {
            tickstartgap = axisy ? axisy._tickstartgap : 0;
            if (tickstartgap)
            {
                bottom += tickstartgap;
                top += tickstartgap;
            }
        }
        else
        {
            tickstartgap = axisx ? axisx._tickstartgap : 0;
            if (tickstartgap)
            {
                left += tickstartgap;
                right += tickstartgap;
            }
        }

        var rect,
			chart = this._chart,
			//fillStyle = [],
			width = 0,
			height = 0,
			//tooltip = chart.tooltip,
			//evtInfo,
			seriesId,
			points = [],
			seriesGroup = chart._seriesGroup,
			highlightGroup = chart._highlightGroup;

        width = right - left;
        height = bottom - top;

        if (width < 0)
        {
            left += width;
            width = Math.abs(width);
        }
        if (height < 0)
        {
            top += height;
            height = Math.abs(height);
        }

        if (rotateaxis)
        {
            this._barwidth = height;
            if (this.parent.indicator)
                this.parent.indicator._calcpos = top;
        }
        else
        {
            this._barwidth = width;
            if (this.parent.indicator)
                this.parent.indicator._calcpos = left;
        }

        if (item)
        {
            var highlightitem = item._barHighlight;
            if (!highlightitem)
            {
                rect = new nexacro.ChartGraphicsRect(left, top, width, height);
				rect.set_strokepen(linestyle);
				rect.set_fillstyle(fillstyle);
                rect.set_opacity(opacity);
                seriesId = this._configIndex + " SeriesHighlightGaugeItem";
                rect.set_id(seriesId);
                highlightGroup.addChild(rect);

                item._barHighlight = rect;
                rect._item = item;
                rect.index = item.index;
                rect.value = item.value;
            }
        }
        else
        {
            if (seriesGroup)
            {
               seriesId = this._configIndex + " SeriesGaugeItem_" + index;
                rect = seriesGroup.getObjectByID(seriesId);
				if(!rect)
				{
					rect = new nexacro.ChartGraphicsRect(left, top, width, height);
					rect.set_id(seriesId);
					seriesGroup.addChild(rect);
					
				}
				else
				{
					
					rect.set_x(left);
					rect.set_width(width);
					rect.set_y(top);
					rect.set_height(height);
					
				}
				
				rect.set_strokepen(linestyle);
				rect.set_fillstyle(fillstyle);
				rect.set_opacity(opacity);	

                // TODO: rotateaxis 구분에 따른 points 생성확인필요
                points[0] = x;
                points[1] = y;
                points[2] = b;

                rect.index = index;
                // trace("index", index , "x", x, "y", y, "b", b);
                if (rotateaxis)
                {
                    points[3] = x - b;
                    rect.value = x;
                }
                else
                {
                    points[3] = y - b;
                    rect.value = y;
                }

                rect._points = points;
            }
        }
        var board = this._chart._boardRect,
			boardWidth = 0,
			boardHeight = 0,
			borderWidth = this._chart._boardBorderWidth,
			borderHeight = this._chart._boardBorderHeight;

        if (board)
        {
            boardWidth = board.width - borderWidth;
            boardHeight = board.height - borderHeight;
			if(rect)
			{
				rect._clipitems = [];
				rect.setClipPath(new nexacro.Rect(-left, -top, boardWidth, boardHeight));
			}
        }
    };

    _pChartGaugeSeriesControl._drawBarGauge = function (x, y, b, barLeft, barRight, axisx, axisy, barlinestyle, barfillstyle, baropacity, index, item)
    {
        var left, right, bottom, top,
			//tmp,
            rotateaxis = this._chart.gaugetype == "horizontal" ? true : false,
            effect = this._chart_aniframe_obj,
            tickstartgap;

        if(effect && effect.isloadanimation)
		{
			y = this._getanimationdrawvalue(y);
		}
        y = this._calcValueposition(y);

        if (rotateaxis)
        {
            left = b;
            right = y;
            top = x + barLeft;
            bottom = x + barRight;
        }
        else
        {
            left = x + barLeft;
            right = x + barRight;
            bottom = b;
            top = y;
        }
        
        if (!rotateaxis)
        {
            tickstartgap = axisx ? axisx._tickstartgap : 0;
            if (tickstartgap)
            {
                left += tickstartgap;
                right += tickstartgap;
            }
        }
        else
        {
            tickstartgap = axisy ? axisy._tickstartgap : 0;
            if (tickstartgap)
            {
                bottom += tickstartgap;
                top += tickstartgap;
            }
        }

        var rect,
			chart = this._chart,
			//fillStyle = [],
			width = 0,
			height = 0,
			//tooltip = chart.tooltip,
			//evtInfo,
			seriesId,
			points = [],
			seriesGroup = chart._seriesGroup,
			highlightGroup = chart._highlightGroup;

        width = right - left;
        height = bottom - top;

        if (width < 0)
        {
            left += width;
            width = Math.abs(width);
        }
        if (height < 0)
        {
            top += height;
            height = Math.abs(height);
        }

        if (rotateaxis)
        {
            this._barwidth = height;
        }
        else
        {
            this._barwidth = width;
        }

        
        if (this._chart.indicator)
        {   
            var barborderdecimal = this._barborderwidth;
            if (barborderdecimal % 2 == 0)
                barborderdecimal = 0;
            else
                barborderdecimal = 1;

            this._chart.indicator._drawindicator(left + barborderdecimal, top, width, height);
        }

        if (item)
        {
            var highlightitem = item._barHighlight;
            if (!highlightitem)
            {
                rect = new nexacro.ChartGraphicsRect(left, top, width, height);
				rect.set_strokepen(barlinestyle);
				rect.set_fillstyle(barfillstyle);
                rect.set_opacity(baropacity);

                seriesId = this._configIndex + " SeriesHighlightGaugeItem";
                rect.set_id(seriesId);
                highlightGroup.addChild(rect);

                item._barHighlight = rect;
                rect._item = item;
                rect.index = item.index;
                rect.value = item.value;
            }
        }
        else
        {
            if (seriesGroup)
            {
                seriesId = this._configIndex + " SeriesBarGaugeItem_" + index;
                rect = seriesGroup.getObjectByID(seriesId);
				if(!rect)
				{
					rect = new nexacro.ChartGraphicsRect(left, top, width, height);
					rect.set_id(seriesId);
					seriesGroup.addChild(rect);
				}
				else
				{
					rect.set_x(left);
					rect.set_width(width);
					rect.set_y(top);
					rect.set_height(height);
					
				}
				rect.set_strokepen(barlinestyle);
				rect.set_fillstyle(barfillstyle);
				rect.set_opacity(baropacity);

                // TODO: rotateaxis 구분에 따른 points 생성확인필요
                points[0] = x;
                points[1] = y;
                points[2] = b;

                rect.index = index;
                // trace("index", index , "x", x, "y", y, "b", b);
                if (rotateaxis)
                {
                    points[3] = x - b;
                    rect.value = x;
                }
                else
                {
                    points[3] = y - b;
                    rect.value = y;
                }

                rect._points = points;
            }
        }

        this._gaugerect = rect;

        var board = this._chart._boardRect,
			boardWidth = 0,
			boardHeight = 0,
			borderWidth = this._chart._boardBorderWidth,
			borderHeight = this._chart._boardBorderHeight;

        if (board)
        {
            boardWidth = board.width - borderWidth;
            boardHeight = board.height - borderHeight;
			if(rect)
			{
				rect._clipitems = [];
				rect.setClipPath(new nexacro.Rect(-left, -top, boardWidth, boardHeight));
			}
        }
		if(rect)
		{
			rect._series = this;
			this._seriesitems[index] = rect;
		}

        if (!item)
        {
            var itemtextvisible = this.itemtextvisible;
            if (itemtextvisible)
            {
				var isEffect = (effect && effect.isloadanimation);
				if(!isEffect)
				{				
                    this._drawBarItemText(left, right, bottom, top, width, height, rect);
				}
            }
        }
    };

    _pChartGaugeSeriesControl._drawBarItemText = function (left, right, bottom, top, width, height, item)
    {
        var seriesGroup = this._chart._seriesGroup;
        var itemText = this._createSeriesItemText(item);
        //var textRect = null;
		//textWidth = 0,
		//textHeight = 0;
        
		function positionstart(itemText,left, right, bottom, top, width, height, itemtextGap, rotateaxis)
        {
			var textTop = 0;
			var textLeft = 0;
			//textRect = itemText._getRect();
			if(!itemtextGap)itemtextGap = 0;
			/*
            if (textRect)
            {
				textWidth = textRect.width;
				textHeight = textRect.height;
            }
			*/
			if (rotateaxis)
            {	
				itemText.set_verticalAlign("middle");
				itemText.set_textAlign("left");
				textTop = top + (height/2);
				textLeft = left + itemtextGap;
					
			}
			else
			{
				itemText.set_verticalAlign("bottom");
				itemText.set_textAlign("center");
				textLeft = left + (width/2);
                textTop = bottom - itemtextGap;
			}

			 itemText.set_x(textLeft);
             itemText.set_y(textTop);
		}
		function positionmiddle(itemText,left, right, bottom, top, width, height,itemtextGap,rotateaxis)
        {
			itemText.set_verticalAlign("middle");
            itemText.set_textAlign("center");
			var textTop = 0;
			var textLeft = 0;
			//textRect = itemText._getRect();
			if(!itemtextGap)itemtextGap = 0;
			/*
            if (textRect)
            {
				textWidth = textRect.width;
				textHeight = textRect.height;
            }
			*/
			if (rotateaxis)
            {	
				textTop = top + (height/2);
				textLeft = left + (width / 2) + itemtextGap;
			}
			else
			{
				textLeft = left + (width/2);
                textTop = top + (height / 2) - itemtextGap;
			}

			 itemText.set_x(textLeft);
             itemText.set_y(textTop);
		}
		function positionend(itemText,left, right, bottom, top, width, height,itemtextGap,rotateaxis)
        {
			var textTop = 0;
			var textLeft = 0;
			//textRect = itemText._getRect();
			if(!itemtextGap)itemtextGap = 0;
			/*
            if (textRect)
            {
				textWidth = textRect.width;
				textHeight = textRect.height;
            }
			*/
			if (rotateaxis)
            {	
				itemText.set_verticalAlign("middle");
				itemText.set_textAlign("right");
				textTop = top + (height/2);
				textLeft = right - itemtextGap;
			}
			else
			{
				itemText.set_verticalAlign("top");
				itemText.set_textAlign("center");
				textLeft = left + (width/2);
                textTop = top + itemtextGap;
			}

			 itemText.set_x(textLeft);
             itemText.set_y(textTop);
		}
		/*
		function positionoutside(itemText,left, right, bottom, top, width, height,itemtextGap,rotateaxis)
        {
			var textTop = 0;
			var textLeft = 0;
			textRect = itemText._getRect();
			if(!itemtextGap)itemtextGap = 0;
			if (rotateaxis)
            {	
				itemText.set_verticalAlign("middle");
				itemText.set_textAlign("left");
				textTop = top + (height/2);
				textLeft = right + itemtextGap;
			}
			else
			{
				itemText.set_verticalAlign("bottom");
				itemText.set_textAlign("center");
				textLeft = left + (width/2);
                textTop = top - itemtextGap;
			}

			 itemText.set_x(textLeft);
             itemText.set_y(textTop);
		}
		*/
        
        if (!nexacro._isNull(itemText))
        {
            //var textLeft = 0,
			//	textTop = 0,
			//	borderwidth = this._barborderwidth,
			var	rotateaxis = this._chart.gaugetype == "horizontal" ? true : false,
                itemtextPosition = this.itemtextposition,
                itemtextGap = this.baritemtextgap;
			
			if (itemtextPosition)
            {
                switch (itemtextPosition)
                {
                    case "start":
						{
							positionstart(itemText,left, right, bottom, top, width, height,itemtextGap,rotateaxis);
						}
                        break;

                    case "middle":
                        {
							positionmiddle(itemText,left, right, bottom, top, width, height,itemtextGap,rotateaxis);
						}
                        break;
					case "end":
						{
							positionend(itemText,left, right, bottom, top, width, height,itemtextGap,rotateaxis);
						}
						break;
                    default:    // gaugecenter
                        positionmiddle(itemText,left, right, bottom, top, width, height,itemtextGap,rotateaxis);
                        break;
                }
            }
			else
			{
				positionmiddle(itemText,left, right, bottom, top, width, height,itemtextGap,rotateaxis);
			}

            this._chart._setChangeInBoardAreaPos(itemText);
			seriesGroup.addChild(itemText);
            itemText._series = this;
        }
    };

    _pChartGaugeSeriesControl._drawLabels = function ()
    {
        var startAngle = this._startangle || 0,
			items,
			//selectedItem = this._selectedItem,
			//isselectitem = false,
            //effect = this._chart_aniframe_obj,
			pThis = this;

        items = this._seriesitems;

		/*
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
		*/

        function drawLabel(item, startangle, index, pThis)
        {
            //var labelAngle = 0,
			var	halfAngle = 0,
				//sAngle = 0, angle = 0, eAngle = 0,
                chart = pThis._chart,
                itemtextposition = pThis.itemtextposition,
                boardborderWidth = pThis._chart._boardBorderWidth ? pThis._chart._boardBorderWidth : 1.5,
                boardborderHeight = pThis._chart._boardBorderHeight ? pThis._chart._boardBorderHeight : 1.5,
                maxRadius = Math.min((pThis._chart._boardWidth - (boardborderWidth * 2)), (pThis._chart._boardHeight - (boardborderHeight))) / 2,
                centerX = pThis._chart._centerLeft,
                centerY = pThis._chart._centerTop,
                itemText,
                textX = 0,
                textY = 0,
                itempointsize,
                //pointx,
                //pointy,
                seriesGroup = pThis._chart._seriesGroup,
                //itemId,
                radius,
                itemtextgap_h = pThis._itemtextgap_h,
                itemtextgap_v = pThis._itemtextgap_v,
                borderwidth = pThis._borderwidth;

            maxRadius -= (chart.valueaxes[0] ? chart.valueaxes[0]._allaxisgapsize : 0);

            if (maxRadius <= 0)
                return;

            var linewidth = this._linestyle ? this._linestyle._width : 1;

            if (nexacro._ChartGraphicsLib.isEmpty(pThis._chart._gaugeradius) || nexacro._ChartGraphicsLib.isEmpty(pThis._chart._gaugeinnerradius)) // radius가 undefined임.
            {
                radius = maxRadius * 0.8;
            }
            else
            {
                radius = pThis._chart._gaugeradius - (pThis._chart._gaugeradius - pThis._chart._gaugeinnerradius) / 2;
            }
        
            radius -= linewidth;

            var rStartAngle = item.rStartAngle,
                rEndAngle = item.rEndAngle;
				//itemendAngle = item.endAngle,
				//itemangle = item.angle;

            if (itemtextposition)
            {
                switch (itemtextposition)
                {
                    case "start":
                        {
                            halfAngle = rStartAngle;
            
			                if (radius > maxRadius)
                            {
                                itempointsize = maxRadius + (borderwidth / 2);
                            }
                            else
                            {
                                itempointsize = radius + (borderwidth / 2);
                            }

                            textX = centerX + Math.round(Math.sin(halfAngle) * (itempointsize));
                            textY = centerY - Math.round(Math.cos(halfAngle) * (itempointsize));
                        }
                        break;

                    case "middle":
                        {
                            var temp = rEndAngle - rStartAngle;
                            if (temp < 0)
                            {
                                halfAngle = 6.28319 + temp;
                            }
                            else
                            {
                                halfAngle = temp;
                            }
                            halfAngle = (halfAngle / 2) + rStartAngle;
            
			                if (radius > maxRadius)
                            {
                                itempointsize = maxRadius + (borderwidth / 2);
                            }
                            else
                            {
                                itempointsize = radius + (borderwidth / 2);
                            }

                            textX = centerX + Math.round(Math.sin(halfAngle) * (itempointsize));
                            textY = centerY - Math.round(Math.cos(halfAngle) * (itempointsize));
                        }
                        break;

                    case "end":
                        {
                            halfAngle = rEndAngle;
            
			                if (radius > maxRadius)
                            {
                                itempointsize = maxRadius + (borderwidth / 2);
                            }
                            else
                            {
                                itempointsize = radius + (borderwidth / 2);
                            }

                            textX = centerX + Math.round(Math.sin(halfAngle) * (itempointsize));
                            textY = centerY - Math.round(Math.cos(halfAngle) * (itempointsize));
                        }
                        break;

                    default: // gaugecenter
                        {
                            textX = centerX;
                            textY = centerY;
                        }
                        break;
                }
            }
            else
            {
                textX = centerX;
                textY = centerY;
            }

            // itemtext 생성
            itemText = pThis._createSeriesItemText(item);
            // trace("itemText", itemText);
            if (!nexacro._isNull(itemText))
            {
                //var items = pThis._seriesitems;
				
				itemText.set_verticalAlign("middle");
				itemText.set_textAlign("center");

                itemText.set_x(textX + itemtextgap_h);
                itemText.set_y(textY + itemtextgap_v);
            
                seriesGroup.addChild(itemText);
                itemText._series = pThis;
				itemText._seriesItem = item;
				//var board = pThis._chart._boardRect,
				//borderWidth = pThis._chart._boardBorderWidth,
				//borderHeight = pThis._chart._boardBorderHeight;

				pThis._chart._setChangeInBoardAreaPos(itemText);
            }
        }

        for (var i = 0; i < this._itemCnt; i++)
        {
			/*
            var length = selectedItem.length;
            if (length > 0)
            {
                isselectitem = selectedItem[i];
                if(effect && effect.isloadanimation)
				{
					isselectitem = false;
				}
            }
			*/

            var valuedata = items[i].value;
            if (valuedata && items[i]._isShow)
            {
                drawLabel(items[i], startAngle, i, pThis);
                startAngle += items[i].angle;
            }
        }
    };

    _pChartGaugeSeriesControl._calcValueradian = function (val, rStartAngle, rEndAngle)
    {
        // value를 tickmin, tickmax, startangle, endangle 기준으로 radian값을 만든다.
        var rValue;
         
        if (this._chart)        
        {
            var axis = this._chart.valueaxes[0];
            var nmin = axis ? axis._min : 0;
            var nmax = axis ? axis._max : val;
            var startangle = this.startangle >= 0 ? this.startangle : Math.floor(rStartAngle * 180 / Math.PI);
            var endangle = this.endangle >= 0 ? this.endangle : Math.floor(rEndAngle * 180 / Math.PI);
            var maxAngle = 360;

            if (startangle === undefined)
                startangle = 0;
            if (endangle === undefined)
                endangle = 360;

            if (nmax === undefined || nmax == null)
            {
                nmax = 0;
                if (val >= 0)
                {
                    nmax = val > nmax ? val : nmax;
                }
            }

            if (nmin === undefined || nmin == null)
            {
                if (val >= 0)
                {
                    nmin = 0;
                }
                else
                {
                    nmin = val;
                }
            }

            var valrange = (val - nmin) / (nmax - nmin);

            if (valrange > 1)
                valrange = 1;
            else if (valrange < 0)
                valrange = 0;

            var valdegree = 0;
            valdegree = endangle * valrange;
            this._valangle = valdegree;

            var gapdegree = startangle + valdegree;

            if (gapdegree > maxAngle)
            {
                gapdegree -= maxAngle;
            }
            valdegree = gapdegree;
            
            if (valdegree == startangle)
            {
                valdegree = startangle;
            }
         
           rValue = valdegree * Math.PI / 180;
        }
 
        return rValue;
    };

    _pChartGaugeSeriesControl._calcValueposition = function (val)
    {
        if (this._chart.gaugetype == "circular")
            return;
        var rotateaxis = this._chart.gaugetype == "horizontal" ? true : false;
        
        var range = 1;

        if (this._chart.valueaxes[0])
            range = this._chart.valueaxes[0]._max - this._chart.valueaxes[0]._min;

        if (rotateaxis)
        {
            if (range > 0)
            {
                return this.axis.p2c(val);
            }
            else if (range == 0)
            {
                return 0;
            }
        }
        else
        {
            if (range > 0)
            {
                return this.axis.p2c(val);
            }
            else if (range == 0)
            {
                return this._chart._boardHeight;
            }
        }
    };

    _pChartGaugeSeriesControl._createSeriesItemText = function (item)
    {
        // trace("item", item);
        var index = this.parent._rowposition,
			itemtext = this.itemtext,
			itemtexttype = this.itemtexttype,
			itemtextmask = this.itemtextmask,
			itemtextfont = this.itemtextfont,
			itemtextcolor = this.itemtextcolor,
			itemtextwidth = this.itemtextwidth,
			locale = this.locale,
			chart = this._chart,
            //charttype = chart._type_name,
            text,
            itemtextvalue;

        //trace(index, " >> item", item);
        // trace("itemtext >>", itemtext, "itemtexttype >>", itemtexttype, "itemtextmask >>", itemtextmask);	

        // itemtext가 없는 경우
        itemtextvalue = itemtext._value;
        if (itemtext && itemtextvalue == "")
        {
            
            itemtext = this.valuecolumn;
        }

        if (itemtext)
        {
            text = nexacro._getChartDisplaytText(index, itemtext, locale, itemtexttype, itemtextmask, chart,this);
        }

        if (!nexacro._isNull(text))
        {
            this._itemtext = text;
			var itemId = this._configIndex + " SeriesItemText_" + index;
			this._itemtextObj = chart._seriesGroup.getObjectByID(itemId);
			if(this._itemtextObj)
			{
                chart._seriesGroup.removeChild(this._itemtextObj);
				this._itemtextObj.destroy();
            }
            //this._itemtextObj = new nexacro.ChartGraphicsText(0, 0);
			this._itemtextObj = new nexacro.ChartGraphicsText(0, 0);
			this._itemtextObj.set_id(itemId);           
            this._itemtextObj.set_text(this._itemtext);
			this._itemtextObj.set_font(itemtextfont ? itemtextfont.value || itemtextfont : "12pt Verdana");
            this._itemtextObj.set_color(itemtextcolor ? itemtextcolor.value || itemtextcolor : "#000000");
            this._itemtextObj.index = item.index;
			this._itemtextObj.value = item.value;
            if (itemtextwidth > 0)
            {
                this._itemtextObj.set_width(itemtextwidth);
                this._itemtextObj.set_wordWrap(true);
            }
            else
            {
                this._itemtextObj.set_wordWrap(false);
            }
			this._itemtextlist.push(itemId);

            return this._itemtextObj;
        }
    };

    _pChartGaugeSeriesControl._setItemColor = function (items)
    {
        // Pie
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
                this._color = itemColor;
                var slice = items[i]._slice;
                if (slice)
                {
                    slice.set_fillstyle(itemColor);
                }
            }
        }
    };

    _pChartGaugeSeriesControl._rearrangeProcessItemData = function ()
    {
        var total = 0;

        var items = this._seriesitems;
        var i, value;

        for (i = 0; i < items.length; ++i)
        {
            if (items[i]._isShow)
            {
                value = items[i].value;
                if (value)
                {
                    total += items[i].value;
                }
            }
        }

        for (i = 0; i < items.length; ++i)
        {
            var percent = 0;
            var angle = 0;
            var endangle = this._endangle || Math.PI * 2;
            value = items[i].value;
            angle = value * /*Math.PI * 2*/endangle / total;
            percent = (value / (total / 100)).toFixed(2);

            items[i].angle = angle;
            items[i].percent = nexacro.toNumber(percent);
        }
    };

    _pChartGaugeSeriesControl._setColor = function (colorset)
    {
        this._color = colorset;
        this._changedSeriesColor = true;

        var changedColorset = this._chart._changedColorset;
        if (changedColorset)
        {
            var visible = this.visible,
            linestyle,
			fillstyle,
            barlinestyle,
            barfillstyle,
            width,
            style,
            color;

            if (visible)
            {
                if (this._linestyle)
                {
                    width = this._linestyle.width;
                    style = this._linestyle.style;
                    color = this._linestyle.color;

                    linestyle = width + " " + style + " " + color;
                    this.set_linestyle(linestyle);
                }
                else
                {
                    linestyle = "1px solid " + colorset;
                    this._applyPropertySeries("linestyle", linestyle);

                }

                if (this._fillstyle)
                {
                    fillstyle = this._fillstyle;
                    this.set_fillstyle(fillstyle);
                }
                else
                {
                    fillstyle = colorset;
                    this._applyPropertySeries("fillstyle", fillstyle);
                }

                if (this._barlinestyle)
                {
                    width = this._barlinestyle.width;
                    style = this._barlinestyle.style;
                    color = this._barlinestyle.color;

                    barlinestyle = width + " " + style + " " + color;
                    this.set_barlinestyle(barlinestyle);
                }
                else
                {
                    barlinestyle = "1px solid " + colorset;
                    this._applyPropertySeries("barlinestyle", barlinestyle);

                }

                if (this._barfillstyle)
                {
                    barfillstyle = this._barfillstyle;
                    this.set_barfillstyle(barfillstyle);
                }
                else
                {
                    barfillstyle = colorset;
                    this._applyPropertySeries("barfillstyle", barfillstyle);
                }
            }
        }
    };

    _pChartGaugeSeriesControl._showHighlight = function (item)
    {
        if (!this.highlightbarvisible)
        {
            return;
        }
		
        var highlight = item._highlight;
        if (!highlight)
        {
            this._drawHighlight(item);
           
			this._chart._chageGroupObject(this._chart._seriesGroup,this._chart._highlightGroup,this._itemtextlist ,false);
			this._chart._graphicsControl.draw();
        }
    };

    _pChartGaugeSeriesControl._hideHighlight = function (item)
    {
        if (!this.highlightbarvisible)
        {
            return;
        }
		
        var highlight = item._highlight;
        if (highlight && !nexacro._ChartGraphicsLib.isEmpty(highlight.parent))
        {
			this._chart._chageGroupObject(this._chart._seriesGroup,this._chart._highlightGroup,this._itemtextlist ,true);
            this._chart._highlightGroup.removeChild(highlight);
            delete item._highlight;
			
            this._chart._graphicsControl.draw();
        }
    };

    _pChartGaugeSeriesControl._drawHighlight = function (item)
    {
        var highlightbarlinestyle = this.highlightbarlinestyle || "1px solid " + this._chart._highlightcolorset[0],
			highlightbarfillstyle = this.highlightbarfillstyle || this._chart._highlightcolorset[0],
			highlightbaropacity = this.highlightbaropacity,
            gaugetype = this.parent.gaugetype,
			slice,
            rect,
			highlightPathData,
			highlightGroup = this._chart._highlightGroup;

        if (item)
        {
            if (gaugetype == "circular")
            {
                highlightPathData = item.highlightPathData;
                if (highlightPathData)
                {
                    slice = new nexacro.ChartGraphicsPath();
                    slice.setPathData(highlightPathData);
                    slice.set_id("SeriesHighlightGaugeItem");
                    slice.set_strokepen(highlightbarlinestyle);
                    slice.set_fillstyle(highlightbarfillstyle);
                    slice.set_strokejoin("round");
                    slice.set_opacity(highlightbaropacity);

                    highlightGroup.addChild(slice);

                    item._highlight = slice;
                    slice._item = item;
                    slice._series = this;
                }
            }
            else
            {
                var gaugerect = this._gaugerect ? this._gaugerect._rect : null;
                if (!gaugerect)
                    return;

                var left = this._gaugerect.x,
                top = this._gaugerect.y,
                width = gaugerect.width,
                height = gaugerect.height;

                rect = new nexacro.ChartGraphicsRect(left, top, width, height);
                rect.set_id("SeriesHighlightGaugeItem");
                rect.set_strokepen(highlightbarlinestyle);
                rect.set_fillstyle(highlightbarfillstyle);
                rect.set_opacity(highlightbaropacity);

                highlightGroup.addChild(rect);

                item._highlight = rect;
                rect._item = item;
                rect._series = this;
            }
        }
    };

}

if (!nexacro.ChartGaugeValueAxisControl)
{
    //==============================================================================
    // nexacro.ChartGaugeValueAxisControl
    //==============================================================================

    nexacro.ChartGaugeValueAxisControl = function (id, parent, graphicsControl)
    {
        nexacro.ChartAxisControl.call(this, id, parent, graphicsControl);
        this._direction = "";
    };

    var _pChartGaugeValueAxisControl = nexacro._createPrototype(nexacro.ChartAxisControl, nexacro.ChartGaugeValueAxisControl);
    nexacro.ChartGaugeValueAxisControl.prototype = _pChartGaugeValueAxisControl;
    _pChartGaugeValueAxisControl._type_name = "ChartGaugeValueAxisControl";

    _pChartGaugeValueAxisControl._axissize = {"x":0, "y":0, "width":0, "height":0};
    _pChartGaugeValueAxisControl._allaxisgapsize = 0;
    _pChartGaugeValueAxisControl._allaxislinegapsize = 0;
	_pChartGaugeValueAxisControl.smalltickcount = 0;	// 8.27	- 추후 _pChartAxisControl 이동 / gauge에만 적용.
	_pChartGaugeValueAxisControl.smallticklinestyle = "";	// 8.27	- 추후 _pChartAxisControl 이동 / gauge에만 적용.
	_pChartGaugeValueAxisControl._smallticklinestyle = null;	// 8.27	- 추후 _pChartAxisControl 이동 / gauge에만 적용.

    /* default properties */
    _pChartGaugeValueAxisControl.opposite = false;

    _pChartGaugeValueAxisControl.set_opposite = function (val)
    {
        if (val === undefined || val === null)
        {
            return;
        }

        val = nexacro._toBoolean(val);
        if (this.opposite != val)
        {
            this._changeContentsProperty("opposite", val, this.opposite);
            this.opposite = val;
            this.on_apply_opposite(val);
        }

        this.parent._draw();
    };

    _pChartGaugeValueAxisControl.on_apply_opposite = function (opposite)
    {
        if (this._is_initprop)
            return;

        if (opposite)
        {
            opposite = nexacro._toBoolean(opposite);
        }

        //var rotateaxis = this.parent.rotateaxis,
		//	charttype = this.parent._type_name;

        var type = this.parent.gaugetype;

        if (opposite)
        {
            if (type == "circular")
            {
                if (this.parent.seriesset[0] && (this.parent.seriesset[0].innerradius === undefined || this.parent.seriesset[0].innerradius <= 0))
                    this._location = "outside";
                else
                    this._location = "inside";
            }
            else if (type == "vertical")
                this._location = "right";
            else // type == "horizontal"
                this._location = "top";
        }
        else
        {
            if (type == "circular")
                this._location = "outside";
            else if (type == "vertical")
                this._location = "left";
            else // type == "horizontal"
                this._location = "bottom";
        }

        // rotateaxis 일 때만 Axis direction 변경
        var direction;
        
        if (this._location == "left" || this._location == "right")
        {
            direction = "y";
        }
        else if (this._location == "top" || this._location == "bottom")
        {
            direction = "x";
        }
        else
        {
            direction = "circular";
        }
        
        this._direction = direction;
        this.parent._rearrange = true;
        this.parent._changedData = true;
        this._getTickLabelAlign(this.labelrotate);
    };
	// 8.27
   _pChartGaugeValueAxisControl.set_smalltickcount = function (val)
    {
        var IVal = null;
        if (val !== undefined && val !== null && val !== "")
        {
            if (nexacro._isNumber(val))
            {
                IVal = val;
            }
            else
            {
                if (val.length > 0)
                {
                    IVal = +val;
                    if (isNaN(IVal))
                    {
                        return;
                    }
                }
            }
        }
        if (this.smalltickcount != IVal)
        {
            this._changeContentsProperty("smalltickcount", IVal, this.smalltickcount);
            this.smalltickcount = IVal;
            this.on_apply_smalltickcount(IVal);
        }

        this.parent._draw();
    };

    _pChartGaugeValueAxisControl.on_apply_smalltickcount = function (smalltickcount)
    {
        this._changedTicks = true;
        this.parent._rearrange = true;
     };
	 
   _pChartGaugeValueAxisControl.set_smallticklinestyle = function (val)
    {
        this.smallticklinestyle = val;
        if (val)
        {
            if (this._smallticklinestyle == null || this._smallticklinestyle.value != val)
            {
                var oldValue;
                if (this._smallticklinestyle)
                {
                    oldValue = this._smallticklinestyle.value;
                }
                this._changeContentsProperty("smallticklinestyle", val, oldValue);

                var smallticklinestyle  = nexacro.BorderObject(val);
                this._smallticklinestyle = smallticklinestyle ;
                this.on_apply_smallticklinestyle();
            }
        }
        else
        {
            if (this._smallticklinestyle)
            {
                this._smallticklinestyle = null;
                this.on_apply_smallticklinestyle();
            }
        }

        this.parent._draw();
    };

    _pChartAxisControl.on_apply_smallticklinestyle = function ()
    {
        if (this._is_initprop) return;
        this._changedTickStyle = true;
    };

    //===============================================================
    // nexacro._pChartGaugeValueAxisControl : Logical part
    //===============================================================
    _pChartGaugeValueAxisControl._afterSetProperties = function ()
    {
        this.on_apply_axislinestyle(this._axislinestyle);
        this.on_apply_ticklinestyle(this._ticklinestyle);
        this.on_apply_labeltextfont(this._labeltextfont);
        this.on_apply_labeltextcolor(this._labeltextcolor);

        this.on_apply_axistype();
    };

    _pChartGaugeValueAxisControl.destroy = function ()
    {
        this._destroy(true);
    };

    _pChartGaugeValueAxisControl._destroy = function (parent_clear)
    {
        if (parent_clear)
        {
            //var axisid = this.id;
            if (this.parent)
            {
                this.parent.valueaxis = null;
                this.parent._deleteContentsProp("valueaxis");
            }
        }

        delete this.locale;
        delete this.labeltype;
        delete this.labelmask;
        delete this._axisLine;
        delete this._axisRect;

        if (this._ticks)
        {
            for (var i = 0; i < this._ticks.length; i++)
            {
                var tick = this._ticks[i];
                var ticktext = tick.labelElement;
                if (ticktext)
                {
                    ticktext.destroy();
                    //ticktext = null;
                }

                var tickline = tick.lineElement;
                if (tickline)
                {
                    tickline.destroy();
                    //tickline = null;
                }

                //tick = null;
            }
        }

        this._direction = null;
        this._axissize = null;

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

		// 8.27
		this.smalltickcount = null;
		this.smallticklinestyle = null;
		this._smallticklinestyle = null;

        this._allaxisgapsize = null;
        this._allaxislinegapsize = null;

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

    _pChartGaugeValueAxisControl._create = function ()
    {
        this._group = new nexacro.ChartGraphicsGroup();
        this._group.set_id(this.id + "_ChartAxisGroup");
        this._graphicsControl.addChild(this._group);
		
        this._tickGroup = new nexacro.ChartGraphicsGroup();
        this._tickGroup.set_id("ChartAxisTickGroup");
        this._group.addChild(this._tickGroup);

        this._labelGroup = new nexacro.ChartGraphicsGroup();
        this._labelGroup.set_id("ChartAxisLabelGroup");
        this._group.addChild(this._labelGroup);

        this._axisRect = new nexacro.ChartGraphicsRect(0, 0, 0, 0);
        this._axisRect.set_id("ChartAxisRect");
        this._group.addChild(this._axisRect);
        this._axisRect._axis = this;
    };

    _pChartGaugeValueAxisControl._changeContentsProperty = function (nm, newVal, oldVal)
    {
        var contents = this.parent.contents;
        if (contents && contents.valueaxis)
        {
            contents.valueaxis[nm] = newVal;
        }
    };

	_pChartGaugeValueAxisControl._processItemData = function (ticks)
	{
		var length = ticks.length,
		chart  = this.parent,
		rStartangle = chart.seriesset[0].startangle * Math.PI / 180|| 0,
		rEndangle = chart.seriesset[0].endangle * Math.PI / 180 || 6.28319,
		i,
		//maxlabelsize = 0,
		axisgap = +this.gap || 0,
		labelgap = +this._labelgap || 0,
		ticksize = +this.ticksize || 10,
        location = this._location,
		label,
		labelBoundRect,
		maxtextsize = 0,
		textsize = 0,
		w = 0,
		h = 0,
		total = 0;

        var anglegap = rEndangle;
 
		if(length <= 2)
            return ;

		for(i = 0; i < length; i++)
		{
			var axisangleitems = {};
			axisangleitems.index = i;
			ticks[i].axisangleitems = axisangleitems;
			label = ticks[i].labelElement;
			if(label)
			{
				labelBoundRect = label.getGlobalBoundRect();
				w = labelBoundRect.width;
				h = labelBoundRect.height;
				textsize = Math.max(w, h);
				maxtextsize = Math.max(textsize, maxtextsize);
			}
		}
		if(this.labeltextwidth)
		{
			maxtextsize = Math.max(+this.labeltextwidth, maxtextsize);
		}
		
		var checkangleval = ticks[1].v - ticks[0].v;
		
        total = this._max - this._min;
   
        var startangle = rStartangle;
		for(i = 0; i < length; ++i)
		{
			var percent = 0;
			var angle = 0;
			var endangle = anglegap;
			var items = ticks[i].axisangleitems;

            if (i == 0 && this._min < checkangleval)
            {
                angle = (checkangleval - this._min) * endangle/total;
			    percent = ((checkangleval - this._min) / (total/100)).toFixed(2);
            }
            else if (i == 0 && this._min > checkangleval)
            {
                angle = (this._min - checkangleval) * endangle/total;
			    percent = ((this._min - checkangleval) / (total/100)).toFixed(2);
            }
            else
            {
                angle = checkangleval * endangle/total;
			    percent = (checkangleval / (total/100)).toFixed(2);
            }

			items.startangle = 0;
			items.angle = angle;
			
			items.startangle += startangle;
			startangle += angle;
			items.endangle = startangle;
			if(items.startangle >= 6.28319)
				items.startangle =  items.startangle - 6.28319;
			if(items.endangle >= 6.28319)
				items.endangle =  items.endangle - 6.28319;
			if(startangle >= 6.28319)
				startangle =  startangle - 6.28319;
			items.percent = nexacro.toNumber(percent);
			items.textsize = maxtextsize;
			items.axisgap = axisgap;
			items.labelgap = labelgap;
			items.ticksize = ticksize;
		}

        if (location == "outside")
        {
		    this._allaxisgapsize = maxtextsize + axisgap + labelgap + ticksize;  
		    this._allaxislinegapsize = maxtextsize + labelgap + ticksize;
        }
        else
        {
            this._allaxisgapsize = 0;  
		    this._allaxislinegapsize = 0;
        }
	};

    _pChartGaugeValueAxisControl._setData = function(clientWidth, clientHeight)
    {
        var changedTicks = this._changedTicks,
            ticklinestyle = this._ticklinestyle,
            ticklineopacity = this._ticklineopacity;
			/*
            boardlinestyle = this._boardlinestyle,
		    boardlinevisible = this.boardlinevisible,
			boardlineopacity = this._boardlineopacity,
			boardlineWidth = 0,
            axislineWidth = 0;
			*/
 
		// 8.27
		var smallticklinestyle = this._smallticklinestyle;
		
        if (changedTicks || this._changedTickLabelRotate)
        {
            this._setRange();
            this._setupTickGeneration(clientWidth, clientHeight);
            this._setMinMaxTicks();
            this._setTicks();
            if (this._labelGroup)
                this._labelGroup.clear();
            if (this._tickGroup)
                this._tickGroup.clear();
            if (this._axisLine)
                this._axisLine.clear();
        }

        var ticks = this._ticks,
			tick, value, tickLine, 
			//chart = this.parent,
			//align, 
			tickLabel,
			labeltextfont = this.labeltextfont ? this.labeltextfont.value || this.labeltextfont : "10pt Verdana",
			labeltextcolor = this.labeltextcolor ? this.labeltextcolor.value || this.labeltextcolor : "#000000",
			labelrotate = this.labelrotate,
			textAlign = this._tickLabelTextAlign,
			verticalAlign = this._tickLabelVerticalAlign,
			labelmaxwidth = this.labeltextwidth;
			//checkmaxvalue;

        if (changedTicks && (nexacro._isNull(textAlign) || nexacro._isNull(verticalAlign)))
        {
            this._getTickLabelAlign(labelrotate);
            textAlign = this._tickLabelTextAlign;
            verticalAlign = this._tickLabelVerticalAlign;
        }

        if (changedTicks || this._changedTickStyle 
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
                //checkmaxvalue = value;
                if (changedTicks)
                {
                    tickLine = new nexacro.ChartGraphicsLine();
					// 8.27
                    //tickLine.set_id("ChartTickLineTick" + i);
					tickLine.set_id("ChartTickLineTick" + i + "_" + tick.subindex);
                    this._tickGroup.addChild(tickLine);
                    tick.lineElement =  tickLine;
                    tickLine._axis = this;
					// 8.27
					if(tick.subindex && tick.subindex > 0)
					{
						tickLine.set_strokepen(smallticklinestyle ? smallticklinestyle.value || smallticklinestyle : "1px solid #d0d0d0");
					} 
					else 
					{
						tickLine.set_strokepen(ticklinestyle ? ticklinestyle.value || ticklinestyle : "1px solid #d0d0d0");
					}
                    tickLine.set_opacity(ticklineopacity ? ticklineopacity._sysvalue : 1);
                }
                else
                {
                    if (this._changedTickStyle)
                    {
                        tickLine = tick.lineElement;
                        if (tickLine)
                        {
							if(tick.subindex && tick.subindex > 0)
							{
								tickLine.set_strokepen(smallticklinestyle ? smallticklinestyle.value || smallticklinestyle : "1px solid #d0d0d0");
							}
							else
							{
								tickLine.set_strokepen(ticklinestyle ? ticklinestyle.value || ticklinestyle : "1px solid #d0d0d0");
							}
                            tickLine.set_opacity(ticklineopacity ? ticklineopacity._sysvalue : 1);
                        }
                    }
                }

                if (changedTicks || this._changedTickLabelRotate)
                {
                    tickLabel = new nexacro.ChartGraphicsText(0, 0);
					// 8.27
                    //tickLabel.set_id("ChartAxisLabel" + i);
					tickLabel.set_id("ChartAxisLabel" + i + "_" + tick.subindex);
                    
                    this._labelGroup.addChild(tickLabel);
                    tick.labelElement = tickLabel;
                    tickLabel._axis = this;
					if(tick.subindex && tick.subindex > 0)
					{
						tickLabel.visible = false;
						tickLabel.set_text("");
					}
					else 
					{
						tickLabel.set_text(tick.label);
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
                    if (this._changedTickLabelStyle && !tick.subindex)	// 8.27
                    {
                        tickLabel = tick.labelElement;
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

        this._changedTicks = false;
        this._changedTickStyle = false;
        this._changedBoardLineStyle = false;
        this._changedTickLabelStyle = false;
        this._changedTickLabelRotate = false;

        var info = this._labelGroup.getGlobalBoundRect(false, true);

        this._labelHeight = info.height;
        this._labelWidth = info.width;
    };

    // 축 데이터 <-> 좌표값 변환 함수 정의
    _pChartGaugeValueAxisControl._setTransformationHelpers = function (width, height)
    {
        // TODO 필요한 함수 정리해야함.
        var s, m,
			tickmin = this._min,
			tickmax = this._max;

        if (this.parent)
        {
            if (this.parent.gaugetype == "horizontal")
            {
                s = this._scale = width / Math.abs(tickmax - tickmin);
                m = Math.min(tickmax, tickmin);
            }
            else if (this.parent.gaugetype == "vertical")
            {
                s = this._scale = height / Math.abs(tickmax - tickmin);
                s = -s;
                m = Math.max(tickmax, tickmin);
            }
        }

        // data point를 좌표값으로 변경
        this.p2c = function (p)
        {
            return (p - m) * s;
        };

        // 좌표값을 data point로 변경
        this.c2p = function (c)
        {
            return m + c / s;
        };
    };

    _pChartGaugeValueAxisControl._createAxisLine = function ()
    {
        if (!this._axisLine)
        {
			this._axisLine = new nexacro.ChartGraphicsPaths();
			this._axisLine.set_id("ChartAxisLine");
            if (this._group)
			{
			    this._group.addChild(this._axisLine);
			}
			this._axisLine._axis = this;
        }
    };

    _pChartGaugeValueAxisControl._arrange = function(left, top, width, height)
    {
        if (this.parent && this.parent._rearrange || this._rearrange)
        {
			this._tickgroupHelpers();
            this._arrangeTickGroup(width, height);
            this._arrangeLabelGroup();
        }
       
        this._rearrange = false;
    };

	_pChartGaugeValueAxisControl._tickgroupHelpers = function()
	{
		if(this.parent.gaugetype == "circular")
		{
			var chart = this.parent,
            boardborderWidth = chart._boardBorderWidth ? chart._boardBorderWidth : 1.5,
            boardborderHeight = chart._boardBorderHeight ? chart._boardBorderHeight : 1.5,
            maxRadius = Math.min((chart._boardWidth - (boardborderWidth * 2)), (chart._boardHeight - (boardborderHeight * 2))) / 2,
			radius = 0,
			w = 0,
			centerX = chart._centerLeft,
			centerY = chart._centerTop,
            location = this._location,
            axisgap = +this.gap || 0,
			//s, m, 
			range;
			//tickmin = chart.valueaxes[0]._min,
			//tickmax = chart.valueaxes[0]._max;

            maxRadius -= this._allaxislinegapsize;
            var linewidth = this._linestyle ? this._linestyle._width : 1;
		 
            if (location == "inside")
            {
				var colorRange = this._userrange;
				if(colorRange instanceof Array)
				{
					if (nexacro._ChartGraphicsLib.isEmpty(chart.userrangeinnerradius))
					{
						radius = maxRadius * 0.8;
					}
					else
					{   
						radius = maxRadius * (chart.userrangeinnerradius*0.01);
					}
				}
				else
				{
					if (nexacro._ChartGraphicsLib.isEmpty(chart.seriesset[0]._innerradius))
					{
						radius = maxRadius * 0.8;
					}
					else
					{   
						radius = maxRadius * chart.seriesset[0]._innerradius;
					}
				}
            }
            else
            {
                if (nexacro._ChartGraphicsLib.isEmpty(chart.seriesset[0]._radius))
			    {
				    radius = maxRadius * 0.8;
			    }
			    else
			    {   
                    radius = maxRadius * chart.seriesset[0]._radius;
                }
            }
            radius -= linewidth;

            if (location == "inside")
			{
                w = radius - axisgap;
            } 
			else 
			{
			    w = radius;  
			}
		    
			this.angletox = function(startangle, btickend, binside, baxis)
			{
				range = w;
				if(btickend)
				{
					var ticksize = +this.ticksize || 10;
                    if (!baxis)
                    {
                        if (binside)
						{
                            range -= ticksize;
                        }
						else
						{
					        range += ticksize;
						}
                    }
				}
				return (Math.sin(startangle) * range + centerX);
			};
			this.angletoy = function(startangle, btickend, binside, baxis)
			{
				range = w;
				if(btickend)
				{
					var ticksize = +this.ticksize || 10;
					if (!baxis)
                    {
                        if (binside)
						{
                            range -= ticksize;
						}
                        else
						{
					        range += ticksize;
						}
                    }
				}
				return ((-Math.cos(startangle) * range + centerY));
			};
			this.range = function()
			{
				return w;
			};	
		}
	};

    _pChartGaugeValueAxisControl._arrangeTickGroup = function (width, height)
    {
        var axisLine = this._axisLine,
            //chart = this.parent,
			ticks = this._ticks,
			direction = this._direction,
			location = this._location,
			axislinestyle = this._axislinestyle,
			axislinewidth = 0,
            x = 0, y = 0,
            x2 = 0, y2 = 0,
            axisRectWidth = 0, axisRectHeight = 0,
            tickendspace = this._tickendspace;
			var axisRect = new nexacro.Rect(this._axisRect.x, this._axisRect.y, this._axisRect.width, this._axisRect.height);
            
        if (axisLine)
        {
            axislinewidth = axislinestyle ? axislinestyle._getBorderLeftWidth() : 0;
            axislinewidth *= 0.5;
        }

        // axisLine
        //var tickstartgap = 0;
        //var tickendgap = 0;
        //var charttype = this.parent._type_name;
        //var type = this._type;
        var bstartline = false;
        var binside = location == "inside" ? true : false;

        if (direction == "x")
        {
            x = axisRect.left;
            axisRectWidth = axisRect.width + tickendspace ;

            if (location == "top")
            {
                y = axisRect.bottom - axislinewidth;
            }
            else
            {
                y = axisRect.top + axislinewidth;
            }

            if (axisLine)
            {
                axisLine.clear();
                axisLine.moveTo(x, y);
                axisLine.lineTo(x + axisRectWidth, y);
            }
            this._calcaxisSize(x, y, axisRectWidth, 0);
        }
        else if (direction == "y")
        {
            y = axisRect.top - tickendspace;
			tickendspace = 0;
            axisRectHeight = axisRect.height + /*tickstartgap +*/ tickendspace;

            if (location == "left")
            {
                x = axisRect.right - axislinewidth;
            }
            else
            {
                x = axisRect.left + axislinewidth;
            }

            if (axisLine)
            {
                axisLine.clear();
                axisLine.moveTo(x, y);
                axisLine.lineTo(x, y + axisRectHeight);
            }
            this._calcaxisSize(x, y, 0, axisRectHeight);
        }
        else // this._direction == "circular"
        {
            var j = 0,
			startX,
			startY,
			endX,
			endY;
			
            if (axisLine)
            {
                axisLine.clear();

                for(j = 0; j < ticks.length; j++)
			    {
					if(!ticks[j].axisangleitems) continue;
				    if(j == 0)
				    {
					    startX = this.angletox(ticks[j].axisangleitems.startangle, undefined, binside, true);
					    startY = this.angletoy(ticks[j].axisangleitems.startangle, undefined, binside, true);
					    axisLine.moveTo(startX,startY);
					    ticks[j].axisangleitems.tickstartX = startX;
					    ticks[j].axisangleitems.tickstartY = startY;
					    bstartline = true;
				    }
				    else
				    {
					    if(bstartline)
					    {
						    endX = this.angletox(ticks[j].axisangleitems.startangle, undefined, binside, true);
						    endY = this.angletoy(ticks[j].axisangleitems.startangle, undefined, binside, true);
						    ticks[j].axisangleitems.tickstartX = endX;
						    ticks[j].axisangleitems.tickstartY = endY;
						    var range = this.range();

						    axisLine.arcTo(new nexacro.Point(endX, endY),new nexacro._ChartGraphicsSize(range,range),1,1,0);
					    }
				    }
			    }
            }
            this._calcaxisSize(axisLine.x1, axisLine.y1, axisLine.x2 - axisLine.x1, axisLine.y2 - axisLine.y1);
        }


        // ticks
        var tick,
			value,
			ticksize,
			tickXoff = 0,
			tickYoff = 0,
			tickmin = this._min,
            tickmax = this._max,
            tickminx = -1,
            tickminy = -1,
            tickmaxwidth = -1,
            tickmaxheight = -1,
			vc = 0,
            is_circle = false;

        if ((this.ticksize == "" || this.ticksize == undefined) && this.ticksize !== 0)
        {
            ticksize = 10;
        }
        else
        {
            ticksize = this.ticksize;
        }

        if (ticksize > 0)
        {
            if (location == "top")
            {
                tickYoff = -ticksize;
                y -= axislinewidth;
            }
            else if (location == "bottom")
            {
                tickYoff = ticksize;
                y += axislinewidth;
            }
            else if (location == "left")
            {
                tickXoff = -ticksize;
                x -= axislinewidth;
            }
            else if (location == "right")
            {
                tickXoff = ticksize;
                x += axislinewidth;
            }
        }

		//var xtickendspace = this.parent.valueaxes[0]._tickendspace;
		//var ytickendspace = this.parent.valueaxes[0]._tickendspace;

        for (var i = 0; i < ticks.length; i++)
        {
            tick = ticks[i].lineElement;
            value = ticks[i].v;

            if (isNaN(value) || value < tickmin || value > tickmax)
            {
                continue;
            }

            if (this._direction == "x")
            {
                vc = this.p2c(value);
                x = vc + axisRect.left;

                if (x == axisRect.left)
                {
                    // var temp = 0;
                }
                else if (Math.floor(x) == Math.floor(axisRect.right))
                {
                    x -= tick._strokewidth;
                }

                ticks[i]._point = { "x1": x, "y1": y, "x2": x + tickXoff, "y2": y + tickYoff };
            }
            else if (this._direction == "y")
            {
                vc = this.p2c(value);
                y = vc + axisRect.top;
                ticks[i]._point = { "x1": x, "y1": y, "x2": x + tickXoff, "y2": y + tickYoff };
            }
            else // this._direction == "circular"
            {
				if(!ticks[i].axisangleitems) continue;
                if (i == 0 && this.parent.seriesset[0] && this.parent.seriesset[0]._endangle && Math.floor(this.parent.seriesset[0]._endangle * 180/Math.PI) == 360)
                    is_circle = true;

                x = ticks[i].axisangleitems.tickstartX;
				y = ticks[i].axisangleitems.tickstartY;
				
				x2 = this.angletox(ticks[i].axisangleitems.startangle, true, binside);
				y2 = this.angletoy(ticks[i].axisangleitems.startangle, true, binside);
				ticks[i]._point = { "x1": x, "y1": y, "x2": x2, "y2": y2 };
            }
    
            // ticks[i]._point = { "x1": x, "y1": y, "x2": x + tickXoff, "y2": y + tickYoff };
            if (tick)
            {
                if (this._direction == "x")
                {
                    tick.set_x1(x);
                    tick.set_y1(y);
                    tick.set_x2(x);
                    tick.set_y2(y + tickYoff);
                }
                else if (this._direction == "y")
                {
                    tick.set_x1(x);
                    tick.set_y1(y);
                    tick.set_x2(x + tickXoff);
                    tick.set_y2(y);
                }
                else // this._direction == "circular"
                {
                    if (!is_circle)
                    {
                        tick.set_x1(ticks[i]._point.x1);
                        tick.set_y1(ticks[i]._point.y1);
                        tick.set_x2(ticks[i]._point.x2);
                        tick.set_y2(ticks[i]._point.y2);
                    }
                }
//tick.set_strokepen("3px solid red");

                if (i == 0 && is_circle)
                {
                    x = ticks[i]._point.x1;
                    x2 = ticks[i]._point.x2;
                    y = ticks[i]._point.y1;
                    y2 = ticks[i]._point.y2;
                    
                    if (tickminx == -1)
                        tickminx = x;
                    if (tickminy == -1)
                        tickminy = y;
                    if (tickmaxwidth == -1)
                        tickmaxwidth = x2 - x;
                    if (tickmaxheight == -1)
                        tickmaxheight = y2 - y;
                
                    tickminx = Math.min(tickminx, x);
                    tickminy = Math.min(tickminy, y);
                    tickmaxwidth = Math.max(tickmaxwidth, x2 - x);
                    tickmaxheight = Math.max(tickmaxheight, y2 - y);
                }
                else
                {
                    if (tickminx == -1)
                        tickminx = tick.x1;
                    if (tickminy == -1)
                        tickminy = tick.y1;
                    if (tickmaxwidth == -1)
                        tickmaxwidth = tick.x2 - tick.x1;
                    if (tickmaxheight == -1)
                        tickmaxheight = tick.y2 - tick.y1;
                
                    tickminx = Math.min(tickminx, tick.x1);
                    tickminy = Math.min(tickminy, tick.y1);
                    tickmaxwidth = Math.max(tickmaxwidth, tick.x2 - tick.x1);
                    tickmaxheight = Math.max(tickmaxheight, tick.y2 - tick.y1);
                }
                //trace(tickminx + ", " + tickminy + ", " + tickmaxwidth + ", " + tickmaxheight);
            }
            if (is_circle)
                is_circle = false;
        }
        this._calcaxisSize(tickminx, tickminy, tickmaxwidth, tickmaxheight);
    };

    _pChartGaugeValueAxisControl._arrangeLabelGroup = function()
    {
         var ticks = this._ticks,
			tick, labelEle,
			//dX = 0, 
			textW = 0,
            textH = 0,
			x = 0, y = 0,
			value,
			labelrotate = this.labelrotate,
			location = this._location,
			labelgap = +this._labelgap,
			labelBoundRect,
			axislinestyle = this._axislinestyle,
			axislinewidth = 0,
            ticksize,
            _ticksize,
			tickGroupSize = 0,
			ticklinestyle = this._ticklinestyle,
			ticklinewidth = 0,
            labelminx = -1,
            labelminy = -1,
            labelmaxwidth = -1,
            labelmaxheight = -1,
            axisRect = new nexacro.Rect(this._axisRect.x, this._axisRect.y, this._axisRect.width, this._axisRect.height),
            is_circle = false;

        axislinewidth = axislinestyle ? axislinestyle._getBorderLeftWidth() : 1;
        ticklinewidth = ticklinestyle ? ticklinestyle._getBorderLeftWidth() : 1;

		/*
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
		*/

        if ((this.ticksize == "" || this.ticksize == undefined) && this.ticksize !== 0)
        {
            _ticksize = 10;
        }
        else
        {
            _ticksize = this.ticksize;
        }
        ticksize = +_ticksize;

        if (ticklinewidth < 1)
        {
            ticksize = 0;
        }

        tickGroupSize = axislinewidth + ticksize;
        //ticklinewidth *= 0.5;
		
		// 8.27
		var chart = this.parent;
		var _centerX = chart._centerLeft;
		var _centerY = chart._centerTop;
		var boardborderWidth = chart._boardBorderWidth ? chart._boardBorderWidth : 0;
		var boardborderHeight = chart._boardBorderHeight ? chart._boardBorderHeight : 0;		
		var maxRadius = Math.min((chart._boardWidth - (boardborderWidth * 2)), (chart._boardHeight - (boardborderHeight * 2))) / 2;
		var seriesset = chart.seriesset[0];
		maxRadius -= (seriesset._allaxisgapsize ? seriesset._allaxisgapsize : 0) ;
		var _startangle = seriesset.startangle;
		var _endangle = seriesset.endangle;
		
		var divOne = 0;
		if(ticks.length > 0) divOne = _endangle / (ticks[0].total - 1);
		
		var svMaxRadius = maxRadius;
		if (location == "inside")
		{
			var innerradius = (seriesset._innerradius?seriesset._innerradius:1);
			var userrangeradius = (seriesset.userrangeinnerradius?(seriesset.userrangeinnerradius*0.01):1);
			if(!seriesset.userrange || seriesset.userrange == "") userrangeradius = 1;
			if(innerradius >= userrangeradius)
			{
				svMaxRadius = maxRadius * userrangeradius;
			}
			else if(innerradius < userrangeradius)
			{
				svMaxRadius = maxRadius * innerradius;
			}
			svMaxRadius = svMaxRadius - (this.gap?this.gap:1) - (this.labelgap?this.labelgap:1);	// - ticksize;
		} else {
			if (nexacro._ChartGraphicsLib.isEmpty(chart.seriesset[0]._radius))
			{
				svMaxRadius = maxRadius * 0.8;
			}
			else
			{
				svMaxRadius = maxRadius * chart.seriesset[0]._radius;
			}
			svMaxRadius = svMaxRadius - ticksize - (seriesset.gap?seriesset.gap:1) - 10 + (seriesset.labelgap?seriesset.labelgap:1);
		}

        for (var i = 0; i < ticks.length; i++)
        {
            tick = ticks[i];
			if(!tick) continue;
			if(!tick._point) continue;

            labelEle = tick.labelElement;
            value = tick.v;
            //dX = 0;

            if (nexacro._ChartGraphicsLib.isEmpty(tick.label) || nexacro._ChartGraphicsLib.isEmpty(labelEle) || value < this._min || value > this._max)
            {
                continue;
            }

            labelBoundRect = labelEle.getGlobalBoundRect();
            textW = labelBoundRect.width;
            textH = labelBoundRect.height;
            var pos = labelEle.getCenter();
            //trace("textW,H", textW, textH);

            if (this._direction == "x")
            {
                x = tick._point.x1;
                labelEle.set_x(x);
                //pos = labelEle.getCenter();
				var cx = pos.x;
				
				var _txtWidthHalf =  (labelEle._txtSize[0] || textW)/2;
				if(x <= axisRect.left)
				{
					 if(cx - (_txtWidthHalf) < 0)
					 {			
						//labelEle.set_x(axisRect.left + (Math.abs(cx - _txtWidthHalf)));
                        labelEle.set_x(axisRect.left + (x + _txtWidthHalf));
					 }
				}
				else if(cx >= Math.floor(axisRect.right))
				{
					 var rectwidth = this.parent._getClientWidth();
					 if(cx + (_txtWidthHalf) > rectwidth)
					 {			
						labelEle.set_x(axisRect.right - ((cx + _txtWidthHalf)-rectwidth));
					 }
				}
                if (location == "bottom")
                {
                    y = axisRect.top + tickGroupSize + labelgap;
                }
                else
                {
                    y = axisRect.top + axisRect.height - tickGroupSize - labelgap;
                    if (labelrotate == 0)
                    {
                        y = y - textH;
                    }
                }

                labelEle.set_textAlign(this._tickLabelTextAlign);
                labelEle.set_verticalAlign(this._tickLabelVerticalAlign);
                labelEle.set_y(y);
            }
            else if (this._direction == "y")
            {
                y = tick._point.y1;
                labelEle.set_y(y);
                //pos = labelEle.getCenter();
				var cy = pos.y;
				var _txtHeightHalf =  (labelEle._txtSize[1] || textH)/2;
				
				if(y <= axisRect.top)
				{
					 if(y - _txtHeightHalf < 0)
					 {			
						labelEle.set_y(axisRect.top + Math.abs(y - _txtHeightHalf));
					 }
				}
				else if(y == axisRect.bottom)
				{
					 var rectheight = this.parent._getClientHeight();
					 if(cy + _txtHeightHalf > rectheight)
					 {			
						labelEle.set_y(axisRect.bottom - ((cy + _txtHeightHalf)-rectheight));
					 }
				}
                if (location == "right")
                {
                    x = axisRect.left + tickGroupSize + labelgap;
                }
                else
                {
                    x = axisRect.left + axisRect.width - tickGroupSize - labelgap;
                    if (labelrotate == 0)
                    {
                        x = x - textW;
                    }
                }

                labelEle.set_textAlign(this._tickLabelTextAlign);
                labelEle.set_verticalAlign(this._tickLabelVerticalAlign);
                labelEle.set_x(x);
				
            }
            else // this._direction == "circular"
            {
				/*
				var centerX = chart._centerLeft,
				centerY = chart._centerTop,
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
				targetY = 0;
				*/
				
				var angleitem = tick.axisangleitems;
				var tickpos = tick._point;

                if (i == 0 && this.parent.seriesset[0] && this.parent.seriesset[0]._endangle && Math.floor(this.parent.seriesset[0]._endangle * 180/Math.PI) == 360)
                    is_circle = true;

				// 8.27
				if(angleitem && !tick.subindex)
				{ 
					//labelBoundRect = labelEle.getGlobalBoundRect();
					//textW = labelBoundRect.width;
					//textH = labelBoundRect.height;
            
					x = Math.floor(tickpos.x2 * 1000)/1000;
					y = Math.floor(tickpos.y2 * 1000)/1000;
				
					labelBoundRect = labelEle.getGlobalBoundRect();
					textW = labelBoundRect.width;
					textH = labelBoundRect.height;

					//var _txtHeight =  (labelEle._txtSize[1] || textH),
					//_txtWidth =  (labelEle._txtSize[0] || textW);
					var textAlign = "center";
					var verticalAlign = "middle";
					
					labelEle.set_verticalAlign(verticalAlign);
					labelEle.set_textAlign(textAlign);

					/*
					startangle = angleitem.startangle * 180 / Math.PI;
					ptPos = {x:x,y:y};
					originpoint = { x: centerX, y: centerY };
					vPoint = {x:0,y:0};
					vUnit = getUnitVector(ptPos, originpoint);
                
                    if (!is_circle)
                    {
					    labelEle.set_x(x);
					    labelEle.set_y(y);
                    }
					*/
					var _startAngle = (_startangle + (tick.index*divOne));
					if(_startAngle > 360) _startAngle = _startAngle - 360;
					_startAngle = _startAngle * Math.PI / 180;
					
					var _x = Math.sin(_startAngle) * svMaxRadius + _centerX;
					var _y = -Math.cos(_startAngle) * svMaxRadius + _centerY;
					
					labelEle.set_x(_x);
					labelEle.set_y(_y);		
						
					if(labelgap != 0)
					{

							
						//---------------------------------------------------------------------------------
						// 원본
						//---------------------------------------------------------------------------------
						/*
                        if (location == "inside")
                        {
						    rotateX = ptPos.x + (-vUnit.x) * labelgap;
						    rotateY = ptPos.y + (-vUnit.y) * labelgap;
				
						    if ((0 <= Number(startangle) && Number(startangle) < 90) || ((360 <= Number(startangle) && Number(startangle) < 450) && !(360 < Number(startangle) && Number(startangle) < 361)))
						    {
							    targetX = rotateX - labelgap;
						    }
						    else if ((90 <= Number(startangle) && Number(startangle) < 180) || (450 <= Number(startangle) && Number(startangle) < 540))
						    {
							    targetX = rotateX - labelgap;
						    }
						    else if ((180 <= Number(startangle) && Number(startangle) < 270) || (540 <= Number(startangle) && Number(startangle) < 630))
						    {
							    targetX = rotateX + labelgap;
						    }
                            else if (360 < Number(startangle) && Number(startangle) < 361)
                            {
                                targetX = rotateX;// - (labelgap / 2);
                            }
						    else
						    {
							    targetX = rotateX + labelgap;
						    }
						    targetY = rotateY;
				
                            if (!is_circle)
                            {
						        labelEle.set_x(targetX);
						        labelEle.set_y(targetY);
                            }
							console.log("tick====", tick, "targetX", targetX, targetY , "labelgap", labelgap,  "rotateX", rotateX, rotateY);
                        }
                        else
                        {
                            rotateX = ptPos.x + vUnit.x * labelgap;
						    rotateY = ptPos.y + vUnit.y * labelgap;
				
						    if ((0 <= Number(startangle) && Number(startangle) < 90) || ((360 <= Number(startangle) && Number(startangle) < 450) && !(360 < Number(startangle) && Number(startangle) < 361)))
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
                            else if (360 < Number(startangle) && Number(startangle) < 361)
                            {
                                targetX = rotateX;// - (labelgap / 2);
                            }
						    else
						    {
							    targetX = rotateX - labelgap;
						    }
						    targetY = rotateY;
				
                            if (!is_circle)
                            {
						        //labelEle.set_x(targetX);
						        //labelEle.set_y(targetY);
                            }
                        }
						*/
					}
				}
            }

			// 8.27
			if(!tick.subindex)
			{
				if (labelminx == -1)
					labelminx = x;
				if (labelminy == -1)
					labelminy = y;
				if (labelmaxwidth == -1)
					labelmaxwidth = textW;
				if (labelmaxheight == -1)
					labelmaxheight = textH;
					
				labelminx = Math.min(labelminx, tick._point.x1);
				labelminy = Math.min(labelminy, tick._point.y1);
				labelmaxwidth = Math.max(labelmaxwidth, textW);
				labelmaxheight = Math.max(labelmaxheight, textH);
			}

            if (is_circle)
                is_circle = false;
        }

        this._calcaxisSize(labelminx, labelminy, labelmaxwidth, labelmaxheight);
    };

    _pChartGaugeValueAxisControl._calcaxisSize = function (x, y, width, height)
    {
        var size = this._axissize,
        old_x = size.x,
        old_y = size.y,
        old_width = size.width,
        old_height = size.height;
        
        if (old_x != x)
        {
            if (x >= 0)
            {
                size.x = Math.min(old_x, x);
            }
        }

        if (old_y != y)
        {
            if (y >= 0)
            {
                size.y = Math.min(old_y, y);
            }
        }

        if (old_width != width)
        {
            if (width < 0)
                width = Math.abs(width);
            size.width = size.width + width;
        }

        if (old_height != height)
        {
            if (height < 0)
                height = Math.abs(height);
            size.height = size.height + height;
        }
    };

    _pChartGaugeValueAxisControl._setRange = function ()
    {
        var tickmin,
			tickmax,
			//dMin, dMax,
			delta;

        tickmin = +(this._tickmin != null ? this._tickmin : this._datamin);
        tickmax = +(this._tickmax != null ? this._tickmax : this._datamax);
      
        if (this._scrollMin || this._scrollMax)
        {
            tickmin = this._scrollMin;
            tickmax = this._scrollMax;

            this._scrollMin = null;
            this._scrollMax = null;
        }

        delta = tickmax - tickmin;
		if (delta == 0.0)
        {
            var val = 0;

            if (this.parent.seriesset[0] && this.parent.seriesset[0]._datapoints && this.parent.seriesset[0]._datapoints.points[1])
                val = this.parent.seriesset[0]._datapoints.points[1];
            if (tickmax == 0)
            {
                tickmax = 0;
                if (val >= 0)
                {
                    tickmax = val > tickmax ? val : tickmax;
                }
            }

            if (tickmin == 0)
            {
                if (val >= 0)
                {
                    tickmin = 0;
                }
                else
                {
                    tickmin = val;
                }
            }
        }
        else
        {
            var tickscale = this.autotickscale ? this.autotickscale * 0.01 : 0;
			if (this._tickmin == null)
			{
				tickmin -= delta * tickscale;
				if (tickmin < 0 && this._datamin != null && this._datamin >= 0)
				{
					tickmin = 0;
				}
			}

			if (this._tickmax == null)
			{
				tickmax += delta * tickscale;
				if (tickmax > 0 && this._datamax != null && this._datamax <= 0)
				{
					tickmax = 0;
				}
			}
        }
		
        this._min = tickmin;
        this._max = tickmax;
    };

}
 
if (!nexacro.ChartGaugeIndicatorControl)
{
    //==============================================================================
    // nexacro.ChartGaugeIndicatorControl
    //==============================================================================
 
    nexacro.ChartGaugeIndicatorControl = function (id, parent, graphicsControl)
    {
        this.id = id;
        this.parent = parent;
        this._graphicsControl = graphicsControl;
        this._src = null;
		
		// 8.27
		this.linetype = true;

        this._createGroup();
    };
 
    var _pChartGaugeIndicatorControl = nexacro.ChartGaugeIndicatorControl.prototype = nexacro._createPrototype(nexacro.Object, nexacro.ChartGaugeIndicatorControl);
    //nexacro.ChartGaugeIndicatorControl.prototype = _pChartGaugeIndicatorControl;
    _pChartGaugeIndicatorControl._type_name = "ChartGaugeIndicatorControl";
 
    /* graphics group */
    _pChartGaugeIndicatorControl._group = null;
    _pChartGaugeIndicatorControl._indicatorBarRect = null;
	_pChartGaugeIndicatorControl._indicatorBarAngle = null;	// 8.27
	_pChartGaugeIndicatorControl._indicatorCenterPin = null;	// 8.27
    _pChartGaugeIndicatorControl._calcpos = 0;
    _pChartGaugeIndicatorControl._indent = 0;
	_pChartGaugeIndicatorControl._indentouter = 0;	// 8.27
    _pChartGaugeIndicatorControl._image = "";
    _pChartGaugeIndicatorControl._imagewidth = undefined;
    _pChartGaugeIndicatorControl._imageheight = undefined;
    _pChartGaugeIndicatorControl._imageloaded = false;
    _pChartGaugeIndicatorControl._oldrotate = 0;

    /* default properties */
    _pChartGaugeIndicatorControl.visible = false;
    _pChartGaugeIndicatorControl.fillstyle = "";
	_pChartGaugeIndicatorControl.centerpinstyle = "";	//"linear-gradient(to bottom,#ddffff 23%, #0000ff 100%)";	// 8.27
	_pChartGaugeIndicatorControl.centerpinradius = 0;	// 8.27
	_pChartGaugeIndicatorControl.centerpinautogradation = "none";	// 8.27
    _pChartGaugeIndicatorControl.linestyle = "";
    _pChartGaugeIndicatorControl.opacity = 1;
    _pChartGaugeIndicatorControl.size = 0;
    _pChartGaugeIndicatorControl.indent = 0;
	_pChartGaugeIndicatorControl.indentouter = 0;	// 8.27
    _pChartGaugeIndicatorControl.image = "";
    _pChartGaugeIndicatorControl.imagewidth = undefined;
    _pChartGaugeIndicatorControl.imageheight = undefined;

    //===============================================================
    // nexacro._pChartGaugeIndicatorControl : Logical part
    //===============================================================
    _pChartGaugeIndicatorControl.destroy = function ()
    {
        var group = this._graphicsControl.getObjectByID("ChartIndicatorGroup");
        if (group)
        {
            this._graphicsControl.removeChild(group);
            group.clear();
            this._group.destroy();
        }

        this._group = null;
        this._indicatorBarRect = null;
		this._indicatorBarAngle = null;	// 8.27
		this._indicatorCenterPin = null;	// 8.27
        this._calcpos = null;
        this._indent = null;
		this._indentouter = null;
        this._image = null;
        this._imagewidth = null;
        this._imageheight = null;
        this._imageloaded = null;
        this._oldrotate = null;

        /* default properties */
        this.visible = null;
        this.fillstyle = null;
		this.linetype = null;	// 8.27
		this.centerpinstyle = null;	// 8.27
		this.centerpinradius = null;	// 8.27
		this.centerpinautogradation = null;	// 8.27
        this.linestyle = null;
        this.opacity = null;
        this.size = null;
        this.indent = null;
		this.indentouter = null;
        this.image = null;
        this.imagewidth = null;
        this.imageheight = null;

        if (this.parent)
        {
            if (this.parent.indicator)
            {
                this.parent._deleteContentsProp("indicator");
                this.parent.indicator = null;
            }
            this.parent._changedData = true;
            this.parent = null;
        }

        nexacro.Object.prototype.destroy.call(this);

        return true;
    };

    _pChartGaugeIndicatorControl._clear = function ()
    {
        if (this._oldrotate)
        {
			// 8.27
			var items = [this._indicatorBarRect, this._indicatorBarAngle, this._indicatorCenterPin, this._image];
			for(var i=0;i<items.length;i++)
			{
			    items[i]._matrix.reset();
                items[i]._matrix.set_translateX(0);
                items[i]._matrix.set_translateY(0);
                items[i].setTransform("translate(" + 0 + "," + 0 + ")");			
			}
			//items = null;
 
            this._oldrotate = 0;
        }
    };
   _pChartGaugeIndicatorControl.set_centerpinautogradation = function (val)
    {
		if(val === undefined || val === null) val = "none";
        if (this.centerpinautogradation != val)
        {
			this._changeContentsProperty("centerpinautogradation", val, this.centerpinautogradation);
			this.centerpinautogradation = val;
			this.on_apply_centerpinautogradation(val);
        }
        this.parent._draw();
    };

    _pChartGaugeIndicatorControl.on_apply_centerpinautogradation = function (on_apply_centerpinautogradation)
    {
    };	
	// 8.27
   _pChartGaugeIndicatorControl.set_linetype = function (val)
    {
		if (this.parent.gaugetype == "vertical" || this.parent.gaugetype == "horizontal") return;
		
		if (val === "false") val = false;
        if (val === undefined || val === null || val === "")
        {
            val = true;
        }

        val = nexacro._toBoolean(val);
        if (this.linetype != val)
        {
            this._changeContentsProperty("linetype", val, this.linetype);
            this.linetype = val;
            this.on_apply_linetype(val);
        }

        this.parent._draw();
     };
    _pChartGaugeIndicatorControl.on_apply_linetype = function (val)
    {
        if (this._group)
        {
			if(val == true)
			{
				this._indicatorBarRect.set_visible(true);
				this._indicatorBarAngle.set_visible(false);
			}
			else
			{
				this._indicatorBarRect.set_visible(false);
				this._indicatorBarAngle.set_visible(true);
			}
			if(this.centerpinradius == 0)
			{
				this._indicatorCenterPin.set_visible(false);
			}
			else
			{
				this._indicatorCenterPin.set_visible(true);
			}
            this.parent._rearrange = true;
        }	
    };
    // visible
    _pChartGaugeIndicatorControl.set_visible = function (val)
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

        this.parent._draw();
    };

    _pChartGaugeIndicatorControl.on_apply_visible = function (visible)
    {
        if (this._group)
        {
            this._group.set_visible(visible);
            this.parent._rearrange = true;
        }
    };

	// 8.27
    _pChartGaugeIndicatorControl.set_centerpinradius = function (val)
    {
        if (val !== undefined)
        {
            if (isNaN(val) || val < 0)
            {
                val = 10;
            }

            if (val != "")
            {
                val = parseInt(val);
            }
        }
		else
		{
			val = 10;
		}

        if (this.centerpinradius !== val)
        {
            this._changeContentsProperty("centerpinradius", val, this.centerpinradius);
            this.centerpinradius = val;
            this.on_apply_centerpinradius(val);
        }

        this.parent._draw();
    };

    _pChartGaugeIndicatorControl.on_apply_centerpinradius = function (centerpinradius)
    {
		if (this.parent.gaugetype != "vertical" && this.parent.gaugetype != "horizontal")
		{
			if(centerpinradius == 0)
			{
				this._indicatorBarRect.set_visible(false);
			}
			else
			{
				this._indicatorBarRect.set_visible(true);
			}
		}
        this.parent._rearrange = true;
    };
	
    _pChartGaugeIndicatorControl.set_size = function (val)
    {
        if (val !== undefined)
        {
            if (isNaN(val) || val < 0)
            {
                return;
            }

            if (val != "")
            {
                val = parseInt(val);
            }
        }

        if (this.size !== val)
        {
            this._changeContentsProperty("size", val, this.size);
            this.size = val;
            this.on_apply_size(val);
        }

        this.parent._draw();
    };

    _pChartGaugeIndicatorControl.on_apply_size = function (size)
    {
        if (!nexacro._ChartGraphicsLib.isEmpty(size))
        {
            this._size = this.size;
        }
        else
        {
            this._size = 5;
        }

        this.parent._rearrange = true;
    };

    _pChartGaugeIndicatorControl.set_linestyle = function (val)
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

        this.parent._draw();
    };

    _pChartGaugeIndicatorControl.on_apply_linestyle = function (linestyle)
    {
        if (linestyle)
        {
            this._borderwidth = linestyle._width;
            this._indicatorBarRect.set_strokepen(linestyle);
			this._indicatorBarAngle.set_strokepen(linestyle);	// 8.27
        }
        else
        {
            this._borderwidth = 1;
        }
    };

    _pChartGaugeIndicatorControl.set_fillstyle = function (val)
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

                var fillstyle = nexacro.BackgroundObject(val, this);
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

        this.parent._draw();
    };

    _pChartGaugeIndicatorControl.on_apply_fillstyle = function (fillstyle)
    {
		this._indicatorBarRect.set_fillstyle(fillstyle ? fillstyle.value || fillstyle : "");
		this._indicatorBarAngle.set_fillstyle(fillstyle ? fillstyle.value || fillstyle : "");	// 8.27
    };

	// 8.27
   _pChartGaugeIndicatorControl.set_centerpinstyle = function (val)
    {
		if(val == "") val = null;
        this.centerpinstyle = val;

        if (val)
        {
            if (this._centerpinstyle == null || this._centerpinstyle.value != val)
            {
                var oldValue;
                if (this._centerpinstyle)
                {
                    oldValue = this.centerpinstyle.value;
                }
                this._changeContentsProperty("centerpinstyle", val, oldValue);

                var fillstyle = nexacro.BackgroundObject(val, this);
                this._centerpinstyle = fillstyle;
                this.on_apply_centerpinstyle(fillstyle);
            }
        }
        else
        {
            if (this._centerpinstyle)
            {
                this._centerpinstyle = null;
                this.on_apply_centerpinstyle(null);
            }
        }

        this.parent._draw();
    };

    _pChartGaugeIndicatorControl.on_apply_centerpinstyle = function (fillstyle)
    {
        this._indicatorCenterPin.set_fillstyle(fillstyle ? fillstyle.value || fillstyle : "");
    };	

    _pChartGaugeIndicatorControl.set_opacity = function (val)
    {
        this.opacity = val;
        if (0 === val || val)
        {
            if (this._opacity == null || this._opacity.value != val)
            {
                var opacity = nexacro.OpacityObject(val);
                this._opacity = opacity;
                this.on_apply_opacity(opacity);
            }
        }
        else
        {
            if (this._opacity)
            {
                this._opacity = null;
                this.on_apply_opacity(null);
            }
        }
    };

    _pChartGaugeIndicatorControl.on_apply_opacity = function (opacity)
    {
        this._indicatorBarRect.set_opacity(opacity ? opacity._sysvalue || opacity : 1);
		this._indicatorBarAngle.set_opacity(opacity ? opacity._sysvalue || opacity : 1);	// 8.27
    };

    _pChartGaugeIndicatorControl.set_indent = function (val)
    {
        var IVal = null;
        if (val !== undefined && val !== null && val != "")
        {
            if (nexacro._isNumber(val))
            {
                IVal = val;
            }
            else
            {
                if (val.length > 0)
                {
                    IVal = +val;
                    if (isNaN(IVal))
                    {
                        return;
                    }
                }
            }
        }

        if (IVal < 0 || IVal > 100) // check
        {
            return;
        }

        if (this.indent != val)
        {
            this._changeContentsProperty("indent", val, this.indent);
            this.indent = val;
            this.on_apply_indent(IVal);
        }

        this.parent._draw();
    };

    _pChartGaugeIndicatorControl.on_apply_indent = function (indent)
    {
        if (indent)
        {
            this._indent = indent;
            this.parent._rearrange = true;
        }
    };
	
	// 8.27
    _pChartGaugeIndicatorControl.set_indentouter = function (val)
    {
        var IVal = null;
        if (val !== undefined && val !== null && val != "")
        {
            if (nexacro._isNumber(val))
            {
                IVal = val;
            }
            else
            {
                if (val.length > 0)
                {
                    IVal = +val;
                    if (isNaN(IVal))
                    {
                        return;
                    }
                }
            }
        }

        if (IVal < 0 || IVal > 100) // check
        {
            return;
        }

        if (this.indentouter != val)
        {
            this._changeContentsProperty("indentouter", val, this.indentouter);
            this.indentouter = val;
            this.on_apply_indentouter(IVal);
        }

        this.parent._draw();
    };

    _pChartGaugeIndicatorControl.on_apply_indentouter = function (indent)
    {
		this._indentouter = indent;
        this.parent._rearrange = true;
    };	

    _pChartGaugeIndicatorControl.set_image = function (val)
    {
        if (this.image != val)
        {
            this._changeContentsProperty("image", val, this.image);
            this.image = val;
            this._image._redrawparent = this;
            this._image._redrawcallback = this.onloadedindicatorimgs;
            
            this.on_apply_image(val);

            if (this._image)
            {
                if (this._image.width > 0)
                    this.on_apply_imagewidth(this._image.width);
                if (this._image.height > 0)
                    this.on_apply_imageheight(this._image.height);
            }
        }
    };

    _pChartGaugeIndicatorControl.on_apply_image = function (image)
    {
        if (image)
        {
            this._image.set_src(image);
        }
    };

    _pChartGaugeIndicatorControl.on_apply_imagewidth = function (imagewidth)
    {
        this._image.set_width(imagewidth);
        this._rearrange = true;
    };

    _pChartGaugeIndicatorControl.on_apply_imageheight = function (imageheight)
    {
        this._image.set_height(imageheight);
        this._rearrange = true;
    };

    _pChartGaugeIndicatorControl.onloadedindicatorimgs = function ()
    {
        if (this._image)
        {
            this._imageloaded = true;
        }
        this.parent._rearrange = true;
        this.parent._draw();
    };

    _pChartGaugeIndicatorControl._changeContentsProperty = function (nm, newVal, oldVal)
    {
        // trace("_changeContentsProperty Legend:", nm, "newVal", newVal, "oldVal", oldVal);
        var contents = this.parent.contents;
        if (contents && contents.indicator)
        {
            contents.indicator[nm] = newVal;
        }
    };

    _pChartGaugeIndicatorControl._createGroup = function ()
    {
        this._group = new nexacro.ChartGraphicsGroup();
        this._group.set_id("ChartIndicatorGroup");
        this._graphicsControl.addChild(this._group);

        this._indicatorBarRect = new nexacro.ChartGraphicsRect(0, 0, 0, 0);
        this._indicatorBarRect.set_id("ChartindicatorBarRect");
        this._group.addChild(this._indicatorBarRect);
		
		// 8.27
        this._indicatorBarAngle = new nexacro.ChartGraphicsPath();
        this._indicatorBarAngle.set_id("ChartindicatorBarAngle");
        this._group.addChild(this._indicatorBarAngle);
		
        this._indicatorCenterPin = new nexacro.ChartGraphicsPath();
        this._indicatorCenterPin.set_id("ChartindicatorCenterPin");
        this._group.addChild(this._indicatorCenterPin);
		
		if (this.parent.gaugetype == "vertical" || this.parent.gaugetype == "horizontal")
		{
			this._indicatorBarAngle.visible = false;
			this._indicatorCenterPin.visible = false;
		}

		this._createImage();
    };

    _pChartGaugeIndicatorControl._createImage = function ()
    {
        this._image = new nexacro.ChartGraphicsImage(0, 0);
        this._image.set_id("ChartChangeIndicatorImage");
        this._image._owner = this;
        this._group.addChild(this._image);
    };

    _pChartGaugeIndicatorControl._afterSetProperties = function ()
    {
        this.on_apply_size(this._size);
        this.on_apply_linestyle(this._linestyle);
        this.on_apply_fillstyle(this._fillstyle);
        this.on_apply_opacity(this._opacity);

        this.on_apply_indent(this._indent);
		this.on_apply_indentouter(this._indentouter);
        this.on_apply_image(this.image);
    };

    _pChartGaugeIndicatorControl._drawindicator = function (left, top, width, height)
    {
        // indicator 계산.
        if (!this.visible)
            return;

        var linestyle = this._linestyle || "1px solid green"; // || "1px solid " + this._color
        var fillstyle = this._fillstyle || "green";
        var opacity = this._opacity || 0.5;
		
		var indentouter = this._indentouter;	// 8.27 
        var size,
        indent = this._indent,
        indicatorBarRect = null;

        if ((this._size == "" || this._size == undefined) && this._size !== 0)
        {
            size = 5;
        }
        else
        {
            size = this._size;
        }

        if (this.parent)
        {
            var chart = this.parent;
            if (!chart.seriesset[0] || this.image && !this._imageloaded)
                return;

            if (this.image && this._image)
            {
                this._image.visible = true;
                indicatorBarRect = this._image;
                this._indicatorBarRect.visible = false;
				this._indicatorBarAngle.visible = false;	// 8.27
            }
            else
            {
				indicatorBarRect = this._indicatorBarRect;
				if (this.parent.gaugetype == "vertical" || this.parent.gaugetype == "horizontal")
				{
					this._indicatorBarAngle.visible = false;
					this._indicatorCenterPin.visible = false;
				}
				else
				{
					if(this.centerpinradius > 0)
					{
						this._indicatorCenterPin.visible = true;
					}
					else
					{
						this._indicatorCenterPin.visible = false;
					}
					if(this.linetype == true) 
					{
						this._indicatorBarRect.visible = true;
						this._indicatorBarAngle.visible = false;
					} 
					else 
					{
						this._indicatorBarRect.visible = false;
						this._indicatorBarAngle.visible = true;
						indicatorBarRect = this._indicatorBarAngle;
					}				
				}
               
                this._image.visible = false;
            }
            
            if (chart.gaugetype == "vertical")
            {
                indicatorBarRect.set_x(left + chart._boardRectLeft); // translate 하는만큼 x값을 보정해야함. here
                indicatorBarRect.set_y(top - (size / 2) + chart._boardRectTop);
                indicatorBarRect.set_width(width);
                indicatorBarRect.set_height(size);
            }
            else if (chart.gaugetype == "horizontal")
            {
                indicatorBarRect.set_x(left - (size / 2) + width - 1); // translate 하는만큼 x값을 보정해야함. here
                indicatorBarRect.set_y(top + chart._boardRectTop);
                indicatorBarRect.set_width(size);
                indicatorBarRect.set_height(height);
            }
            else //(chart.gaugetype == "circular")
            {
				var pos = width;    // circle인 경우 width가 radius임.
				var centerX = chart._centerLeft + chart._boardRectLeft;
				var centerY = chart._centerTop + chart._boardRectTop;
				var posX = Math.sin(pos) * chart._gaugeradius + centerX;
				var posY = (-Math.cos(pos) * chart._gaugeradius) + centerY;
				var disX = posX - centerX;
				var disY = posY - centerY;
				var distance = Math.sqrt((Math.abs(disX * disX) + Math.abs(disY * disY)));
				var barrotate;
				// 8.27
				if(this.linetype == true || this.centerpinradius <= 0) 
				{
					indicatorBarRect.set_x(centerX - (size / 2));
					indicatorBarRect.set_y(centerY - distance + indentouter);
					indicatorBarRect.set_width(size);
					indicatorBarRect.set_height(distance - indent - indentouter);

					barrotate = pos * (180 / Math.PI);
					if (this._oldrotate)
						indicatorBarRect.rotate(barrotate - this._oldrotate, centerX, centerY);
					else
						indicatorBarRect.rotate(barrotate, centerX, centerY);
				}
				else 
				{
					var centerraduis = parseInt(chart._gaugeradius * (this.centerpinradius * 0.005));
					var p0 = (centerX - centerraduis) + " " + centerY;
					var l0 = " L" + centerX + " " + (centerY - (distance - indent - indentouter));
					var l1 = " L" + (centerX + centerraduis) + " " + centerY;
					var pathData = "M" + p0 + " L" + l0 + " L" + l1+ " Z";
					indicatorBarRect.setPathData(pathData);
					
					barrotate = pos * (180 / Math.PI);
					if (this._oldrotate)
						indicatorBarRect.rotate(barrotate - this._oldrotate, centerX, centerY);
					else
						indicatorBarRect.rotate(barrotate, centerX, centerY);
	
				}
				if(this.centerpinradius > 0) 
					this._drawCenterPin(centerX, centerY);
					
				this._oldrotate = barrotate;					
            }

            indicatorBarRect.set_strokepen(linestyle);
            indicatorBarRect.set_fillstyle(fillstyle);
            indicatorBarRect.set_opacity(opacity);
        }
    };
	
	// 8.27
    _pChartGaugeIndicatorControl._drawCenterPin = function (centerX, centerY)
    {
		var chart = this.parent;
		//var seriesGroup = chart._seriesGroup;
        var boardborderWidth = chart._boardBorderWidth ? chart._boardBorderWidth : 0;
        var boardborderHeight = chart._boardBorderHeight ? chart._boardBorderHeight : 0;		
        var maxRadius = Math.min((chart._boardWidth - (boardborderWidth * 2)), (chart._boardHeight - (boardborderHeight * 2))) / 2;
        maxRadius -= (chart.valueaxes[0] ? chart.valueaxes[0]._allaxisgapsize : 0);
		var centerpinstyle = this._centerpinstyle || nexacro.BackgroundObject("linear-gradient(to bottom,#ddffff 50%, #000000 100%)", this);
		var rStartAngle = 0;
		var rEndAngle = 6.28319;	// 360 degree
		var svradius = maxRadius * (this.centerpinradius * 0.01);	
		var slice = this._indicatorCenterPin,itemId;
		
		//var startAngle = 0,
		//	endAngle = 360,
		var	rMiddleAngle,
			w = svradius,
			h = svradius,
			p0, pM0,
			la,
			pathData;
			//dx = 0, dy = 0,

		rMiddleAngle = rEndAngle / 2;
		p0 = (Math.sin(rStartAngle) * w + centerX) + " " + (-Math.cos(rStartAngle) * h + centerY);
		pM0 = (Math.sin(rMiddleAngle) * w + centerX) + " " + (-Math.cos(rMiddleAngle) * h + centerY);

		la = " 1";

		pathData = "M" + p0 + " A" + w + " " + h + " 0" + la + " 1 " + pM0;
		pathData += " A" + w + " " + h + " 0" + la + " 1 " + p0;
		pathData += "Z";

		slice.set_id(itemId);
		
		slice.setPathData(pathData);
		
		// radial로 강제변경
		var sv_fillColor = centerpinstyle;		
		var bTarget = false;
		if(nexacro._Browser != "Runtime" && (this.centerpinautogradation != "none"))
		{
			if(centerpinstyle instanceof nexacro._BackgroundObject)
			{
				if(!centerpinstyle.gradient) 
				{
					bTarget = true;
					sv_fillColor = centerpinstyle.value;
				}
			}
			else if(centerpinstyle)
			{
				if(centerpinstyle.indexOf("gradient")<0)
				{
					bTarget = true;
				}
			}
			if(!this.parent.seriesset || !this.parent.seriesset[0]) bTarget = false;
			if(bTarget)
			{
				var series = this.parent.seriesset[0]
				var lightcolor = series._shadeColor(sv_fillColor, -70);
				var darkcolor = series._shadeColor(sv_fillColor, 30);

				if(this.centerpinautogradation == "center")
				{
					sv_fillColor = nexacro.BackgroundObject("linear-gradient(to bottom," + lightcolor + " 50%, " + centerpinstyle.value + " 100%)");
				}
				else
				{
					sv_fillColor = nexacro.BackgroundObject("linear-gradient(to bottom," + centerpinstyle.value + " 50%, " + darkcolor + " 100%)");
				}
				/*
				var offset = 6;
				var gradient = sv_fillColor.gradient;
				gradient.style = "radial";
				var point = gradient.point;
			
				point.startX = point.endX = 50 + offset;
				point.startY = point.endY = 50 - offset;
				
				gradient.startradius = 0;
				gradient.endradius = 0.5;	
				*/
			}
		}
		slice.set_fillstyle(sv_fillColor);
		if(bTarget)
		{
			//var gColorObj = slice.fillstyle = slice._style.fillstyle;	
			var offset = 6;
			var gradient = sv_fillColor.gradient;
			gradient.style = "radial";
			var point = gradient.point;
		
			point.startX = point.endX = 50 + offset;
			point.startY = point.endY = 50 - offset;
			
			gradient.startradius = 0;
			gradient.endradius = 0.5;				
		}
		/*
		if(nexacro._Browser != "Runtime" && centerpinstyle.gradient && centerpinstyle.gradient.style == "linear")
		{
			var offset = 6;
			var gradient = centerpinstyle.gradient;
			gradient.style = "radial";
			var point = gradient.point;
		
			point.startX = point.endX = 50 + offset;
			point.startY = point.endY = 50 - offset;
			
			gradient.startradius = 0;
			gradient.endradius = 0.5;
		}
		slice.set_fillstyle(centerpinstyle);
		*/
		slice._jobDrawflags = slice._drawflags = 2;
	};	
 
}
