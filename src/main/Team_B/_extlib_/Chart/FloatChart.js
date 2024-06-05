
if (!nexacro.FloatChart) {
	nexacro.FloatChart = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro._AxisChartBase.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this.categorycolumn = new nexacro.BindableValue("");
		this._visibleSeriesset = [];
	};

	var _pFloatChart = nexacro._createPrototype(nexacro._AxisChartBase, nexacro.FloatChart);
	nexacro.FloatChart.prototype = _pFloatChart;
	_pFloatChart._type_name = "FloatChart";


	_pFloatChart.categoryaxis = null;


	_pFloatChart.barsize = undefined;
	_pFloatChart.rotateaxis = true;
	_pFloatChart.waterfall = false;
	_pFloatChart.waterfallsumtext = "Gross";


	_pFloatChart._drawing = false;
	_pFloatChart._isnegativedata = false;

	_pFloatChart._barsize = 0.8;
	_pFloatChart._chartbarsize = 0.8;
	_pFloatChart._barVisibleSeriesCnt = 0;

	_pFloatChart.isdatetimevalue = false;

	_pFloatChart._isCompositeSeries = false;
	_pFloatChart._rotateaxisX = null;
	_pFloatChart._rotateaxisY = null;
	_pFloatChart._invalidcategorycolumn = false;







	_pFloatChart.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			nexacro._AxisChartBase.prototype.on_create_contents.call(this);
		}
	};

	_pFloatChart.on_destroy_contents = function () {
		this.categorycolumn = null;
		this.barsize = null;

		this._drawing = null;
		this._isnegativedata = null;
		this._barsize = null;
		this._chartbarsize = null;
		this._barVisibleSeriesCnt = null;
		this.isdatetimevalue = null;

		if (this.categoryaxis) {
			this._deleteCategoryaxis();
		}

		nexacro._AxisChartBase.prototype.on_destroy_contents.call(this);

		return true;
	};



	_pFloatChart.set_categoryaxis = function () {
	};

	_pFloatChart._measure = function () {
		nexacro._ChartBase.prototype._measure.call(this);
		if (this._recreate) {
			this._initAxes();
			this._setDatapointFormat();
			this._setDatapoint();
			this._setDataMinMax();
			this._resetAxes();
		}

		this._setAxes();
	};

	_pFloatChart._appendValueaxis = function (contents) {
		if (!this.isdatetimevalue) {
			nexacro._ChartBase.prototype._appendValueaxis.call(this, contents);
			return;
		}
		var axis, id, axisContents = {
		}, valueaxesLeng = -1, location;

		if (!this._isApplyContents && nexacro._ChartGraphicsLib.isEmpty(contents)) {
			return valueaxesLeng;
		}

		if (typeof (contents) == "object") {
			axisContents = contents;
			id = contents.id;
		}

		if (!id) {
			valueaxesLeng = this.valueaxes.length + 1;
			id = "Valueaxis" + valueaxesLeng;
			contents.id = id;
		}

		if (!this._isApplyContents) {
			this.contents.valueaxes.push(axisContents);
		}

		if (this.isdatetimevalue) {
			axis = new nexacro.ChartFloatValueAxisControl(id, this, this._graphicsControl);
		}
		else {
			axis = new nexacro.ChartAxisControl(id, this, this._graphicsControl);
		}
		axis._type_name = "ChartFloatValueAxisControl";
		axis._type = "valueAxis";

		if (this.isdatetimevalue) {
			location = "top";
			if (!contents.opposite) {
				contents.opposite = true;
			}
		}
		else {
			location = contents.opposite || "left";
		}
		axis._location = location;

		this._drawing = true;
		this._setProperties(axisContents, axis);
		this._drawing = false;

		axis.on_apply_opposite(contents.opposite);

		this.valueaxes.push(axis);
		this._axes.push(axis);

		if (location == "top" || location == "bottom") {
			this._xaxes.push(axis);
		}
		else {
			this._yaxes.push(axis);
		}

		return axis;
	};

	_pFloatChart.set_isdatetimevalue = function (v) {
		v = nexacro._toBoolean(v);
		if (v) {
			this.set_rotateaxis(true);
			this.set_waterfall(false);
		}
		this.isdatetimevalue = v;
		this._reset = true;
		this._draw();
	};

	_pFloatChart.set_categorycolumn = function (v) {
		if (v === undefined || v === null) {
			v = "";
		}

		if (this.categorycolumn._value != v) {
			this.categorycolumn._set(v);
			this.on_apply_categorycolumn();
		}
		if (this._changedData == true) {
			this._reset = true;
			this._draw();
		}
		else {
			this._draw();
		}
	};

	_pFloatChart._checkcategorycolumn = function () {
		var categorycolumn = this.categorycolumn;
		var bindtype = categorycolumn._bindtype;
		if (bindtype == 0) {
			this._invalidcategorycolumn = true;
		}
		else {
			categorycolumn = this._getBindableValue("categorycolumn");
			var binddataset = this._binddataset;
			if (binddataset) {
				var coltype = binddataset._getColumnType(categorycolumn);
				if (!coltype) {
					this._invalidcategorycolumn = true;
				}
				else {
					this._invalidcategorycolumn = false;
				}
			}
		}
	};

	_pFloatChart.on_apply_categorycolumn = function () {
		this.on_apply_binddataset();
	};

	_pFloatChart.on_apply_binddataset = function () {
		var dsObj = this._binddataset;

		if (this._dataMap) {
			this._dataMap.clear();
			this._dataMap = null;
		}

		if (dsObj) {
			this._checkcategorycolumn();
			this._dataMap = new nexacro._DatasetMap(false);
			if (this.isdatetimevalue) {
				this._dataMap.buildDataWithDataset(dsObj, "", this._createObjectItem, this);
			}
			else {
				this._dataMap.buildDataWithDataset(dsObj, this._getBindableValue("categorycolumn"), this._createObjectItem, this);
			}
			this._setDatasetEventHandlers(dsObj);
		}
		this._changedData = true;
	};

	_pFloatChart.set_barsize = function (val) {
		var lVal = null;
		if (val !== undefined && val !== null && val !== "") {
			if (nexacro._isNumber(val)) {
				lVal = val;
			}
			else {
				if (val.length > 0) {
					lVal = +val;
					if (isNaN(lVal)) {
						return;
					}
				}
			}
		}

		if (lVal < 0 || lVal > 100) {
			return;
		}

		if (this.barsize != val) {
			this.barsize = val;
			this.on_apply_barsize(lVal);
		}

		this._reset = true;
		this._draw();
	};

	_pFloatChart.on_apply_barsize = function (barsize) {
		if (!nexacro._ChartGraphicsLib.isEmpty(barsize)) {
			this._barsize = barsize * 0.01;
			this._chartbarsize = barsize * 0.01;
		}
		else {
			this._barsize = 0.8;
			this._chartbarsize = 0.8;
		}
		this._changedData = true;
	};

	_pFloatChart.set_rotateaxis = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		if (this.isdatetimevalue == true) {
			val = true;
		}

		val = nexacro._toBoolean(val);
		if (this.rotateaxis != val) {
			this.rotateaxis = val;
			this.on_apply_rotateaxis();
		}
		this._drawing = false;

		this._reset = true;
		this._draw();
	};

	_pFloatChart.on_apply_rotateaxis = function () {
		var categoryaxis = this.categoryaxis;
		var valueaxes = this.valueaxes;
		var rotateaxis = this.rotateaxis;
		var i;

		if (categoryaxis) {
			categoryaxis.on_apply_opposite(categoryaxis.opposite);
			categoryaxis.on_apply_titlerotate(categoryaxis.titlerotate);
		}
		else {
			if (rotateaxis) {
				this._rotateaxisX = true;
			}
			else {
				this._rotateaxisX = false;
			}
		}

		if (valueaxes.length > 0) {
			for (i = 0; i < valueaxes.length; i++) {
				var valueaxis = valueaxes[i];
				if (valueaxis) {
					if (this.isdatetimevalue) {
						valueaxis.opposite = true;
					}
					valueaxis.on_apply_opposite(valueaxis.opposite);
					valueaxis.on_apply_titlerotate(valueaxis.titlerotate);
				}
			}
		}
		else {
			if (rotateaxis) {
				this._rotateaxisY = true;
			}
			else {
				this._rotateaxisY = false;
			}
		}
		this._xaxes = [];
		this._yaxes = [];
		for (i = 0; i < this._axes.length; i++) {
			var axis = this._axes[i];
			var location = axis._location;
			if (location == "top" || location == "bottom") {
				this._xaxes.push(axis);
			}
			else {
				this._yaxes.push(axis);
			}
		}
		this._rearrange = true;
		this._changedData = true;
	};

	_pFloatChart.set_waterfallsumtext = function (val) {
		if (this.waterfallsumtext != val) {
			this.waterfallsumtext = val;
			this.on_apply_waterfallsumtext(val);
		}
		this._drawing = false;

		this._reset = true;
		this._draw();
	};

	_pFloatChart.on_apply_waterfallsumtext = function (waterfallsumtext) {
		this._rearrange = true;
		this._changedData = true;
	};

	_pFloatChart.set_waterfall = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.waterfall != val) {
			this.waterfall = val;
			this.on_apply_waterfall();
		}
		this._drawing = false;

		this._reset = true;
		this._draw();
	};

	_pFloatChart.on_apply_waterfall = function () {
		this._rearrange = true;
		this._changedData = true;
	};

	_pFloatChart.showSeries = function (id) {
		var s = this.getSeriesByID(id);
		if (s) {
			this._drawing = true;

			this._drawing = false;
			this._changedData = true;

			this._reset = true;
			this._draw();
		}
	};

	_pFloatChart.hideSeries = function (id) {
		var s = this.getSeriesByID(id);
		if (s) {
			this._drawing = true;
			this._drawing = false;
			this._changedData = true;

			this._reset = true;
			this._draw();
		}
	};

	_pFloatChart.showCategoryaxis = function () {
		if (this.categoryaxis) {
			this.categoryaxis.set_visible(true);
		}
	};

	_pFloatChart.hideCategoryaxis = function () {
		if (this.categoryaxis) {
			this.categoryaxis.set_visible(false);
		}
	};

	_pFloatChart._destroySubControl = function () {
		nexacro._AxisChartBase.prototype._destroySubControl.call(this);

		if (this.categoryaxis) {
			this._deleteCategoryaxis();
		}
	};

	_pFloatChart._deleteCategoryaxis = function () {
		var categoryaxis = this.categoryaxis;
		if (categoryaxis) {
			this._deleteAxis(categoryaxis, true);
			this._changedData = true;
		}
	};

	_pFloatChart._createSeries = function (id) {
		var series = new nexacro.ChartFloatSeriesControl(id, this, this._graphicsControl);
		return series;
	};

	_pFloatChart._setSeries = function () {
		var categoryaxis, valueaxis;
		nexacro._AxisChartBase.prototype._setSeries.call(this);
		nexacro._ChartGraphicsLibArray.forEach(this.seriesset, function (obj, index) {
			if (obj) {
				categoryaxis = this.categoryaxis;
				valueaxis = this.getValueaxisByID(obj.valueaxis);
				if (categoryaxis) {
					if (this.valueaxes.length == 0) {
						categoryaxis.on_apply_visible(false);
						categoryaxis.on_apply_boardlinevisible(false);
					}
					else {
						categoryaxis._afterSetProperties();
						categoryaxis.on_apply_visible(categoryaxis.visible);
					}
				}

				if (valueaxis) {
					valueaxis.on_apply_visible(valueaxis.visible);
					obj.on_apply_valueaxis(valueaxis.id);
				}
				else {
					var length = this.valueaxes.length;
					if (length <= 0) {
						return false;
					}
					for (var i = 0; i < length; i++) {
						valueaxis = this.valueaxes[i];
						if (valueaxis) {
							var group = valueaxis._group;
							if (group) {
								var visible = valueaxis.visible;
								if (visible) {
									valueaxis.on_apply_visible(visible);
									obj.on_apply_valueaxis(valueaxis.id);
									break;
								}
							}
						}
					}
				}

				if (!categoryaxis) {
					return false;
				}
				if (categoryaxis._direction == "x") {
					obj._xaxis = categoryaxis;
					obj._yaxis = valueaxis;
				}
				else {
					obj._xaxis = valueaxis;
					obj._yaxis = categoryaxis;
				}
			}
		}, this);
	};

	_pFloatChart._createCategoryaxis = function (o, id) {
		if (this.categoryaxis) {
			return false;
		}

		var axis, location;

		if (!id) {
			id = "Categoryaxis";
		}
		if (this.isdatetimevalue) {
			axis = new nexacro.ChartFloatCategoryAxisControl(id, this, this._graphicsControl);
		}
		else {
			axis = new nexacro.ChartAxisControl(id, this, this._graphicsControl);
		}
		axis._type_name = "ChartCategoryAxisControl";
		axis._type = "categoryAxis";

		if (this.isdatetimevalue) {
			location = "left";
			if (o && o.opposite) {
				o.opposite = true;
			}
		}
		else {
			if (o) {
				location = o.opposite ? "top" : "bottom";
			}
			if (this.rotateaxis && this._rotateaxisX) {
				location = "left";
			}
		}

		var opposite = o ? o.opposite : axis.opposite;
		axis.on_apply_opposite(opposite);
		axis.location = location;

		this.categoryaxis = axis;
		this._axes.push(axis);
		if (location == "top" || location == "bottom") {
			this._xaxes.push(axis);
		}
		else {
			this._yaxes.push(axis);
		}

		return axis;
	};

	_pFloatChart._createValueaxes = function (o, id) {
		var location;
		var valueaxis;

		if (this.isdatetimevalue) {
			valueaxis = new nexacro.ChartFloatValueAxisControl(id, this, this._graphicsControl);
		}
		else {
			valueaxis = new nexacro.ChartAxisControl(id, this, this._graphicsControl);
		}
		valueaxis._type = "valueAxis";

		if (this.isdatetimevalue) {
			location = "top";
			o.opposite = true;
		}
		else {
			if (o) {
				location = o.opposite ? "right" : "left";
			}

			if (this.rotateaxis && this._rotateaxisY) {
				location = "bottom";
			}
		}

		var opposite = o.opposite || valueaxis.opposite;
		valueaxis.on_apply_opposite(opposite);

		this.valueaxes.push(valueaxis);
		this._axes.push(valueaxis);
		if (location == "top" || location == "bottom") {
			this._xaxes.push(valueaxis);
		}
		else {
			this._yaxes.push(valueaxis);
		}
		return valueaxis;
	};


	_pFloatChart._setSeriesDataMinMax = function (series) {
		if (!this.isdatetimevalue) {
			nexacro._AxisChartBase.prototype._setSeriesDataMinMax.call(this, series);
			return;
		}
		var datapoints = series._datapoints, xaxis = series._xaxis, yaxis = series._yaxis, xmin = Number.POSITIVE_INFINITY, ymin = Number.POSITIVE_INFINITY, xmax = Number.NEGATIVE_INFINITY, ymax = Number.NEGATIVE_INFINITY, points, pointsize, val, f, format;
		points = datapoints.points;
		pointsize = datapoints.pointsize;
		format = datapoints.format;

		var valmin, valmax, valcat;
		for (var i = 0; i < points.length; i += pointsize) {
			if (points[i] == null) {
			}

			valmin = points[i];
			valcat = points[i + 1];
			valmax = points[i + 2];

			if (valmin == null) {
				valmin = xmin;
			}
			if (valmax == null) {
				valmax = xmax;
			}

			valmin = this._checkDateValue(valmin);
			valmax = this._checkDateValue(valmax);

			f = format[2];
			if (!f || valmax == Number.MAX_VALUE || valmax == -Number.MAX_VALUE) {
				continue;
			}


			if (f.x) {
				if (valmin < xmin) {
					xmin = valmin;
				}
				if (valmax > xmax) {
					xmax = valmax;
				}
			}
			f = format[1];
			if (!f || valcat == Number.MAX_VALUE || valcat == -Number.MAX_VALUE) {
				continue;
			}
			if (f.y) {
				if (valcat < ymin) {
					ymin = valcat;
				}
				if (valcat > ymax) {
					ymax = valcat;
				}
			}
		}
		if (xaxis._tickmin) {
			xmin = xaxis._tickmin;
		}
		if (xaxis._tickmax) {
			xmax = xaxis._tickmax;
		}
		if (yaxis._tickmin) {
			ymin = yaxis._tickmin;
		}
		if (yaxis._tickmax) {
			ymax = yaxis._tickmax;
		}
		if (series.barvisible) {
			var delta, barwidth;
			series.on_apply_barsize(series.barsize);
			barwidth = series._barsize || this._barsize;
			barwidth = this._getcheckTimeAxisBarWidth(barwidth);
			switch (series._baralign) {
				case "left":
					delta = 0;
					break;
				case "right":
					delta = -barwidth;
					break;
				default:
					delta = -barwidth / 2;
			}

			if (this.rotateaxis) {
				ymin += delta;
				ymax += delta + barwidth;
			}
			else {
				xmin += delta;
				xmax += delta + barwidth;
			}
		}
		if (xaxis && xaxis._updateMinMax) {
			xaxis._updateMinMax(xmin, xmax);
		}
		if (yaxis && yaxis._updateMinMax) {
			yaxis._updateMinMax(ymin, ymax);
		}
	};

	_pFloatChart._setSeriesDatapointsFormat = function (series) {
		var format = series._datapoints.format, isXCategory = false, isYCategory = false;

		if (!series._xaxis || !series._yaxis) {
			return false;
		}

		if (series._xaxis._type == "categoryAxis") {
			isXCategory = true;
		}
		if (series._yaxis._type == "categoryAxis") {
			isYCategory = true;
		}

		if (!format) {
			format = [];
			format.push({
				x : true, 
				category : isXCategory, 
				required : true
			});
			format.push({
				y : true, 
				category : isYCategory, 
				required : true
			});

			if (this.rotateaxis) {
				format.push({
					x : true, 
					category : isXCategory, 
					required : true
				});

				format.push({
					x : true, 
					category : isXCategory, 
					required : false
				});
			}
			else {
				format.push({
					y : true, 
					category : isYCategory, 
					required : true, 
					defaultValue : 0
				});
				format.push({
					y : true, 
					category : isYCategory, 
					required : false, 
					defaultValue : 0
				});
			}
			series._datapoints.format = format;
		}
	};

	_pFloatChart._setDatapointFormat = function () {
		nexacro._AxisChartBase.prototype._setDatapointFormat.call(this);
	};

	_pFloatChart._setSeriesDatapoints = function (series) {
		var datapoints, format, pointsize, points, insertSteps, data, p, val, f, xaxis = series._xaxis, yaxis = series._yaxis;

		datapoints = series._datapoints;
		format = datapoints.format;
		datapoints.pointsize = format.length;
		pointsize = datapoints.pointsize;
		points = datapoints.points;
		data = series._data;

		var i, j, k;
		for (i = j = 0; i < data.length; i++, j += pointsize) {
			p = data[i];

			var nullify = p == null;
			if (!nullify) {
				for (k = 0; k < pointsize; k++) {
					val = p[k];

					f = format[k];
					if (f) {
						if (f.category == false && val != null) {
							if (!this.isdatetimevalue) {
								val = +val;
							}

							if (isNaN(val)) {
								if (this.isdatetimevalue) {
								}
								else {
									val = null;
								}
							}
							else if (val == Infinity) {
								val = Number.MAX_VALUE;
							}
							else if (val == -Infinity) {
								val = -Number.MAX_VALUE;
							}
						}

						if (val == null) {
							if (f.required) {
								nullify = true;
							}
							if (f.defaultValue != null) {
								val = f.defaultValue;
							}
						}
					}

					points[j + k] = val;
				}
			}

			if (nullify) {
				for (k = 0; k < pointsize; k++) {
					val = points[j + k];
					if (val != null) {
					}
					else {
						points[j + k] = null;
					}
				}
			}
		}
	};

	_pFloatChart._setDatapoint = function () {
		nexacro._AxisChartBase.prototype._setDatapoint.call(this);

		var seriesset = this.seriesset;
		this._barsize = this._chartbarsize;

		var visibleSeriesCnt = this.seriesset.length;
		var i;
		var series;
		for (i = 0; i < visibleSeriesCnt; i++) {
			series = seriesset[i];

			if (series) {
				series._baralign = "center";
			}
		}
	};

	_pFloatChart._getHighlightVisible = function () {
		var seriesset = this.seriesset;
		if (seriesset) {
			var length = seriesset.length, highlightbarvisible = false;

			for (var i = 0; i < length; i++) {
				var s = seriesset[i];
				if (s) {
					if (s.highlightbarvisible || s.highlightpointvisible || s.highlightlinevisible) {
						highlightbarvisible = true;
						break;
					}
				}
			}
			return highlightbarvisible;
		}
	};

	_pFloatChart._deleteSeries = function (series_, index) {
		nexacro._ChartBase.prototype._deleteSeries.call(this, series_, index);
		var serieslength = this.seriesset.length;
		var series = this.seriesset;

		if (this.valueaxes) {
			var valueaxes = this.valueaxes;
			for (var i = valueaxes.length - 1; i > -1; i--) {
				var bused = false;
				var valueaxis = valueaxes[i];
				if (valueaxis) {
					for (var j = 0; j < serieslength; j++) {
						var s = series[j];
						if (s) {
							if (s._yaxis && s._yaxis.id == valueaxis.id) {
								bused = true;
							}
						}
					}
				}
				if (!bused || serieslength == 0) {
					valueaxis._used = false;
					valueaxis.on_apply_visible(false);
					valueaxis.on_apply_boardlinevisible(false);
				}
			}
		}

		if (serieslength == 0) {
			if (this.categoryaxis) {
				this.categoryaxis.on_apply_visible(false);
				this.categoryaxis.on_apply_boardlinevisible(false);
			}

			if (this.hrangebar) {
				this.hrangebar.on_apply_visible(false);
			}
			if (this.vrangebar) {
				this.vrangebar.on_apply_visible(false);
			}
		}
	};

	_pFloatChart._checkDateValue = function (v) {
		var val = v;
		if (v == undefined || v == null) {
			val = null;
		}
		else {
			var new_obj = null;
			var val = v;
			if (val instanceof nexacro.Date) {
				val = val.getTime();
			}
			else if (val instanceof Date) {
				val = val.getTime();
			}
			else {
				if (typeof val == "string") {
					new_obj = new nexacro.Date(val);
					val = new_obj.getTime();
				}
				else if (typeof val == "number" && val > 0) {
					val = new Date(val);
					new_obj = new nexacro.Date();
					new_obj.setTime(val.getTime());
					val = new_obj.getTime();
				}
			}
			if (val !== undefined) {
				if (isNaN(val)) {
					val = null;
				}
			}
		}
		return val;
	};
}


if (!nexacro.ChartFloatCategoryAxisControl) {
	nexacro.ChartFloatCategoryAxisControl = function (id, parent, graphicsControl) {
		nexacro.ChartAxisControl.call(this, id, parent, graphicsControl);
		if (parent.isdatetimevalue) {
			this._direction = "y";
		}
		this._chart = parent;
	};

	var _pChartFloatCategoryAxisControl = nexacro._createPrototype(nexacro.ChartAxisControl, nexacro.ChartFloatCategoryAxisControl);
	nexacro.ChartFloatCategoryAxisControl.prototype = _pChartFloatCategoryAxisControl;
	_pChartFloatCategoryAxisControl._type_name = "ChartFloatCategoryAxisControl";
	_pChartFloatCategoryAxisControl.boardlinevisible = false;

	_pChartFloatCategoryAxisControl.set_boardlinevisible = function (val) {
		nexacro.ChartAxisControl.prototype.set_boardlinevisible.call(this, val);
	};

	_pChartFloatCategoryAxisControl._arrangeTickGroup = function (width, height) {
		if (!this._chart.isdatetimevalue) {
			nexacro.ChartAxisControl.prototype._arrangeTickGroup.call(this, width, height);
			return;
		}

		var axisLine = this._axisLine, direction = this._direction, location = this._location, axislinestyle = this._axislinestyle, axislinewidth = 0, x = 0, y = 0, axisRectWidth = 0, axisRectHeight = 0, tickendspace = this._tickendspace, axisRect = this._axisRect.getGlobalBoundRect(false, true);

		if (axisLine) {
			axislinewidth = axislinestyle ? axislinestyle._getBorderLeftWidth() : 0;
			axislinewidth *= 0.5;
		}

		var tickstartgap = 0;
		var tickendgap = 0;
		var charttype = this.parent._type_name;
		var type = this._type;

		y = axisRect.top - tickstartgap - tickendspace;
		axisRectHeight = axisRect.height + tickstartgap + tickendgap + tickendspace;

		if (location == "left") {
			x = axisRect.right - axislinewidth;
		}
		else {
			x = axisRect.left + axislinewidth;
		}

		if (axisLine) {
			axisLine.set_x1(x);
			axisLine.set_y1(y);
			axisLine.set_x2(x);
			axisLine.set_y2(y + axisRectHeight);
		}

		var ticks = this._ticks, tick, value, ticksize, tickXoff = 0, tickYoff = 0, tickmin = this._min, tickmax = this._max, tickboardLine, vc = 0;

		if ((this.ticksize == "" || this.ticksize == undefined) && this.ticksize !== 0) {
			ticksize = 10;
		}
		else {
			ticksize = this.ticksize;
		}

		if (ticksize > 0) {
			if (location == "left") {
				tickXoff = -ticksize;
				x -= axislinewidth;
			}
			else if (location == "right") {
				tickXoff = ticksize;
				x += axislinewidth;
			}
		}
		var xtickendspace = this.parent._xaxes[0]._tickendspace;
		var ytickendspace = this.parent._yaxes[0]._tickendspace;
		var tickgap = 0;
		var yGap;
		for (var i = 0; i < ticks.length; i++) {
			tick = ticks[i].lineElement;
			tickboardLine = ticks[i].boardlineElement;
			value = ticks[i].v;

			if (isNaN(value) || value < tickmin || value > tickmax) {
				continue;
			}

			vc = this.p2c(value);
			y = vc + axisRect.top;

			ticks[i]._point = {
				"x1" : x, 
				"y1" : y, 
				"x2" : x + tickXoff, 
				"y2" : y + tickYoff, 
				"vc" : vc
			};
			if (tick) {
				tick.set_x1(x);
				tick.set_y1(y);
				tick.set_x2(x + tickXoff);
				tick.set_y2(y + tickYoff);
			}

			if (tickboardLine) {
				tickboardLine.set_x1(0);
				tickboardLine.set_x2(width + xtickendspace);
				if (i > 0) {
					yGap = (ticks[i - 1]._point.vc - vc) / 2;
					tickboardLine.set_y1(vc + yGap);
					tickboardLine.set_y2(vc + yGap);
				}
				else {
					tickboardLine.set_visible(false);
				}
			}
		}
		this.on_apply_boardlinevisible(this.boardlinevisible);
	};
}


if (!nexacro.ChartFloatValueAxisControl) {
	nexacro.ChartFloatValueAxisControl = function (id, parent, graphicsControl) {
		nexacro.ChartAxisControl.call(this, id, parent, graphicsControl);
		if (parent.isdatetimevalue) {
			this._direction = "x";
			this.axistype == "";
		}
		this._chart = parent;
	};

	var _pChartFloatValueAxisControl = nexacro._createPrototype(nexacro.ChartAxisControl, nexacro.ChartFloatValueAxisControl);
	nexacro.ChartFloatValueAxisControl.prototype = _pChartFloatValueAxisControl;
	_pChartFloatValueAxisControl._type_name = "ChartFloatValueAxisControl";

	_pChartFloatValueAxisControl.timelabelgroupmask = "";
	_pChartFloatValueAxisControl.timelabelgroupborderlinestyle = "";
	_pChartFloatValueAxisControl._timelabelgroupborderlinestyle = "";
	_pChartFloatValueAxisControl.timelabelunitmask = "dd";
	_pChartFloatValueAxisControl._timemaintickformat = "";
	_pChartFloatValueAxisControl._timesubtickformat = "";
	_pChartFloatValueAxisControl.timeboardgrouplinestyle = "";
	_pChartFloatValueAxisControl.tickinterval = 3;
	_pChartFloatValueAxisControl.timelabelareafillstyle = "";
	_pChartFloatValueAxisControl._timelabelareafillstyle = "";

	_pChartFloatValueAxisControl.set_opposite = function (val) {
		if (this._chart.isdatetimevalue) {
			val = true;
		}
		nexacro.ChartAxisControl.prototype.set_opposite.call(this, val);
	};

	_pChartFloatValueAxisControl.set_timelabelareafillstyle = function (val) {
		this.timelabelareafillstyle = val;
		if (val) {
			if (this._timelabelareafillstyle == null || this._timelabelareafillstyle.value != val) {
				var oldValue;
				if (this._timelabelareafillstyle) {
					oldValue = this._timelabelareafillstyle.value;
				}
				this._changeContentsProperty("timelabelareafillstyle", val, oldValue);

				var timelabelareafillstyle = nexacro.BackgroundObject(val, this);
				this._timelabelareafillstyle = timelabelareafillstyle;
				this.on_apply_timelabelareafillstyle(timelabelareafillstyle);
			}
		}
		else {
			if (this._timelabelareafillstyle) {
				this._timelabelareafillstyle = null;
				this.on_apply_timelabelareafillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatValueAxisControl.on_apply_timelabelareafillstyle = function (highlightfillstyle) {
	};

	_pChartFloatValueAxisControl.set_timelabelgroupborderlinestyle = function (val) {
		this.timelabelgroupborderlinestyle = val;
		if (val) {
			if (this._timelabelgroupborderlinestyle == null || !this._timelabelgroupborderlinestyle._single || this._timelabelgroupborderlinestyle.value != val) {
				var oldValue;
				if (this._boardlinestyle) {
					oldValue = this._timelabelgroupborderlinestyle.value;
				}
				this._changeContentsProperty("timelabelgroupborderlinestyle", val, oldValue);
				var timelabelgroupborderlinestyle = nexacro.BorderObject(val);
				this._timelabelgroupborderlinestyle = timelabelgroupborderlinestyle;
				this.on_apply_boardlinestyle();
			}
		}
		else {
			if (this._timelabelgroupborderlinestyle) {
				this._timelabelgroupborderlinestyle = null;
				this.on_apply_boardlinestyle();
			}
		}

		this.parent._draw();
	};

	_pChartFloatValueAxisControl.set_timelabelgroupmask = function (val) {
		if (this.timelabelgroupmask != val) {
			this._changeContentsProperty("timelabelgroupmask", val, this.timelabelgroupmask);
			this.timelabelgroupmask = val;
			this.on_apply_timelabelgroupmask();
		}
		this.parent._draw();
	};

	_pChartFloatValueAxisControl.on_apply_timelabelgroupmask = function () {
		this.parent._rearrange = true;
	};

	_pChartFloatValueAxisControl.set_timelabelunitmask = function (val) {
		if (this.timelabelunitmask != val) {
			this._changeContentsProperty("timelabelunitmask", val, this.timelabelunitmask);
			this.timelabelunitmask = val;
			this.on_apply_timelabelgroupmask();
		}
		this.parent._draw();
	};

	_pChartFloatValueAxisControl.set_timeboardgrouplinestyle = function (val) {
		this.timeboardgrouplinestyle = val;
		if (val) {
			if (this._timeboardgrouplinestyle == null || !this._timeboardgrouplinestyle._single || this._timeboardgrouplinestyle.value != val) {
				var oldValue;
				if (this._timeboardgrouplinestyle) {
					oldValue = this._timeboardgrouplinestyle.value;
				}
				this._changeContentsProperty("timeboardgrouplinestyle", val, oldValue);
				var timeboardgrouplinestyle = nexacro.BorderObject(val);
				this._timeboardgrouplinestyle = timeboardgrouplinestyle;
				this.on_apply_timeboardgrouplinestyle();
			}
		}
		else {
			if (this._timeboardgrouplinestyle) {
				this._timeboardgrouplinestyle = null;
				this.on_apply_boardlinestyle();
			}
		}

		this.parent._draw();
	};

	_pChartFloatValueAxisControl.destroy = function () {
		this._destroy(true);
	};

	_pChartFloatValueAxisControl._destroy = function (parent_clear) {
		if (parent_clear) {
			var axisId = this.id;
			if (this.parent) {
				var index = -1;
				nexacro._ChartGraphicsLibArray.forEach(this.parent.valueaxes, function (axis, i) {
					if (axis instanceof nexacro.ChartAxisControl && axis.id == axisId) {
						axis.parent._deleteContentsProp("valueaxes", i);
						index = i;
					}
				});
				nexacro._ChartGraphicsLibArray.removeAt(this.parent.valueaxes, index);
			}
		}

		delete this.locale;
		delete this.labeltype;
		delete this.timelabelunitmask;
		delete this._axisMainLine;
		delete this._axisLine;
		delete this._axisLineRect;
		delete this._axisRect;

		if (this._title) {
			this._title.destroy();
			delete this._title;
			this._title = null;
		}

		if (this._ticks) {
			for (var i = 0; i < this._ticks.length; i++) {
				var tick = this._ticks[i];
				var ticktext = tick.labelElement;
				if (ticktext) {
					ticktext.destroy();
				}
				ticktext = tick.labelgroupElement;
				if (ticktext) {
					ticktext.destroy();
				}

				var tickline = tick.lineElement;
				if (tickline) {
					tickline.destroy();
				}

				var tickboardline = tick.boardlineElement;
				if (tickboardline) {
					tickboardline.destroy();
				}
				this._ticks[i] = null;
			}
		}

		this.id = null;
		this.locale = null;
		this.opposite = null;
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
		this.timelabelgroupmask = null;
		this.timelabelunitmask = null;

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
		this._axisMainLine = null;
		this._axisLine = null;
		this._axisLineRect = null;
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

		this._timeUnitSize = null;
		this._specMonths = null;


		if (this._boardLineGroup) {
			this._boardLineGroup.destroy();
			this._boardLineGroup = null;
		}

		if (this._tickRectGroup) {
			this._tickRectGroup.destroy();
			this._tickRectGroup = null;
		}

		if (this._tickMainGroup) {
			this._tickMainGroup.destroy();
			this._tickMainGroup = null;
		}

		if (this._tickGroup) {
			this._tickGroup.destroy();
			this._tickGroup = null;
		}

		if (this._labelgroupGroup) {
			this._labelgroupGroup.destroy();
			this._labelgroupGroup = null;
		}

		if (this._labelGroup) {
			this._labelGroup.destroy();
			this._labelGroup = null;
		}

		if (this._group) {
			var itemID = this._group.id;

			var item = this._graphicsControl.getObjectByID(itemID);
			if (item) {
				this._graphicsControl.removeChild(item);
			}
			this._group.destroy();
			this._group = null;
		}
		if (this._chart) {
			this._chart = null;
		}

		if (this.parent) {
			this.parent._rearrange = true;
			this.parent._recreate = true;
			this.parent = null;
		}

		nexacro.Object.prototype.destroy.call(this);
		return true;
	};

	_pChartFloatValueAxisControl._create = function () {
		this._group = new nexacro.ChartGraphicsGroup();
		this._group.set_id(this.id + "_ChartAxisGroup");
		this._graphicsControl.addChild(this._group);

		this._tickRectGroup = new nexacro.ChartGraphicsGroup();
		this._tickRectGroup.set_id("ChartAxisTickRectGroup");
		this._group.addChild(this._tickRectGroup);

		if (!this._axisLineRect) {
			this._axisLineRect = new nexacro.ChartGraphicsRect();
			this._axisLineRect.set_id("ChartAxisLineRect");
			this._tickRectGroup.addChild(this._axisLineRect);
			this._axisLineRect._axis = this;
		}

		this._tickMainGroup = new nexacro.ChartGraphicsGroup();
		this._tickMainGroup.set_id("ChartAxisTickMainGroup");
		this._group.addChild(this._tickMainGroup);

		this._tickGroup = new nexacro.ChartGraphicsGroup();
		this._tickGroup.set_id("ChartAxisTickGroup");
		this._group.addChild(this._tickGroup);

		this._labelgroupGroup = new nexacro.ChartGraphicsGroup();
		this._labelgroupGroup.set_id("ChartAxislabelgroupGroup");
		this._group.addChild(this._labelgroupGroup);

		this._labelGroup = new nexacro.ChartGraphicsGroup();
		this._labelGroup.set_id("ChartAxisLabelGroup");
		this._group.addChild(this._labelGroup);

		this._axisRect = new nexacro.ChartGraphicsRect(0, 0, 0, 0);
		this._axisRect.set_id("ChartAxisRect");
		this._group.addChild(this._axisRect);
		this._axisRect._axis = this;

		this._boardLineGroup = new nexacro.ChartGraphicsGroup();
		this._boardLineGroup.set_id(this.id + "_ChartAxisBoardLineGroup");
		if (this.parent.board) {
			this._graphicsControl.insertChild(this._boardLineGroup, this.parent._seriesGroup);
		}
	};

	_pChartFloatValueAxisControl._measureAxisRect = function () {
		nexacro.ChartAxisControl.prototype._measureAxisRect.call(this);

		if (this._chart.isdatetimevalue) {
			var h = this._axisRect.height;
			this._axisRect.set_height(h * 2);
		}
	};

	_pChartFloatValueAxisControl.set_tickmax = function (val) {
		nexacro.ChartAxisControl.prototype.set_tickmax.call(this, val);
	};

	_pChartFloatValueAxisControl.set_tickmin = function (val) {
		nexacro.ChartAxisControl.prototype.set_tickmin.call(this, val);
	};

	_pChartFloatValueAxisControl.on_apply_axistype = function () {
		nexacro.ChartAxisControl.prototype.on_apply_axistype.call(this);
	};

	_pChartFloatValueAxisControl._setRange = function () {
		if (!this._chart.isdatetimevalue) {
			nexacro.ChartAxisControl.prototype._setRange.call(this);
			return;
		}
		var tickmin, tickmax, delta;

		tickmin = (this._tickmin != null ? this._tickmin : this._datamin);
		tickmax = (this._tickmax != null ? this._tickmax : this._datamax);

		if (this._scrollMin || this._scrollMax) {
			tickmin = this._scrollMin;
			tickmax = this._scrollMax;

			this._scrollMin = null;
			this._scrollMax = null;
		}
		tickmin = this._chart._checkDateValue(tickmin);
		tickmax = this._chart._checkDateValue(tickmax);

		tickmin = +(tickmin);
		tickmax = +(tickmax);

		delta = tickmax - tickmin;
		if (delta == 0.0) {
			var widen = tickmax == 0 ? 1 : 0.01;
			if (this._tickmin == null) {
				tickmin -= widen;
			}

			if (this._tickmax == null || this._tickmin != null) {
				tickmax += widen;
			}
		}
		else {
			var tickscale = this.autotickscale ? this.autotickscale * 0.01 : 0;
			if (this._tickmin == null) {
				tickmin -= delta * tickscale;
				if (tickmin < 0 && this._datamin != null && this._datamin >= 0) {
					tickmin = 0;
				}
			}
			if (this._tickmax == null) {
				tickmax += delta * tickscale;
				if (tickmax > 0 && this._datamax != null && this._datamax <= 0) {
					tickmax = 0;
				}
			}
		}
		this._min = tickmin;
		this._max = tickmax;
	};

	_pChartFloatValueAxisControl._setupTickGeneration = function (width, height) {
		if (!this._chart.isdatetimevalue) {
			nexacro.ChartAxisControl.prototype._setupTickGeneration.call(this, width, height);
			return;
		}
		var ticks;
		if (typeof this.ticks == "number" && this.ticks > 0) {
			ticks = this.ticks;
		}
		else {
			ticks = 0.3 * Math.sqrt(width);
		}
		var delta = (this._max - this._min) / ticks, dec = -Math.floor(Math.log(delta) / Math.LN10), magn = Math.pow(10, -dec), norm = delta / magn, tickinterval;

		if (norm < 1.5) {
			tickinterval = 1;
		}
		else if (norm < 3) {
			tickinterval = 2;
			if (norm > 2.25) {
				tickinterval = 2.5;
			}
		}
		else if (norm < 7.5) {
			tickinterval = 5;
		}
		else {
			tickinterval = 10;
		}

		tickinterval *= magn;

		this._delta = delta;
		var tickintervalchk = this.tickinterval;
		this._tickinterval = tickintervalchk || tickinterval;
	};

	_pChartFloatValueAxisControl._generateTimeTick = function (istotal) {
		var ticks = [], spec, d, min;

		if (this._tickmin) {
			min = this._min;
		}
		else {
			min = this._datamin;
		}
		d = new Date();
		d.setTime(min);

		var interval = 1;
		var unit = this._timesubtickformat;

		d.setMilliseconds(0);
		d.setSeconds(0);
		d.setMinutes(0);

		if (unit == "DAY") {
			d.setHours(1);
		}
		if (unit == "MONTH") {
			d.setDate(1);
		}
		if (unit == "YEAR") {
			d.setMonth(1);
		}

		var carry = 0;
		var v = Number.NaN;
		var prev;

		var max = this._max;
		if (!this.tickinterval || this.tickinterval == 1) {
			var maxDate = new Date();
			maxDate.setTime(max);

			if (unit == "HOUR") {
				maxDate.setMinutes(maxDate.getMinutes() + 30);
			}
			else if (unit == "MONTH") {
				maxDate.setDate(maxDate.getDate() + 15);
			}
			else if (unit == "YEAR") {
				maxDate.setMonth(maxDate.getMonth() + 6);
			}
			else {
				maxDate.setHours(maxDate.getHours() + 12);
			}
			max = this._max = maxDate.getTime();
		}
		do {
			prev = v;
			v = d.getTime();
			ticks.push(v);

			if (unit == "HOUR") {
				d.setHours(d.getHours() + interval);
			}
			else if (unit == "MONTH") {
				d.setMonth(d.getMonth() + interval);
			}
			else if (unit == "YEAR") {
				d.setFullYear(d.getFullYear() + interval);
			}
			else {
				d.setDate(d.getDate() + interval);
			}
		} while (v < max && v != prev);
		return ticks;
	};

	_pChartFloatValueAxisControl._getTextDate = function (date, mask) {
		var dateStr;
		var format;

		var yyyy = date.getFullYear();
		if (yyyy == 0) {
			yyyy = "0000";
		}
		else {
			yyyy = yyyy.toString().padLeft(4, "0");
		}

		var MM = date.getMonth() + 1;
		MM = (MM < 10 ? " " : "") + MM;

		var dd = date.getDate();
		dd = (dd < 10 ? " " : "") + dd;

		var yy = date.getYear() % 100;
		var M = +MM;
		var d = +dd;

		var hour = date.getHours();
		hour = (hour < 10 ? "0" : "") + hour;
		var h = +hour;

		format = mask;
		if (format.length == 0 || !format.match(/[yMdHhms]/)) {
			format = "yyyy-MM-dd ddd";
		}

		dateStr = format.replace("yyyy", yyyy);
		dateStr = dateStr.replace("MM", MM);
		dateStr = dateStr.replace("dd", dd);
		dateStr = dateStr.replace("yy", yy);
		dateStr = dateStr.replace("M", M);
		dateStr = dateStr.replace("d", d);

		var hh = hour;

		dateStr = dateStr.replace("HH", hour);
		dateStr = dateStr.replace("hh", hh);
		dateStr = dateStr.replace("H", h);
		dateStr = dateStr.replace("h", h);

		if (dateStr.indexOf(":") < 0) {
			dateStr = nexacro.replaceAll(dateStr, ":", "");
		}
		if (dateStr.indexOf("-") < 0) {
			dateStr = nexacro.replaceAll(dateStr, "-", "");
		}
		if (dateStr.indexOf("/") < 0) {
			dateStr = nexacro.replaceAll(dateStr, "/", "");
		}
		return {
			"str" : dateStr, 
			"y" : yyyy, 
			"m" : M, 
			"d" : d, 
			"h" : h
		};
	};

	_pChartFloatValueAxisControl._getDateFormat = function (mask) {
		if (mask.indexOf("h") >= 0) {
			return "HOUR";
		}
		if (mask.indexOf("ddd") >= 0) {
			return "DAYOFWEEK";
		}
		if (mask.indexOf("d") >= 0) {
			return "DAY";
		}
		if (mask.indexOf("M") >= 0) {
			return "MONTH";
		}
		if (mask.indexOf("y") >= 0) {
			return "YEAR";
		}
	};

	_pChartFloatValueAxisControl._setTicks = function (istotal) {
		if (!this._chart.isdatetimevalue) {
			nexacro.ChartAxisControl.prototype._setTicks.call(this, istotal);
			return;
		}

		var ticks = this.ticks, tickGen = [];

		var v, date, labeltype = this.labeltype, timelabelunitmask = this.timelabelunitmask, timelabelgroupmask = this.timelabelgroupmask, locale = this.locale;

		this._timemaintickformat = this._getDateFormat(timelabelgroupmask);
		this._timesubtickformat = this._getDateFormat(timelabelunitmask);

		this.on_apply_axistype();

		tickGen = this._generateTimeTick(istotal);



		this._ticks = [];
		var tickLength = tickGen.length;
		var interval = this.tickinterval ? this.tickinterval : 1;
		var labelgroup;
		var addCount = 0;
		for (var i = 0; i < tickLength; i++) {
			var label = null;
			var t = tickGen[i];
			if (typeof t == "object") {
				v = +t[0];
				if (t.length > 1) {
					label = t[1];
				}
			}
			else {
				v = +t;
				label = v;
			}

			date = new nexacro.Date();
			date.setTime(label);
			label = date;

			label = this._getTextDate(label, timelabelunitmask);
			labelgroup = this._getTextDate(date, timelabelgroupmask);

			if (interval == addCount) {
				addCount = 0;
			}

			if (!isNaN(v)) {
				this._ticks.push({
					v : v, 
					label : label.str, 
					labelgroup : labelgroup.str, 
					index : i, 
					total : tickLength, 
					y : label.y, 
					m : label.m, 
					d : label.d, 
					h : label.h, 
					subindex : addCount
				});
			}
			addCount++;
		}
	};

	_pChartFloatValueAxisControl._setData = function (clientWidth, clientHeight) {
		if (!this._chart.isdatetimevalue) {
			nexacro.ChartAxisControl.prototype._setData.call(this, clientWidth, clientHeight);
			return;
		}

		var changedTicks = this._changedTicks, ticklinestyle = this._ticklinestyle, boardlinestyle = this._boardlinestyle, pixedlabelheight = 0, pixedlabelwidth = 0;

		if (changedTicks || this._changedTickLabelRotate) {
			this._setRange();
			this._setupTickGeneration(clientWidth, clientHeight);
			this._setMinMaxTicks();
			var returnsize = this._setPixedLabelHeight(clientWidth, clientHeight);
			pixedlabelheight = returnsize[1];
			pixedlabelwidth = returnsize[0];

			this._setTicks();

			this._tickGroup.clear();
			this._tickMainGroup.clear();
			this._boardLineGroup.clear();
			this._labelGroup.clear();
			this._labelgroupGroup.clear();
		}

		var ticks = this._ticks, tick, value, tickLine, tickMainLine, ticklineopacity = this._ticklineopacity, boardlineopacity = this._boardlineopacity, tickLabel, tickMainLabel, labeltextfont = this.labeltextfont ? this.labeltextfont.value || this.labeltextfont : "12pt Verdana", labeltextcolor = this.labeltextcolor ? this.labeltextcolor.value || this.labeltextcolor : "#000000", labelrotate = this.labelrotate, textAlign = this._tickLabelTextAlign, verticalAlign = this._tickLabelVerticalAlign, labelmaxwidth = this.labeltextwidth, tickboardLine;
		var bTarget = true;

		if (changedTicks && (nexacro._isNull(textAlign) || nexacro._isNull(verticalAlign))) {
			this._getTickLabelAlign(labelrotate);
			textAlign = this._tickLabelTextAlign;
			verticalAlign = this._tickLabelVerticalAlign;
		}


		if (changedTicks || this._changedTickStyle || this._changedBoardLineStyle || 
			this._changedTickLabelRotate || this._changedTickLabelStyle) {
			for (var i = 0; i < ticks.length; i++) {
				tick = ticks[i];

				value = tick.v;
				{
				}

				if (changedTicks) {
					tickLine = new nexacro.ChartGraphicsLine();
					tickLine.set_id("ChartAxisLineTick" + i);
					this._tickGroup.addChild(tickLine);
					tick.lineElement = tickLine;
					tickLine._axis = this;

					tickLine.set_strokepen(ticklinestyle ? ticklinestyle.value || ticklinestyle : "1px solid #717a8380");
					tickLine.set_opacity(ticklineopacity ? ticklineopacity._sysvalue : 1);

					tickMainLine = new nexacro.ChartGraphicsLine();
					tickMainLine.set_id("ChartAxisLineMainTick" + i);
					this._tickMainGroup.addChild(tickMainLine);
					tick.lineMainElement = tickMainLine;
					tickMainLine._axis = this;

					tickMainLine.set_strokepen(ticklinestyle ? ticklinestyle.value || ticklinestyle : "1px solid #717a8380");
					tickMainLine.set_opacity(ticklineopacity ? ticklineopacity._sysvalue : 1);

					tickboardLine = new nexacro.ChartGraphicsLine();
					tickboardLine.set_id("ChartAxisTickBoardLine" + i);
					this._boardLineGroup.addChild(tickboardLine);
					tick.boardlineElement = tickboardLine;
					tickboardLine._axis = this;

					tickboardLine.set_strokepen(boardlinestyle ? boardlinestyle.value || boardlinestyle : "1px solid #717a8380");
					tickboardLine.set_opacity(boardlineopacity ? boardlineopacity._sysvalue : 1);
				}
				else {
					if (this._changedTickStyle) {
						tickLine = tick.lineElement;
						if (tickLine) {
							tickLine.set_strokepen(ticklinestyle ? ticklinestyle.value || ticklinestyle : "1px solid #717a8380");
							tickLine.set_opacity(ticklineopacity ? ticklineopacity._sysvalue : 1);
						}
						tickMainLine = tick.lineMainElement;
						if (tickMainLine) {
							tickMainLine.set_strokepen(ticklinestyle ? ticklinestyle.value || ticklinestyle : "1px solid #717a8380");
							tickMainLine.set_opacity(ticklineopacity ? ticklineopacity._sysvalue : 1);
						}
					}

					if (this._changedBoardLineStyle) {
						tickboardLine = tick.boardlineElement;
						if (tickboardLine) {
							tickboardLine.set_strokepen(boardlinestyle ? boardlinestyle.value || boardlinestyle : "1px solid #717a8380");
							tickboardLine.set_opacity(boardlineopacity ? boardlineopacity._sysvalue : 1);
						}
					}
				}
				if (this._tickintervalcategory > 0) {
					bTarget = ((i % this._tickintervalcategory) == 0 ? true : false);
				}
				if (!bTarget) {
					continue;
				}

				if (changedTicks || this._changedTickLabelRotate) {
					tickLabel = new nexacro.ChartGraphicsText(0, 0);
					tickLabel.set_id("ChartAxisLabel" + i);
					tickLabel.set_text(tick.label);
					this._labelGroup.addChild(tickLabel);
					tick.labelElement = tickLabel;
					tickLabel._axis = this;

					tickLabel.set_font(labeltextfont);
					tickLabel.set_color(labeltextcolor);
					if (labelmaxwidth > 0) {
						tickLabel.set_wordWrap(true);
						tickLabel.set_width(labelmaxwidth);
					}
					else {
						tickLabel.set_wordWrap(false);
					}

					tickLabel.set_textAlign(textAlign);
					tickLabel.set_verticalAlign(verticalAlign);
					tickLabel.setTransform("rotate(" + labelrotate + ",0,0)");

					tickMainLabel = new nexacro.ChartGraphicsText(0, 0);
					tickMainLabel.set_id("ChartAxisMainLabel" + i);
					tickMainLabel.set_text(tick.labelgroup);
					this._labelgroupGroup.addChild(tickMainLabel);
					tick.labelgroupElement = tickMainLabel;
					tickMainLabel._axis = this;

					tickMainLabel.set_font(labeltextfont);
					tickMainLabel.set_color(labeltextcolor);
					if (labelmaxwidth > 0) {
						tickMainLabel.set_wordWrap(true);
						tickMainLabel.set_width(labelmaxwidth);
					}
					else {
						tickMainLabel.set_wordWrap(false);
					}

					tickMainLabel.set_textAlign(textAlign);
					tickMainLabel.set_verticalAlign(verticalAlign);
					tickMainLabel.setTransform("rotate(" + labelrotate + ",0,0)");
				}
				else {
					if (this._changedTickLabelStyle) {
						tickLabel = tick.labelElement;
						tickLabel.set_font(labeltextfont);
						tickLabel.set_color(labeltextcolor);

						if (labelmaxwidth > 0) {
							tickLabel.set_wordWrap(true);
							tickLabel.set_width(labelmaxwidth);
						}
						else {
							tickLabel.set_wordWrap(false);
						}

						tickMainLabel = tick.labelgroupElement;
						tickMainLabel.set_font(labeltextfont);
						tickMainLabel.set_color(labeltextcolor);

						if (labelmaxwidth > 0) {
							tickMainLabel.set_wordWrap(true);
							tickMainLabel.set_width(labelmaxwidth);
						}
						else {
							tickMainLabel.set_wordWrap(false);
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
		if (changedTicks || this._changedTickLabelRotate) {
			this._labelHeight = pixedlabelheight;
			this._labelWidth = pixedlabelwidth;
		}
		else {
			this._labelHeight = info.height;
			this._labelWidth = info.width;
		}
		if (this._direction == "x") {
			this._tickendspace = this._labelWidth / 2;
			if (this.parent._chartxtickspace < this._tickendspace) {
				this.parent._chartxtickspace = this._tickendspace;
			}
		}
		else {
			this._tickendspace = this._labelHeight / 2;
			if (this.parent._chartytickspace < this._tickendspace) {
				this.parent._chartytickspace = this._tickendspace;
			}
		}
		this._tickendspace = 0;
	};

	_pChartFloatValueAxisControl._arrange = function (left, top, width, height) {
		nexacro.ChartAxisControl.prototype._arrange.call(this, left, top, width, height);
	};

	_pChartFloatValueAxisControl._getTickLabelAlign = function (labelrotate, index) {
		nexacro.ChartAxisControl.prototype._getTickLabelAlign.call(this, labelrotate, index);
	};

	_pChartFloatValueAxisControl._createAxisLine = function () {
		if (!this._axisLine) {
			this._axisLine = new nexacro.ChartGraphicsLine();
			this._axisLine.set_id("ChartAxisLine");
			this._group.addChild(this._axisLine);
			this._axisLine._axis = this;
		}
		if (!this._axisMainLine) {
			this._axisMainLine = new nexacro.ChartGraphicsLine();
			this._axisMainLine.set_id("ChartAxisMainLine");
			this._group.addChild(this._axisMainLine);
			this._axisMainLine._axis = this;
		}
	};

	_pChartFloatValueAxisControl._arrangeTickGroup = function (width, height) {
		if (!this._chart.isdatetimevalue) {
			nexacro.ChartAxisControl.prototype._arrangeTickGroup.call(this, width, height);
			return;
		}
		var axisLine = this._axisLine, axisMainLine = this._axisMainLine, direction = this._direction, location = this._location, axislinestyle = this._axislinestyle, axislinewidth = 0, x = 0, y = 0, axisRectWidth = 0, axisRectHeight = 0, tickendspace = this._tickendspace, axisRect = this._axisRect.getGlobalBoundRect(false, true);

		if (axisLine) {
			axislinewidth = axislinestyle ? axislinestyle._getBorderLeftWidth() : 0;
			axislinewidth *= 0.5;
		}

		var tickstartgap = 0;
		var tickendgap = 0;
		var charttype = this.parent._type_name;
		var type = this._type;
		var timelabelgroupmask = this.timelabelgroupmask;
		if (timelabelgroupmask == "") {
			timelabelgroupmask = null;
		}
		var tickinterval = this.tickinterval ? this.tickinterval : 1;

		x = axisRect.left;
		axisRectWidth = axisRect.width + tickendspace;

		if (location == "top") {
			y = axisRect.bottom - axislinewidth;
		}
		else {
			y = axisRect.top + axislinewidth;
		}

		if (axisLine) {
			axisLine.set_x1(x);
			axisLine.set_y1(y);
			axisLine.set_x2(x + axisRectWidth);
			axisLine.set_y2(y);
		}

		var ticks = this._ticks, tick, value, ticksize, tickXoff = 0, tickYoff = 0, tickmin = this._min, tickmax = this._max, tickboardLine, vc = 0;

		if ((this.ticksize == "" || this.ticksize == undefined) && this.ticksize !== 0) {
			ticksize = 10;
		}
		else {
			ticksize = this.ticksize;
		}
		var ticksizehalf = (ticksize / 2);
		if (ticksize > 0) {
			if (location == "top") {
				tickYoff = -ticksize;
				y -= axislinewidth;
			}
			else if (location == "bottom") {
				tickYoff = ticksize;
				y += axislinewidth;
			}
		}
		var y_half;
		if (location == "top") {
			y_half = y + ticksizehalf;
		}
		else {
			y_half = y = ticksizehalf;
		}

		axisMainLine.set_visible(false);
		var mainLineY, textH;
		if (ticks && ticks[0]) {
			var ticklabel = ticks[0].labelElement;
			var labelBoundRect = ticklabel.getGlobalBoundRect();
			textH = labelBoundRect.height;
			if (timelabelgroupmask) {
				if (tickinterval == 1) {
					mainLineY = y - textH;
				}
				else {
					mainLineY = y - ticksize - textH;
				}
				axisMainLine.set_x1(x);
				axisMainLine.set_y1(mainLineY);
				axisMainLine.set_x2(x + axisRectWidth);
				axisMainLine.set_y2(mainLineY);
				axisMainLine.set_visible(true);
			}
		}
		var timelabelareafillstyle = this._timelabelareafillstyle;
		if (timelabelareafillstyle && timelabelareafillstyle != "") {
			var axisLineRect = this._axisLineRect;
			axisLineRect.set_x(x);
			axisLineRect.set_width((x + axisRectWidth) - x);
			axisLineRect.set_y(mainLineY - textH);
			axisLineRect.set_height(textH + (y - mainLineY));
			axisLineRect.set_fillstyle(timelabelareafillstyle);
		}

		var xtickendspace = this.parent._xaxes[0]._tickendspace;
		var ytickendspace = this.parent._yaxes[0]._tickendspace;
		var tickgap = 0;
		var tickMain;
		var sv_y, sv_m, sv_d, sv_h;
		if (ticks.length > 1) {
			sv_y = ticks[1].y;
			sv_m = ticks[1].m;
			sv_d = ticks[1].d;
			sv_h = ticks[1].h;
		}
		var newi;
		for (var i = 0; i < ticks.length; i++) {
			if (!ticks[i]) {
				continue;
			}

			tick = ticks[i].lineElement;
			tickboardLine = ticks[i].boardlineElement;
			tickMain = ticks[i].lineMainElement;
			value = ticks[i].v;
			if (isNaN(value)) {
				continue;
			}

			vc = this.p2c(value);
			x = vc + axisRect.left;

			if (ticks[i].subindex == 0) {
				ticks[i]._point = {
					"x1" : x, 
					"y1" : y, 
					"x2" : x + tickXoff, 
					"y2" : y + tickYoff
				};
			}
			else {
				ticks[i]._point = {
					"x1" : x, 
					"y1" : y_half, 
					"x2" : x + tickXoff, 
					"y2" : y_half + tickYoff
				};
			}
			if (tick && i > 0) {
				if (ticks[i].subindex == 0) {
					tick.set_y1(y);

					if (timelabelgroupmask && tickinterval == 1) {
						tick.set_y2(mainLineY - 1);
					}
					else {
						tick.set_y2(y + tickYoff);
					}
				}
				else {
					tick.set_y1(y);
					tick.set_y2(y_half + tickYoff);
				}
				tick.set_x1(x);
				tick.set_x2(x + tickXoff);
			}


			if (tickinterval == 1) {
				newi = i - 1;
			}
			else {
				newi = i + 1;
			}
			if (timelabelgroupmask && tickMain && ticks[newi]) {
				sv_y = ticks[newi].y;
				sv_m = ticks[newi].m;
				sv_d = ticks[newi].d;
				sv_h = ticks[newi].h;
				tickMain.set_x1(x);
				tickMain.set_x2(x + tickXoff);
				if (this._timelabelgroupborderlinestyle) {
					var nGap = y - mainLineY;
					tickMain.set_strokepen(this._timelabelgroupborderlinestyle);
					tickMain.set_y1(mainLineY);
					tickMain.set_y2(mainLineY + height + nGap);
				}
				else {
					tickMain.set_y1(mainLineY);
					tickMain.set_y2(mainLineY + tickYoff);
				}
				if (this._timemaintickformat == "YEAR") {
					if (ticks[i].y == sv_y) {
						tickMain.set_visible(false);
					}
					else {
						tickMain.set_visible(true);
					}
				}
				if (this._timemaintickformat == "MONTH") {
					if (ticks[i].m == sv_m) {
						tickMain.set_visible(false);
					}
					else {
						tickMain.set_visible(true);
					}
				}
				if (this._timemaintickformat == "DAY") {
					if (ticks[i].d == sv_d) {
						tickMain.set_visible(false);
					}
					else {
						tickMain.set_visible(true);
					}
				}
			}
			else if (tickMain) {
				tickMain.set_visible(false);
			}

			if (i > 0 && ticks[i].subindex == 0 && tickboardLine) {
				tickboardLine.set_x1(vc);
				tickboardLine.set_y1(0);
				tickboardLine.set_x2(vc);
				tickgap = 0;
				if (this.parent.vrangebar && this.parent.vrangebar._group.visible) {
					tickgap = tickstartgap + tickendgap;
				}
				tickboardLine.set_y2(height + tickgap + ytickendspace);
			}
		}
	};

	_pChartFloatValueAxisControl._arrangeLabelGroup = function () {
		if (!this._chart.isdatetimevalue) {
			nexacro.ChartAxisControl.prototype._arrangeLabelGroup.call(this);
			return;
		}
		var ticks = this._ticks, tick, labelEle, textW = 0, textH = 0, x = 0, y = 0, value, labelrotate = this.labelrotate, location = this._location, labelgap = +this._labelgap, labelBoundRect, axislinestyle = this._axislinestyle, axislinewidth = 0, ticksize, _ticksize, tickGroupSize = 0, ticklinestyle = this._ticklinestyle, ticklinewidth = 0, pos, axisRect = this._axisRect.getGlobalBoundRect(false, true);

		axislinewidth = axislinestyle ? axislinestyle._getBorderLeftWidth() : 1;
		ticklinewidth = ticklinestyle ? ticklinestyle._getBorderLeftWidth() : 1;

		var timelabelgroupmask = this.timelabelgroupmask;
		if (timelabelgroupmask == "") {
			timelabelgroupmask = null;
		}
		var tickinterval = this.tickinterval ? this.tickinterval : 1;

		var axisLine = this._axisLine;
		var axisMainLine = this._axisMainLine;
		var nMainLineY, nSubLineY, nLineGap = 0, nLineGapHalf = 0;
		if (axisLine) {
			nSubLineY = axisLine.y1;
		}
		if (axisMainLine && timelabelgroupmask) {
			nMainLineY = axisMainLine.y1;
			nLineGap = nSubLineY - nMainLineY;
			nLineGapHalf = (nLineGap / 2);
		}
		if (!timelabelgroupmask) {
			this._labelgroupGroup.set_visible(false);
		}

		if ((this.ticksize == "" || this.ticksize == undefined) && this.ticksize !== 0) {
			_ticksize = 10;
		}
		else {
			_ticksize = this.ticksize;
		}
		ticksize = +_ticksize;

		if (ticklinewidth < 1) {
			ticksize = 0;
		}

		if (nLineGapHalf == 0) {
			nLineGapHalf = ticksize;
		}

		tickGroupSize = (ticksize * 2);

		var tickGap, tickGapHalf;
		if (ticks[0] && ticks[1]) {
			tickGap = ticks[1]._point.x1 - ticks[0]._point.x1;
		}
		else if (ticks[0]) {
			var axisRect = this._axisRect.getGlobalBoundRect(false, true);
			tickGap = ticks[0]._point.x1 - axisRect.left;
		}
		tickGapHalf = (tickGap / 2);

		var sv_y, sv_m, sv_d, sv_h;

		var txtX;
		var labelgroupEle;
		var addMainGap = 0;
		for (var i = 0; i < ticks.length; i++) {
			tick = ticks[i];

			labelEle = tick.labelElement;
			labelgroupEle = tick.labelgroupElement;

			value = tick.v;

			if (!tick._point || nexacro._ChartGraphicsLib.isEmpty(tick.label)) {
				continue;
			}

			labelBoundRect = labelEle.getGlobalBoundRect();
			textW = labelBoundRect.width;
			textH = labelBoundRect.height;

			x = txtX = tick._point.x1;
			pos = labelEle.getCenter();
			var cx = pos.x;

			var _txtWidthHalf = (labelEle._txtSize[0] || textW) / 2;
			if (x == axisRect.left) {
				if (cx - (_txtWidthHalf) < 0) {
					txtX = axisRect.left + (Math.abs(cx - _txtWidthHalf));
				}
			}
			else if (x == axisRect.right) {
				var rectwidth = this.parent._getClientWidth();
				if (cx + (_txtWidthHalf) > rectwidth) {
					txtX = axisRect.right - ((cx + _txtWidthHalf) - rectwidth);
				}
			}
			y = tick._point.y1;

			if (labelEle && tick.subindex == 0) {
				labelEle.set_textAlign(this._tickLabelTextAlign ? this._tickLabelTextAlign : "center");
				labelEle.set_verticalAlign(this._tickLabelVerticalAlign ? this._tickLabelVerticalAlign : "top");

				if (tickinterval > 1) {
					labelEle.set_x(txtX);
				}
				else {
					labelEle.set_x(txtX + tickGapHalf);
				}
				labelEle.set_y(y - nLineGapHalf);
				labelEle.set_verticalAlign("middle");
			}
			else {
				labelEle.set_visible(false);
			}

			if (timelabelgroupmask && labelgroupEle) {
				if (ticks[i + 1]) {
					sv_y = ticks[i + 1].y;
					sv_m = ticks[i + 1].m;
					sv_d = ticks[i + 1].d;
					sv_h = ticks[i + 1].h;
				}
				else {
					sv_y = "9999";
					sv_m = "99";
					sv_d = "99";
					sv_h = "99";
				}
				if (this._timemaintickformat == "YEAR") {
					if (tick.y == sv_y) {
						labelgroupEle.set_visible(false);
					}
					else {
						labelgroupEle.set_visible(true);
					}
				}
				if (this._timemaintickformat == "MONTH") {
					if (tick.m == sv_m) {
						labelgroupEle.set_visible(false);
					}
					else {
						labelgroupEle.set_visible(true);
					}
				}
				if (this._timemaintickformat == "DAY") {
					if (tick.d == sv_d) {
						labelgroupEle.set_visible(false);
					}
					else {
						labelgroupEle.set_visible(true);
					}
				}
				addMainGap += tickGap;
				if (labelgroupEle.visible) {
					labelgroupEle.set_x(x - (addMainGap / 2));
					labelgroupEle.set_y(nMainLineY - _ticksize);
					labelgroupEle.set_textAlign("center");
					labelgroupEle.set_verticalAlign("middle");
					addMainGap = 0;
				}
			}
		}
	};

	_pChartFloatValueAxisControl.on_apply_axislinestyle = function (axislinestyle) {
		nexacro.ChartAxisControl.prototype.on_apply_axislinestyle.call(this, axislinestyle);
		if (this._chart.isdatetimevalue) {
			if (this._axisMainLine) {
				axislinestyle = this._timeboardgrouplinestyle ? this._timeboardgrouplinestyle : axislinestyle;
				this._axisMainLine.set_strokepen(axislinestyle ? axislinestyle.value || axislinestyle : "1px solid #717a8380");
			}
		}
	};

	_pChartFloatValueAxisControl._afterSetProperties = function () {
		this.on_apply_boardlinevisible(this.boardlinevisible);
		this.on_apply_axislinestyle(this._axislinestyle);
		this.on_apply_ticklinestyle(this._ticklinestyle);
		this.on_apply_labeltextfont(this._labeltextfont);
		this.on_apply_labeltextcolor(this._labeltextcolor);
		this.on_apply_titletext(this.titletext);
		this.on_apply_titletextfont(this._titletextfont);
		this.on_apply_titletextcolor(this._titletextcolor);

		this.on_apply_axistype();
	};
}

if (!nexacro.ChartFloatSeriesControl) {
	nexacro.ChartFloatSeriesControl = function (id, parent, graphicsControl) {
		nexacro._SeriesBase.prototype.constructor.apply(this, arguments);

		this._seriesitems = [];
		this.value2column = new nexacro.BindableValue("");
		this.value3column = new nexacro.BindableValue("");
	};

	var _pChartFloatSeriesControl = nexacro._createPrototype(nexacro._SeriesBase, nexacro.ChartFloatSeriesControl);
	nexacro.ChartFloatSeriesControl.prototype = _pChartFloatSeriesControl;
	_pChartFloatSeriesControl._type_name = "ChartFloatSeriesControl";


	_pChartFloatSeriesControl.waterfallsumbarfillstyle = "";
	_pChartFloatSeriesControl.positivebarfillstyle = "";
	_pChartFloatSeriesControl.negativebarfillstyle = "";
	_pChartFloatSeriesControl.baropacity = 1;
	_pChartFloatSeriesControl.barsize = undefined;
	_pChartFloatSeriesControl.barvisible = true;
	_pChartFloatSeriesControl.highlightpositivebarfillstyle = "";
	_pChartFloatSeriesControl.highlightnegativebarfillstyle = "";
	_pChartFloatSeriesControl.highlightbaropacity = 1;
	_pChartFloatSeriesControl.highlightbarvisible = false;
	_pChartFloatSeriesControl.shadowstyle = null;
	_pChartFloatSeriesControl.barradius = 0;
	_pChartFloatSeriesControl.selectpositivebarfillstyle = "";
	_pChartFloatSeriesControl.selectnegativebarfillstyle = "";
	_pChartFloatSeriesControl.selectbaropacity = 1;
	_pChartFloatSeriesControl.valueaxis = "";
	_pChartFloatSeriesControl.autogradation = "none";
	_pChartFloatSeriesControl.waterfallsumbarlinestyle = null;
	_pChartFloatSeriesControl.positivebarlinestyle = null;
	_pChartFloatSeriesControl.negativebarlinestyle = null;
	_pChartFloatSeriesControl.visible = true;
	_pChartFloatSeriesControl.linevisible = false;
	_pChartFloatSeriesControl.itemtextposition = "";
	_pChartFloatSeriesControl.itemtextgap = undefined;


	_pChartFloatSeriesControl._pointshape = null;
	_pChartFloatSeriesControl._borderwidth = null;

	_pChartFloatSeriesControl._color = null;
	_pChartFloatSeriesControl._xaxis = null;
	_pChartFloatSeriesControl._yaxis = null;
	_pChartFloatSeriesControl._changedSeriesColor = true;

	_pChartFloatSeriesControl._barsize = null;
	_pChartFloatSeriesControl._baralign = "center";
	_pChartFloatSeriesControl._barwidth = null;
	_pChartFloatSeriesControl._waterfallsumbarfillstyle = null;
	_pChartFloatSeriesControl._waterfallsumbarlinestyle = null;
	_pChartFloatSeriesControl._positivebarlinestyle = null;
	_pChartFloatSeriesControl._positivebarfillstyle = null;
	_pChartFloatSeriesControl._negativebarlinestyle = null;
	_pChartFloatSeriesControl._negativebarfillstyle = null;
	_pChartFloatSeriesControl._invalidvalue2column = false;
	_pChartFloatSeriesControl._invalidvalue3column = false;
	_pChartFloatSeriesControl._baropacity = null;
	_pChartFloatSeriesControl.waterfalllinestyle = null;
	_pChartFloatSeriesControl._waterfalllinestyle = null;

	_pChartFloatSeriesControl.set_shadowstyle = function (val) {
		if (val == "") {
			val = null;
		}
		this.shadowstyle = val;
		if (val) {
			if (this._shadowstyle == null || this._shadowstyle.value != val) {
				var oldValue;
				if (this._shadowstyle) {
					oldValue = this._shadowstyle.value;
				}
				this._changeContentsProperty("shadowstyle", val, oldValue);

				var shadowstyle = nexacro.ShadowObjectNew(val);
				this._shadowstyle = shadowstyle;
				this.on_apply_shadowstyle(shadowstyle);
			}
		}
		else {
			if (this._shadowstyle) {
				this._shadowstyle = null;
				this.on_apply_shadowstyle(null);
			}
		}
	};
	_pChartFloatSeriesControl.on_apply_shadowstyle = function (shadowstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "shadowstyle", shadowstyle);

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartFloatSeriesControl.set_autogradation = function (val) {
		if (!val || val == "") {
			val = "none";
		}
		if (val != this.autogradation) {
			this._changeContentsProperty("autogradation", val, this.autogradation);
			this.autogradation = val;
			this.on_apply_autogradation(val);
		}
		this._chart._draw();
	};
	_pChartFloatSeriesControl.on_apply_autogradation = function (autogradation) {
		this._redrawSeries = false;
	};

	_pChartFloatSeriesControl.set_valueaxis = function (val) {
		if (this.valueaxis != val) {
			this._changeContentsProperty("valueaxis", val, this.valueaxis);
			this.valueaxis = val;
			this.on_apply_valueaxis(val);
		}

		this._chart._draw();
	};
	_pChartFloatSeriesControl.set_value2column = function (v) {
		if (this.value2column._value != v) {
			this._changeContentsProperty("value2column", v, this.value2column);
			this.value2column._set(v);
			this.on_apply_value2column();
		}

		this._chart._recreate = true;
		this._chart._reset = true;
		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_value2column = function () {
		var bindtype = this.value2column._bindtype;
		if (bindtype == 0) {
			this._invalidvalue2column = true;
		}
		else {
			var value2column = this._getBindableValue("value2column");
			var binddataset = this._chart._binddataset;
			if (binddataset) {
				var coltype = binddataset._getColumnType(value2column);
				if (!coltype) {
					this._invalidvalue2column = true;
				}
				else {
					this._invalidvalue2column = false;
				}
				if (coltype >= 5 && coltype < 8) {
				}
				else {
				}
			}
		}

		this._chart._changedData = true;
	};

	_pChartFloatSeriesControl.set_value3column = function (v) {
		if (this.value3column._value != v) {
			this._changeContentsProperty("value3column", v, this.value3column);
			this.value3column._set(v);
			this.on_apply_value3column();
		}


		if (this._chart._changedData == true) {
			this._chart._reset = true;
			this._chart._draw();
		}
		else {
			this._chart._draw();
		}
	};

	_pChartFloatSeriesControl.on_apply_value3column = function () {
		var bindtype = this.value3column._bindtype;
		if (bindtype == 0) {
			this._invalidvalue3column = true;
		}
		else {
			var value3column = this._getBindableValue("value3column");
			var binddataset = this._chart._binddataset;
			if (binddataset) {
				var coltype = binddataset._getColumnType(value3column);
				if (!coltype) {
					this._invalidvalue3column = true;
				}
				else {
					this._invalidvalue3column = false;
				}
			}
		}

		this._chart._changedData = true;
	};

	_pChartFloatSeriesControl.on_apply_valueaxis = function (valueaxisid) {
		var valueaxis = this.parent.getValueaxisByID(valueaxisid);
		if (valueaxis) {
			valueaxis._used = true;
			valueaxis._afterSetProperties();

			var usedxAxis = false;
			var usedyAxis = false;
			if (this._chart.seriesset) {
				var seriesset = this._chart.seriesset;
				for (var i = seriesset.length - 1; i > -1; i--) {
					if (seriesset[i] && seriesset[i].id != this.id) {
						if ((seriesset[i]._yaxis && this._yaxis && seriesset[i]._yaxis.id == this._yaxis.id) && !usedyAxis) {
							usedyAxis = true;
						}
						if ((seriesset[i]._xaxis && this._xaxis && seriesset[i]._xaxis.id == this._xaxis.id) && !usedxAxis) {
							usedxAxis = true;
						}
					}
				}
			}
			if (this._xaxis && this._xaxis.id != valueaxis.id && !usedxAxis) {
				if (this._xaxis._type != "categoryAxis") {
					this._xaxis._used = false;
					this._xaxis.on_apply_visible(false);
				}
			}
			if (this._yaxis && this._yaxis.id != valueaxis.id && !usedyAxis) {
				if (this._yaxis._type != "categoryAxis") {
					this._yaxis._used = false;
					this._yaxis.on_apply_visible(false);
				}
			}

			if (valueaxis._direction == "x") {
				if (this.categoryaxis) {
					if (this.categoryaxis._direction == "x") {
						this._xaxis = this.categoryaxis;
						this._yaxis = valueaxis;
					}
					else {
						this._xaxis = valueaxis;
						this._yaxis = this.categoryaxis;
					}
				}
				else {
					this._xaxis = valueaxis;
				}
			}
			else {
				if (this.categoryaxis) {
					if (this.categoryaxis._direction == "x") {
						this._xaxis = this.categoryaxis;
						this._yaxis = valueaxis;
					}
					else {
						this._xaxis = valueaxis;
						this._yaxis = this.categoryaxis;
					}
				}
				else {
					this._yaxis = valueaxis;
				}
			}

			this._chart._changedData = true;
		}
	};

	_pChartFloatSeriesControl.set_visible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.visible != val) {
			this._changeContentsProperty("visible", val, this.visible);
			this.visible = val;
			this.on_apply_visible();
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_visible = function () {
		if (this._is_initprop) {
			return;
		}

		var visible = this.visible;
		var selecttype = this.selecttype;

		if (visible) {
			if (selecttype) {
				this._chart._changedData = true;
			}
			else {
				this._chart._changedData = true;
				this._applyPropertySeries("Bar", "visible", true);
			}

			if (this.itemtextvisible) {
				this.on_apply_itemtextvisible(true);
			}
		}
		else {
			this._chart._changedData = true;
			this._applyPropertySeries("Bar", "visible", false);

			if (!this._itemtextvisible) {
				this.on_apply_itemtextvisible(false);
			}
		}

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartFloatSeriesControl.set_barsize = function (val) {
		var lVal = null;
		if (val !== undefined && val !== null && val !== "") {
			if (nexacro._isNumber(val)) {
				lVal = val;
			}
			else {
				if (val.length > 0) {
					lVal = +val;
					if (isNaN(lVal)) {
						return;
					}
				}
			}
		}

		if (lVal < 0 || lVal > 100) {
			return;
		}

		if (this.barsize != val) {
			this.barsize = val;
			this.on_apply_barsize(lVal);
		}

		this._chart._reset = true;
		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_barsize = function (barsize) {
		if (!nexacro._ChartGraphicsLib.isEmpty(barsize)) {
			this._barsize = this.barsize * 0.01;
		}
		else {
			var chartbarsize = this._chart._barsize;
			if (!nexacro._isNull(chartbarsize)) {
				this._barsize = chartbarsize;
			}
		}
		this._chart._changedData = true;
	};

	_pChartFloatSeriesControl.set_waterfalllinestyle = function (val) {
		this.waterfalllinestyle = val;
		if (val) {
			if (this._waterfalllinestyle == null || this._waterfalllinestyle.value != val) {
				var oldValue;
				if (this._waterfalllinestyle) {
					oldValue = this._waterfalllinestyle.value;
				}
				this._changeContentsProperty("waterfalllinestyle", val, oldValue);

				var waterfalllinestyle = nexacro.BorderLineObject(val);
				this._waterfalllinestyle = waterfalllinestyle;
				this.on_apply_waterfalllinestyle(waterfalllinestyle);
			}
		}
		else {
			if (this._waterfalllinestyle) {
				this._waterfalllinestyle = null;
				this.on_apply_waterfalllinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_waterfalllinestyle = function (waterfalllinestyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "waterfalllinestyle", waterfalllinestyle);
	};

	_pChartFloatSeriesControl.set_positivebarlinestyle = function (val) {
		this.positivebarlinestyle = val;
		if (val) {
			if (this._positivebarlinestyle == null || this._positivebarlinestyle.value != val) {
				var oldValue;
				if (this._positivebarlinestyle) {
					oldValue = this._positivebarlinestyle.value;
				}
				this._changeContentsProperty("positivebarlinestyle", val, oldValue);

				var positivebarlinestyle = nexacro.BorderLineObject(val);
				this._positivebarlinestyle = positivebarlinestyle;
				this.on_apply_positivebarlinestyle(positivebarlinestyle);
			}
		}
		else {
			if (this._positivebarlinestyle) {
				this._positivebarlinestyle = null;
				this.on_apply_positivebarlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_positivebarlinestyle = function (positivebarlinestyle) {
		if (positivebarlinestyle) {
		}
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "positivebarlinestyle", positivebarlinestyle);
	};

	_pChartFloatSeriesControl.set_negativebarlinestyle = function (val) {
		this.negativebarlinestyle = val;
		if (val) {
			if (this._negativebarlinestyle == null || this._negativebarlinestyle.value != val) {
				var oldValue;
				if (this._negativebarlinestyle) {
					oldValue = this._negativebarlinestyle.value;
				}
				this._changeContentsProperty("negativebarlinestyle", val, oldValue);

				var negativebarlinestyle = nexacro.BorderLineObject(val);
				this._negativebarlinestyle = negativebarlinestyle;
				this.on_apply_negativebarlinestyle(negativebarlinestyle);
			}
		}
		else {
			if (this._negativebarlinestyle) {
				this._negativebarlinestyle = null;
				this.on_apply_negativebarlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_negativebarlinestyle = function (negativebarlinestyle) {
		if (negativebarlinestyle) {
		}
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "negativebarlinestyle", negativebarlinestyle);
	};

	_pChartFloatSeriesControl.set_waterfallsumbarlinestyle = function (val) {
		this.waterfallsumbarlinestyle = val;
		if (val) {
			if (this._waterfallsumbarlinestyle == null || this._waterfallsumbarlinestyle.value != val) {
				var oldValue;
				if (this._waterfallsumbarlinestyle) {
					oldValue = this._waterfallsumbarlinestyle.value;
				}
				this._changeContentsProperty("waterfallsumbarlinestyle", val, oldValue);

				var waterfallsumbarlinestyle = nexacro.BorderLineObject(val);
				this._waterfallsumbarlinestyle = waterfallsumbarlinestyle;
				this.on_apply_waterfallsumbarlinestyle(waterfallsumbarlinestyle);
			}
		}
		else {
			if (this._waterfallsumbarlinestyle) {
				this._waterfallsumbarlinestyle = null;
				this.on_apply_waterfallsumbarlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_waterfallsumbarlinestyle = function (waterfallsumbarlinestyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "waterfallsumbarlinestyle", waterfallsumbarlinestyle);
	};

	_pChartFloatSeriesControl.set_positivebarfillstyle = function (val) {
		this.positivebarfillstyle = val;
		if (val) {
			if (this._positivebarfillstyle == null || this._positivebarfillstyle.value != val) {
				var oldValue;
				if (this._positivebarfillstyle) {
					oldValue = this._positivebarfillstyle.value;
				}
				this._changeContentsProperty("positivebarfillstyle", val, oldValue);

				var positivebarfillstyle = val;
				var arrColorList = this._spliterColor(val, true);
				if (!arrColorList) {
				}
				else if (arrColorList.length == 1) {
					positivebarfillstyle = arrColorList[0];
				}
				else {
					positivebarfillstyle = arrColorList;
				}

				this._positivebarfillstyle = positivebarfillstyle;
				this.on_apply_positivebarfillstyle(positivebarfillstyle);
			}
		}
		else {
			if (this._positivebarfillstyle) {
				this._positivebarfillstyle = null;
				this.on_apply_positivebarfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_positivebarfillstyle = function (positivebarfillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "positivebarfillstyle", positivebarfillstyle);

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartFloatSeriesControl.set_negativebarfillstyle = function (val) {
		this.negativebarfillstyle = val;
		if (val) {
			if (this._negativebarfillstyle == null || this._negativebarfillstyle.value != val) {
				var oldValue;
				if (this._negativebarfillstyle) {
					oldValue = this._negativebarfillstyle.value;
				}
				this._changeContentsProperty("negativebarfillstyle", val, oldValue);

				var negativebarfillstyle = val;
				var arrColorList = this._spliterColor(val, true);
				if (!arrColorList) {
				}
				else if (arrColorList.length == 1) {
					negativebarfillstyle = arrColorList[0];
				}
				else {
					negativebarfillstyle = arrColorList;
				}

				this._negativebarfillstyle = negativebarfillstyle;
				this.on_apply_negativebarfillstyle(negativebarfillstyle);
			}
		}
		else {
			if (this._negativebarfillstyle) {
				this._negativebarfillstyle = null;
				this.on_apply_negativebarfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_negativebarfillstyle = function (negativebarfillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "negativebarfillstyle", negativebarfillstyle);

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartFloatSeriesControl.set_waterfallsumbarfillstyle = function (val) {
		this.waterfallsumbarfillstyle = val;
		if (val) {
			if (this._waterfallsumbarfillstyle == null || this._waterfallsumbarfillstyle.value != val) {
				var oldValue;
				if (this._waterfallsumbarfillstyle) {
					oldValue = this._waterfallsumbarfillstyle.value;
				}
				this._changeContentsProperty("waterfallsumbarfillstyle", val, oldValue);

				var waterfallsumbarfillstyle = nexacro.BackgroundObject(val, this);

				this._waterfallsumbarfillstyle = waterfallsumbarfillstyle;
				this.on_apply_waterfallsumbarfillstyle(waterfallsumbarfillstyle);
			}
		}
		else {
			if (this._waterfallsumbarfillstyle) {
				this._waterfallsumbarfillstyle = null;
				this.on_apply_waterfallsumbarfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_waterfallsumbarfillstyle = function (waterfallsumbarfillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "waterfallsumbarfillstyle", waterfallsumbarfillstyle);

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartFloatSeriesControl.set_baropacity = function (val) {
		this.baropacity = val;
		if (0 === val || val) {
			if (this._baropacity == null || this._baropacity.value != val) {
				var oldValue;
				if (this._baropacity) {
					oldValue = this._baropacity.value;
				}
				this._changeContentsProperty("baropacity", val, oldValue);

				var baropacity = nexacro.OpacityObject(val);
				this._baropacity = baropacity;
				this.on_apply_baropacity(baropacity);
			}
		}
		else {
			if (this._baropacity) {
				this._baropacity = null;
				this.on_apply_baropacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_baropacity = function (opacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "baropacity", opacity);
	};

	_pChartFloatSeriesControl.set_highlightbarvisible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.highlightbarvisible != val) {
			this._changeContentsProperty("highlightbarvisible", val, this.highlightbarvisible);
			this.highlightbarvisible = val;
			this.on_apply_highlightbarvisible(val);
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_highlightbarvisible = function (highlightbarvisible) {
	};

	_pChartFloatSeriesControl.set_highlightpositivebarlinestyle = function (val) {
		this.highlightpositivebarlinestyle = val;
		if (val) {
			if (this._highlightpositivebarlinestyle == null || this._highlightpositivebarlinestyle.value != val) {
				var oldValue;
				if (this._highlightpositivebarlinestyle) {
					oldValue = this._highlightpositivebarlinestyle.value;
				}
				this._changeContentsProperty("highlightpositivebarlinestyle", val, oldValue);

				var highlightpositivebarlinestyle = nexacro.BorderLineObject(val);
				this._highlightpositivebarlinestyle = highlightpositivebarlinestyle;
				this.on_apply_highlightpositivebarlinestyle(highlightpositivebarlinestyle);
			}
		}
		else {
			if (this._pointlinestyle) {
				this._pointlinestyle = null;
				this.on_apply_highlightpositivebarlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_highlightpositivebarlinestyle = function (highlightpositivebarlinestyle) {
	};

	_pChartFloatSeriesControl.set_highlightnegativebarlinestyle = function (val) {
		this.highlightnegativebarlinestyle = val;
		if (val) {
			if (this._highlightnegativebarlinestyle == null || this._highlightnegativebarlinestyle.value != val) {
				var oldValue;
				if (this._highlightnegativebarlinestyle) {
					oldValue = this._highlightnegativebarlinestyle.value;
				}
				this._changeContentsProperty("highlightnegativebarlinestyle", val, oldValue);

				var highlightnegativebarlinestyle = nexacro.BorderLineObject(val);
				this._highlightnegativebarlinestyle = highlightnegativebarlinestyle;
				this.on_apply_highlightnegativebarlinestyle(highlightnegativebarlinestyle);
			}
		}
		else {
			if (this._pointlinestyle) {
				this._pointlinestyle = null;
				this.on_apply_highlightnegativebarlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_highlightnegativebarlinestyle = function (highlightnegativebarlinestyle) {
	};

	_pChartFloatSeriesControl.set_highlightpositivebarfillstyle = function (val) {
		this.highlightpositivebarfillstyle = val;
		if (val) {
			if (this._highlightpositivebarfillstyle == null || this._highlightpositivebarfillstyle.value != val) {
				var oldValue;
				if (this._highlightpositivebarfillstyle) {
					oldValue = this._highlightpositivebarfillstyle.value;
				}
				this._changeContentsProperty("highlightpositivebarfillstyle", val, oldValue);

				var highlightpositivebarfillstyle = nexacro.BackgroundObject(val, this);
				this._highlightpositivebarfillstyle = highlightpositivebarfillstyle;
				this.on_apply_highlightpositivebarfillstyle(highlightpositivebarfillstyle);
			}
		}
		else {
			if (this._highlightpositivebarfillstyle) {
				this._highlightpositivebarfillstyle = null;
				this.on_apply_highlightpositivebarfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_highlightpositivebarfillstyle = function (highlightpositivebarfillstyle) {
	};

	_pChartFloatSeriesControl.set_highlightnegativebarfillstyle = function (val) {
		this.highlightnegativebarfillstyle = val;
		if (val) {
			if (this._highlightnegativebarfillstyle == null || this._highlightnegativebarfillstyle.value != val) {
				var oldValue;
				if (this._highlightnegativebarfillstyle) {
					oldValue = this._highlightnegativebarfillstyle.value;
				}
				this._changeContentsProperty("highlightnegativebarfillstyle", val, oldValue);

				var highlightnegativebarfillstyle = nexacro.BackgroundObject(val, this);
				this._highlightnegativebarfillstyle = highlightnegativebarfillstyle;
				this.on_apply_highlightnegativebarfillstyle(highlightnegativebarfillstyle);
			}
		}
		else {
			if (this._highlightnegativebarfillstyle) {
				this._highlightnegativebarfillstyle = null;
				this.on_apply_highlightnegativebarfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_highlightnegativebarfillstyle = function (highlightnegativebarfillstyle) {
	};

	_pChartFloatSeriesControl.set_highlightbaropacity = function (val) {
		this.highlightbaropacity = val;
		if (0 === val || val) {
			if (this._highlightbaropacity == null || this._highlightbaropacity.value != val) {
				var oldValue;
				if (this._highlightbaropacity) {
					oldValue = this._highlightbaropacity.value;
				}
				this._changeContentsProperty("highlightbaropacity", val, oldValue);

				var highlightbaropacity = nexacro.OpacityObject(val);
				this._highlightbaropacity = highlightbaropacity;
				this.on_apply_highlightbaropacity(highlightbaropacity);
			}
		}
		else {
			if (this._highlightbaropacity) {
				this._highlightbaropacity = null;
				this.on_apply_highlightbaropacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_highlightbaropacity = function (highlightbaropacity) {
	};

	_pChartFloatSeriesControl.set_selectpositivebarlinestyle = function (val) {
		this.selectpositivebarlinestyle = val;
		if (val) {
			if (this._selectpositivebarlinestyle == null || this._selectpositivebarlinestyle.value != val) {
				var oldValue;
				if (this._selectpositivebarlinestyle) {
					oldValue = this._selectpositivebarlinestyle.value;
				}
				this._changeContentsProperty("selectpositivebarlinestyle", val, oldValue);

				var selectpositivebarlinestyle = nexacro.BorderLineObject(val);
				this._selectpositivebarlinestyle = selectpositivebarlinestyle;
				this.on_apply_selectpositivebarlinestyle(selectpositivebarlinestyle);
			}
		}
		else {
			if (this._selectpositivebarlinestyle) {
				this._selectpositivebarlinestyle = null;
				this.on_apply_selectpositivebarlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_selectpositivebarlinestyle = function (selectpositivebarlinestyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "selectpositivebarlinestyle", selectpositivebarlinestyle, "select");
	};

	_pChartFloatSeriesControl.set_selectnegativebarlinestyle = function (val) {
		this.selectnegativebarlinestyle = val;
		if (val) {
			if (this._selectnegativebarlinestyle == null || this._selectnegativebarlinestyle.value != val) {
				var oldValue;
				if (this._selectnegativebarlinestyle) {
					oldValue = this._selectnegativebarlinestyle.value;
				}
				this._changeContentsProperty("selectnegativebarlinestyle", val, oldValue);

				var selectnegativebarlinestyle = nexacro.BorderLineObject(val);
				this._selectnegativebarlinestyle = selectnegativebarlinestyle;
				this.on_apply_selectnegativebarlinestyle(selectnegativebarlinestyle);
			}
		}
		else {
			if (this._selectnegativebarlinestyle) {
				this._selectnegativebarlinestyle = null;
				this.on_apply_selectnegativebarlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_selectnegativebarlinestyle = function (selectnegativebarlinestyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "selectnegativebarlinestyle", selectnegativebarlinestyle, "select");
	};

	_pChartFloatSeriesControl.set_selectpositivebarfillstyle = function (val) {
		this.selectpositivebarfillstyle = val;
		if (val) {
			if (this._selectpositivebarfillstyle == null || this._selectpositivebarfillstyle.value != val) {
				var oldValue;
				if (this._selectpositivebarfillstyle) {
					oldValue = this._selectpositivebarfillstyle.value;
				}
				this._changeContentsProperty("selectpositivebarfillstyle", val, oldValue);

				var selectpositivebarfillstyle = nexacro.BackgroundObject(val, this);
				this._selectpositivebarfillstyle = selectpositivebarfillstyle;
				this.on_apply_selectpositivebarfillstyle(selectpositivebarfillstyle);
			}
		}
		else {
			if (this._selectpositivebarfillstyle) {
				this._selectpositivebarfillstyle = null;
				this.on_apply_selectpositivebarfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_selectpositivebarfillstyle = function (selectpositivebarfillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "selectpositivebarfillstyle", selectpositivebarfillstyle, "select");
	};

	_pChartFloatSeriesControl.set_selectnegativebarfillstyle = function (val) {
		this.selectnegativebarfillstyle = val;
		if (val) {
			if (this._selectnegativebarfillstyle == null || this._selectnegativebarfillstyle.value != val) {
				var oldValue;
				if (this._selectnegativebarfillstyle) {
					oldValue = this._selectnegativebarfillstyle.value;
				}
				this._changeContentsProperty("selectnegativebarfillstyle", val, oldValue);

				var selectnegativebarfillstyle = nexacro.BackgroundObject(val, this);
				this._selectnegativebarfillstyle = selectnegativebarfillstyle;
				this.on_apply_selectnegativebarfillstyle(selectnegativebarfillstyle);
			}
		}
		else {
			if (this._selectnegativebarfillstyle) {
				this._selectnegativebarfillstyle = null;
				this.on_apply_selectnegativebarfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_selectnegativebarfillstyle = function (selectnegativebarfillstyle) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "selectnegativebarfillstyle", selectnegativebarfillstyle, "select");
	};

	_pChartFloatSeriesControl.set_selectbaropacity = function (val) {
		this.selectbaropacity = val;
		if (0 === val || val) {
			if (this._selectbaropacity == null || this._selectbaropacity.value != val) {
				var oldValue;
				if (this._selectbaropacity) {
					oldValue = this._selectbaropacity.value;
				}
				this._changeContentsProperty("selectbaropacity", val, oldValue);

				var selectbaropacity = nexacro.OpacityObject(val);
				this._selectbaropacity = selectbaropacity;
				this.on_apply_selectbaropacity(selectbaropacity);
			}
		}
		else {
			if (this._selectbaropacity) {
				this._selectbaropacity = null;
				this.on_apply_selectbaropacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_selectbaropacity = function (selectbaropacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "selectbaropacity", selectbaropacity, "select");
	};


	_pChartFloatSeriesControl.set_barradius = function (val) {
		val = parseInt(val);
		this.barradius = val;
		if (val > 0) {
			if (this._barradius == null || this._barradius != val) {
				var oldValue;
				oldValue = this._barradius;
				this._changeContentsProperty("barradius", val, oldValue);
				this._barradius = val;
				this.on_apply_barradius(val);
			}
		}
		else {
			this._barradius = null;
			this.on_apply_barradius(0);
		}

		this._chart._draw();
	};

	_pChartFloatSeriesControl.on_apply_barradius = function (barradius) {
		this._redrawSeries = false;
		this._applyPropertySeries("Bar", "barradius", barradius);

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartFloatSeriesControl.set_itemtextposition = function (val) {
		var itemtextposition_enum = ["start", "middle", "end", "outside"];
		if (itemtextposition_enum.indexOf(val) == -1) {
			return;
		}

		if (this.itemtextposition != val) {
			this._changeContentsProperty("itemtextposition", val, this.itemtextposition);
			this.itemtextposition = val;
			this.on_apply_itemtextposition();
		}

		this._chart._draw();
	};
	_pChartFloatSeriesControl.on_apply_itemtextposition = function () {
		this._chart._recreate = true;
		this._chart._rearrange = true;
	};

	_pChartFloatSeriesControl.set_itemtextgap = function (val) {
		if (val !== undefined && val !== null && val !== "") {
			if (isNaN(val)) {
				return;
			}

			val = parseInt(val);
		}
		if (this.itemtextgap != val) {
			this._changeContentsProperty("itemtextgap", val, this.itemtextgap);
			this.itemtextgap = val;
			this.on_apply_itemtextgap();
		}
	};

	_pChartFloatSeriesControl._setData = function () {
		var chart = this._chart;
		if (chart) {
			var obj;
			var data = [];
			var pThis = this;
			var selectedindex = 0;
			var invaliddata = false;
			var charttype = chart._type_name;
			var selecttype = this.selecttype;
			var categorycolumn = chart._getBindableValue("categorycolumn");
			var valuecolumn = this._getBindableValue("valuecolumn");
			var value2column = this._getBindableValue("value2column");
			var value3column = this._getBindableValue("value3column");
			var selectcolumn = this._getBindableValue("selectcolumn");
			var rotateaxis = chart.rotateaxis;
			var binddataset = chart._binddataset;
			var coltype;
			var invalidcategorycolumn = chart._invalidcategorycolumn;
			var invalidvaluecolumn = this._invalidvaluecolumn;
			var invalidselectcolumn = this._invalidselectcolumn;
			var invalidvalue2column = this._invalidvalue2column;
			var invalidvalue3column = this._invalidvalue3column;

			if (binddataset) {
				if (!categorycolumn) {
					invaliddata = true;
				}
				else {
					coltype = binddataset._getColumnType(categorycolumn);
					if (!coltype || invalidcategorycolumn) {
						invaliddata = true;
					}
				}

				if (valuecolumn) {
					coltype = binddataset._getColumnType(valuecolumn);
					if (!coltype || invalidvaluecolumn) {
						invaliddata = true;
					}
				}
				if (value2column) {
					coltype = binddataset._getColumnType(value2column);
					if (!coltype || invalidvalue2column) {
						invaliddata = true;
					}
				}

				if (value3column) {
					coltype = binddataset._getColumnType(value3column);
					if (!coltype || invalidvalue3column) {
						invaliddata = true;
					}
				}

				if (selectcolumn) {
					coltype = binddataset._getColumnType(selectcolumn);
					if (!coltype || invalidselectcolumn) {
						selectcolumn = null;
					}
				}

				if (invaliddata) {
					this._data = [];
					this._chart._changedData = true;
					return false;
				}
			}
			var dataMap = chart._dataMap;
			if (dataMap) {
				if (valuecolumn) {
					var waterfallSum = 0;
					var waterfallIndex;
					var waterfallPreData;

					dataMap.forEach(function (key) {
						if (nexacro._isString(key)) {
							obj = dataMap.getByKey(key);
							if (obj) {
								var xdata = obj[valuecolumn];
								var ydata = obj[value2column];
								var valuedata = null;
								var categorydata = obj[categorycolumn];
								if (value3column) {
									valuedata = obj[value3column];
								}

								if (chart.isdatetimevalue) {
									data.push([xdata, categorydata, ydata, valuedata]);
								}
								else {
									if (rotateaxis) {
										if (chart.waterfall) {
											waterfallSum += xdata;
											if (waterfallPreData) {
												data.push([xdata + waterfallPreData[0], categorydata, waterfallPreData[0], 0]);
											}
											else {
												data.push([xdata, categorydata, 0, 0]);
											}
										}
										else {
											data.push([xdata, categorydata, ydata, 0]);
										}
									}
									else {
										if (chart.waterfall) {
											waterfallSum += xdata;
											if (waterfallPreData) {
												data.push([categorydata, xdata + waterfallPreData[1], waterfallPreData[1], 0]);
											}
											else {
												data.push([categorydata, xdata, 0, 0]);
											}
										}
										else {
											data.push([categorydata, xdata, ydata, 0]);
										}
									}
									waterfallPreData = data[data.length - 1];
								}
							}
						}
					}, this);
				}
			}
			if (chart.waterfall && data.length > 0) {
				if (rotateaxis) {
					data.push([waterfallSum, chart.waterfallsumtext, 0, 0]);
				}
				else {
					data.push([chart.waterfallsumtext, waterfallSum, 0, 0]);
				}
			}
			this._data = data;
			this._chart._dataMap = dataMap;
		}
	};

	_pChartFloatSeriesControl.on_apply_itemtextgap = function () {
		this._chart._rearrange = true;
		this._chart._recreate = true;
	};

	_pChartFloatSeriesControl.destroy = function () {
		if (!this._chart) {
			return;
		}

		var seriesGroup = this._chart._graphicsControl.getObjectByID("ChartSeriesGroup");
		var itemLength = this._itemCnt;
		var i;
		var re;
		for (i = 0; i < itemLength; i++) {
			if (seriesGroup) {
				var visible = this.visible, itemID, item;

				if (visible) {
					itemID = this._configIndex + " SeriesBarItem_" + i;
					item = seriesGroup.getObjectByID(itemID);
					if (item) {
						re = seriesGroup.removeChild(item);
						if (item._series) {
							if (re._series) {
								if (re._series._seriesitems.length > 0) {
									for (i = 0; i < re._series._seriesitems.length; i++) {
										if (re._series._seriesitems[i]) {
											if (re._series._seriesitems[i]) {
												delete re._series._seriesitems[i];
												re._series._seriesitems[i] = null;
											}

											delete re._series._seriesitems[i];
											re._series._seriesitems[i] = null;
										}
									}
								}
								delete re._series;
								re._series = null;
							}

							delete item._series;
							item._series = null;
						}

						item.destroy();
						re.destroy();
					}
				}

				if (this.itemtextvisible) {
					itemID = this._configIndex + " SeriesItemText_" + i;
					item = seriesGroup.getObjectByID(itemID);
					if (item) {
						re = seriesGroup.removeChild(item);
						item.destroy();
						re.destroy();
					}
				}
			}
		}

		if (this._seriesitems.length > 0) {
			for (i = 0; i < this._seriesitems.length; i++) {
				if (this._seriesitems[i]) {
					if (this._seriesitems[i]._series) {
						delete this._seriesitems[i]._series;
						this._seriesitems[i]._series = null;
					}

					this._seriesitems[i].destroy();
					delete this._seriesitems[i];
					this._seriesitems[i] = null;
				}
			}
		}

		delete this.valueaxis;
		delete this._xaxis;
		delete this._yaxis;
		delete this._pointshape;

		this.valueaxis = null;
		this.visible = null;
		this.barsize = null;
		this.positivebarlinestyle = null;
		this.positivebarfillstyle = null;
		this.negativebarlinestyle = null;
		this.negativebarfillstyle = null;
		this._positivebarlinestyle = null;
		this._positivebarfillstyle = null;
		this._negativebarlinestyle = null;
		this._negativebarfillstyle = null;
		this.waterfalllinestyle = null;
		this._waterfalllinestyle = null;
		this._baropacity = null;

		this.highlightbarvisible = null;
		this.highlightpositivebarlinestyle = null;
		this.highlightpositivebarfillstyle = null;
		this.highlightnegativebarlinestyle = null;
		this.highlightnegativebarfillstyle = null;
		this._highlightpositivebarlinestyle = null;
		this._highlightpositivebarfillstyle = null;
		this._highlightnegativebarlinestyle = null;
		this._highlightnegativebarfillstyle = null;
		this.highlightbaropacity = null;
		this._highlightbaropacity = null;
		this.selectpositivebarlinestyle = null;
		this.selectpositivebarfillstyle = null;
		this._selectnegativebarlinestyle = null;
		this._selectnegativebarfillstyle = null;
		this.selectbaropacity = null;
		this._selectbaropacity = null;

		this.pointshape = null;
		this.itemtextposition = null;

		this.itemtextgap = null;
		this._pointshape = null;
		this._borderwidth = null;
		this._color = null;
		this._xaxis = null;
		this._yaxis = null;
		this._changedSeriesColor = null;
		this._barsize = null;
		this._groupbarwidth = null;
		this._baralign = null;
		this._barwidth = null;

		this._seriesitems = null;
		this._pointshapeObj = null;
		this._stacktype = null;
		nexacro._SeriesBase.prototype.destroy.call(this);
		return true;
	};

	_pChartFloatSeriesControl._applyPropertySeries = function (type, style, value, select) {
		var item = null, seriesGroup = this._chart._graphicsControl.getObjectByID("ChartSeriesGroup");

		if (seriesGroup) {
			for (var i = 1; i <= this._itemCnt; i++) {
				var itemID = this._configIndex + " Series" + type + "Item_" + (i - 1);

				item = seriesGroup.getObjectByID(itemID);
				if (!nexacro._isNull(item)) {
					if (style == "fillstyle" || style == "pointfillstyle" || style == "lineareafillstyle") {
						item.set_fillstyle(value);
					}
					else if (style == "positivebarlinestyle" || style == "pointlinestyle" || style == "linestyle") {
						item.set_strokepen(value);
					}
					else if (style == "opacity" || style == "pointopacity" || style == "lineopacity" || style == "lineareaopacity") {
						item.set_opacity(value);
					}
					else if (style == "visible" || style == "pointvisible" || style == "linevisible" || style == "lineareavisible") {
						item.set_visible(value);
					}
				}
			}
		}
	};


	_pChartFloatSeriesControl._draw2 = function (redraw) {
		if (!redraw) {
			return;
		}

		this._itemCnt = 0;
		this._itemtextlist = [];
		if (this.visible) {
		}
	};
	_pChartFloatSeriesControl._draw = function (redraw) {
		nexacro._SeriesBase.prototype._draw.call(this);
		var effect = this._chart_aniframe_obj;
		if (!redraw) {
			if (this._chart._isanimationloading) {
				this._end_animation_series_callback();
			}
			return;
		}
		this._itemCnt = 0;
		this._itemtextlist = [];

		if (effect.enableanimation) {
			if (this._chart._isanimationloading) {
				this._end_animation_series_callback();
			}
			else {
				this._start_animate();
			}
		}
		else {
			this._drawnow();
		}
	};
	_pChartFloatSeriesControl._drawnow = function () {
		if (this.visible) {
			this._drawSeriesBars();
		}
	};

	_pChartFloatSeriesControl._drawSeriesBars = function () {
		var positivebarlinestyle = this.positivebarlinestyle || "1px solid red", negativebarlinestyle = this.negativebarlinestyle || "1px solid blue", positivefillstyle = this._positivebarfillstyle || "#eb495c", negativefillstyle = this._negativebarfillstyle || "#5058eb", opacity = this.baropacity, barLeft, barRight, barwidth, datapoints = this._datapoints, points = datapoints.points, ps = datapoints.pointsize, selectedItem = this._selectedItem, selectpositivebarlinestyle = this.selectpositivebarlinestyle || "1px solid " + this._selectcolor, selectpositivebarfillstyle = this.selectpositivebarfillstyle || this._selectcolor, selectnegativebarlinestyle = this.selectnegativebarlinestyle || "1px solid " + this._selectcolor, selectnegativebarfillstyle = this.selectnegativebarfillstyle || this._selectcolor, selectbaropacity = this.selectbaropacity || this.opacity, isselectitem = false, index = 0, x, y, b, effect = this._chart_aniframe_obj, rotateaxis = this._chart.rotateaxis;

		this.on_apply_barsize(this.barsize);
		barwidth = this._barsize || this._chart._barsize;

		barwidth = this._chart._getcheckTimeAxisBarWidth(barwidth);

		switch (this._baralign) {
			case "left":
				barLeft = 0;
				break;
			case "right":
				barLeft = -barwidth;
				break;
			default:
				barLeft = -barwidth / 2;
		}

		barRight = barLeft + barwidth;

		var paintlinecolor, paintfillcolor, isPositive;
		var pLeng = points.length;
		var nullitem = null;
		var p, copyb;
		var interval = this._xaxis.tickinterval ? this._xaxis.tickinterval : 1;

		var lastIndex = 0;
		if (this._chart.waterfall) {
			for (var i = 0; i < pLeng; i += ps) {
				lastIndex++;
			}
			lastIndex = lastIndex - 1;
		}
		var orgb;
		for (var i = 0; i < pLeng; i += ps) {
			var length = selectedItem.length;
			if (length > 0) {
				isselectitem = selectedItem[index];
			}
			x = points[i];
			y = points[i + 1];
			orgb = b = points[i + 2];

			isPositive = true;
			if (this._chart.isdatetimevalue) {
				if (x == null || y == null) {
					continue;
				}
				p = points[i + 3];
				copyb = new Date();
				if (!orgb || orgb == 0) {
					b = new Date();
					b.setTime(this._xaxis._min);
				}
				copyb.setTime(b.getTime());
				if (interval == 1) {
					if (this._xaxis._timesubtickformat == "HOUR") {
						if (orgb || orgb !== 0) {
							copyb.setHours(b.getHours() + 1);
						}
					}
					else {
						copyb.setDate(b.getDate() + 1);
					}
				}
				x = this._chart._checkDateValue(x);
				copyb = this._chart._checkDateValue(copyb);
			}
			else {
				copyb = b;
				if (rotateaxis) {
					if (x < b) {
						isPositive = false;
					}
				}
				else {
					if (y < b) {
						isPositive = false;
					}
				}
			}

			if (effect && effect.isloadanimation) {
				isselectitem = false;
				if (!rotateaxis) {
					y = this._getanimationdrawvalue(y);
				}
				else {
					x = this._getanimationdrawvalue(x);
				}
				b = this._getanimationdrawvalue(b);
			}
			if (isselectitem) {
				if (isPositive) {
					paintlinecolor = selectpositivebarlinestyle;
					paintfillcolor = selectpositivebarfillstyle;
				}
				else {
					paintlinecolor = selectnegativebarlinestyle;
					paintfillcolor = selectnegativebarfillstyle;
				}
				this._drawBar(x, y, copyb, p, barLeft, barRight, this._xaxis, this._yaxis, paintlinecolor, paintfillcolor, selectbaropacity, index, nullitem, isPositive, lastIndex);
			}
			else {
				if (this._chart.waterfall && (lastIndex == index)) {
					paintfillcolor = this._waterfallsumbarfillstyle || "green";
					paintlinecolor = this._waterfallsumbarlinestyle || "1px solid #000000";
				}
				else {
					if (isPositive) {
						if (positivefillstyle instanceof Array) {
							paintfillcolor = positivefillstyle[index % positivefillstyle.length];
						}
						else {
							paintfillcolor = positivefillstyle;
						}
						paintlinecolor = positivebarlinestyle;
					}
					else {
						if (negativefillstyle instanceof Array) {
							paintfillcolor = negativefillstyle[index % negativefillstyle.length];
						}
						else {
							paintfillcolor = negativefillstyle;
						}
						paintlinecolor = negativebarlinestyle;
					}
				}

				this._drawBar(x, y, copyb, p, barLeft, barRight, this._xaxis, this._yaxis, paintlinecolor, paintfillcolor, opacity, index, nullitem, isPositive, lastIndex);
			}
			index++;
		}
		this._itemCnt = index;
	};


	_pChartFloatSeriesControl._drawBar = function (x, y, b, p, barLeft, barRight, axisx, axisy, positivebarlinestyle, fillstyle, opacity, index, item, isPositive, lastIndex) {
		var left, right, bottom, top, tmp, rotateaxis = this._chart.rotateaxis, effect = this._chart_aniframe_obj, tickstartgap;
		var waterfall = this._chart.waterfall;

		this.percentbarheightratio = 80;
		var heightpercent = 1 - (this.percentbarheightratio * 0.01);
		var pctbar_top, pctbar_bottom, pctbar_right, pctbar_width, pctbar_height;

		if (rotateaxis) {
			left = b;
			right = x;
			top = y + barLeft;
			bottom = y + barRight;

			if (right < left) {
				tmp = right;
				right = left;
				left = tmp;
			}
		}
		else {
			left = x + barLeft;
			right = x + barRight;
			bottom = b;
			top = y;

			if (top < bottom) {
				tmp = top;
				top = bottom;
				bottom = tmp;
			}
		}

		if (left < axisx._min) {
			left = axisx._min;
		}

		if (right > axisx._max) {
			right = axisx._max;
		}

		if (bottom < axisy._min) {
			bottom = axisy._min;
		}

		if (top > axisy._max) {
			top = axisy._max;
		}

		if (p && !isNaN(p) && p > 0 && p <= 100) {
			var gap = right - left;
			pctbar_right = (left + (gap * (p * 0.01)));
		}

		if (axisx.p2c) {
			left = axisx.p2c(left);
			right = axisx.p2c(right);
			pctbar_right = axisx.p2c(pctbar_right);
		}
		if (axisy.p2c) {
			bottom = axisy.p2c(bottom);
			top = axisy.p2c(top);
			var heightgap = Math.abs(((bottom - top) * heightpercent / 2));
			pctbar_top = top - heightgap;
			pctbar_bottom = bottom + heightgap;
		}
		if (!rotateaxis) {
			tickstartgap = axisx._tickstartgap;
			if (tickstartgap) {
				left += tickstartgap;
				right += tickstartgap;
			}
		}
		else {
			tickstartgap = axisy._tickstartgap;
			if (tickstartgap) {
				bottom += tickstartgap;
				top += tickstartgap;
				pctbar_top += tickstartgap;
				pctbar_bottom += tickstartgap;
			}
		}
		bottom += axisy._tickendspace;
		top += axisy._tickendspace;
		pctbar_bottom += axisy._tickendspace;
		pctbar_top += axisy._tickendspace;

		var rect, chart = this._chart, width = 0, height = 0, seriesId, points = [], seriesGroup = chart._seriesGroup, highlightGroup = chart._highlightGroup;
		var waterfalleline;

		width = right - left;
		height = bottom - top;

		pctbar_width = pctbar_right - left;
		pctbar_height = pctbar_bottom - pctbar_top;

		if (width < 0) {
			left += width;
			width = Math.abs(width);
			pctbar_width = Math.abs(pctbar_width);
		}
		if (height < 0) {
			top += height;
			height = Math.abs(height);
			pctbar_top += pctbar_height;
			pctbar_height = Math.abs(pctbar_height);
		}

		if (rotateaxis) {
			this._barwidth = height;
		}
		else {
			this._barwidth = width;
		}

		var sv_fillstyle;
		var prevRectId, prevRect;
		var rectpct, pointspct = [];
		if (fillstyle instanceof Array) {
		}
		else {
			if (fillstyle && this.autogradation != "none") {
				var bTarget = false;
				if (fillstyle instanceof nexacro._BackgroundObject) {
					if (!fillstyle.gradient) {
						bTarget = true;
						fillstyle = fillstyle.value;
					}
				}
				else {
					bTarget = (fillstyle.indexOf("gradient") < 0) ? true : false;
				}
				if (bTarget) {
					var anglePos = (this.parent.rotateaxis == true) ? "bottom" : "right";
					var darkcolor1;
					if (this.autogradation == "center") {
						var lightcolor1 = this._shadeColor(fillstyle, -30);
						var lightcolor2 = this._shadeColor(fillstyle, -50);
						darkcolor1 = this._shadeColor(fillstyle, 20);
						sv_fillstyle = "linear-gradient(to " + anglePos + ","
							 + darkcolor1 + " 0%,"
							 + fillstyle + " 25%,"
							 + lightcolor1 + " 40%,"
							 + lightcolor2 + " 50%,"
							 + lightcolor1 + " 60%,"
							 + fillstyle + " 70%,"
							 + darkcolor1 + " 100%)";
					}
					else {
						var darkcolor0 = this._shadeColor(fillstyle, 5);
						darkcolor1 = this._shadeColor(fillstyle, 10);
						var darkcolor2 = this._shadeColor(fillstyle, 25);
						var darkcolor3 = this._shadeColor(fillstyle, 40);
						sv_fillstyle = "linear-gradient(to " + anglePos + ","
							 + darkcolor3 + " 0%,"
							 + darkcolor1 + " 10%,"
							 + darkcolor0 + " 25%,"
							 + fillstyle + " 50%,"
							 + darkcolor0 + " 60%,"
							 + darkcolor1 + " 80%,"
							 + darkcolor2 + " 90%,"
							 + darkcolor3 + " 100%)";
					}
					fillstyle = sv_fillstyle;
				}
			}
		}
		var radius = {
			tl : 0, 
			tr : 0, 
			br : 0, 
			bl : 0
		};
		if (item) {
			var highlightitem = item._barHighlight;
			if (!highlightitem) {
				rect = new nexacro.ChartGraphicsRect(left, top, width, height);
				if (this.shadowstyle) {
					rect.set_shadow(this.shadowstyle);
				}

				if (this.barradius > 0 && this.parent.rotateaxis == true) {
					radius.tl = radius.bl = this.barradius;
					radius.tr = radius.br = this.barradius;
				}
				else {
					radius.bl = radius.br = this.barradius;
					radius.tl = radius.tr = this.barradius;
				}
				if (this.barradius > 0) {
					rect.set_radiusround(radius);
				}

				rect.set_strokepen(positivebarlinestyle);
				if (fillstyle instanceof Array) {
				}
				else {
					rect.set_fillstyle(fillstyle);
				}
				rect.set_opacity(opacity);

				seriesId = this._configIndex + " SeriesHighlightBarItem";
				rect.set_id(seriesId);
				highlightGroup.addChild(rect);

				item._barHighlight = rect;
				rect._item = item;
				rect.index = item.index;
				rect.value = item.value;
			}
			else {
				rect = highlightitem;
			}
		}
		else {
			if (seriesGroup) {
				seriesId = this._configIndex + " SeriesBarItem_" + index;
				rect = seriesGroup.getObjectByID(seriesId);
				if (!rect) {
					rect = new nexacro.ChartGraphicsRect(left, top, width, height);
					rect.set_id(seriesId);
					seriesGroup.addChild(rect);
				}
				else {
					rect.set_x(left);
					rect.set_width(width);
					rect.set_y(top);
					rect.set_height(height);
				}
				rect._ispositive = isPositive;
				if (this.shadowstyle) {
					rect.set_shadow(this.shadowstyle);
				}

				if (this.barradius > 0 && this.parent.rotateaxis == true) {
					radius.tl = radius.bl = this.barradius;
					radius.tr = radius.br = this.barradius;
				}
				else {
					radius.bl = radius.br = this.barradius;
					radius.tl = radius.tr = this.barradius;
				}
				if (this.barradius > 0) {
					rect.set_radiusround(radius);
				}
				rect.set_strokepen(positivebarlinestyle);
				if (fillstyle instanceof Array) {
				}
				else {
					rect.set_fillstyle(fillstyle);
				}
				rect.set_opacity(opacity);

				points[0] = x;
				points[1] = y;
				points[2] = b;

				rect.index = index;
				if (rotateaxis) {
					points[3] = x - b;
					rect.value = x - b;
				}
				else {
					points[3] = y - b;
					rect.value = y - b;
				}

				rect._points = points;
				if (waterfall && index > 0 && (index != lastIndex)) {
					seriesId = this._configIndex + " SerieswaterfallItem_" + index;
					waterfalleline = seriesGroup.getObjectByID(seriesId);
					if (!waterfalleline) {
						waterfalleline = new nexacro.ChartGraphicsLine();
						waterfalleline.set_id(seriesId);
						seriesGroup.addChild(waterfalleline);
					}

					prevRectId = this._configIndex + " SeriesBarItem_" + (index - 1);
					prevRect = seriesGroup.getObjectByID(prevRectId);
					if (prevRect) {
						var px, py, pw, ph, sx1, sx2, sy1, sy2;
						px = prevRect.x;
						py = prevRect.y;
						pw = prevRect._size.width;
						ph = prevRect._size.height;

						if (!rotateaxis) {
							sx1 = px + pw;
							sx2 = left;
							if (prevRect._ispositive) {
								sy1 = py;
							}
							else {
								sy1 = py + ph;
							}
							if (isPositive) {
								sy2 = top + height;
							}
							else {
								sy2 = top;
							}
						}
						else {
							sy1 = py;
							sy2 = top + height;
							if (prevRect._ispositive) {
								sx1 = px + pw;
							}
							else {
								sx1 = px;
							}
							if (isPositive) {
								sx2 = left;
							}
							else {
								sx2 = left + width;
							}
						}
						waterfalleline.set_x1(sx1);
						waterfalleline.set_y1(sy1);
						waterfalleline.set_x2(sx2);
						waterfalleline.set_y2(sy2);

						waterfalleline.set_strokepen(this._waterfalllinestyle || "1px solid #000000");
					}
				}
				if (waterfall && (index == lastIndex)) {
					rect._issum = true;
				}

				if (this._chart.isdatetimevalue) {
					var progressbarlinestyle = this.negativebarlinestyle || "1px solid blue";
					var progressfillstyle = this._negativebarfillstyle || "green";
					if (progressfillstyle instanceof Array) {
						progressfillstyle = progressfillstyle[index % progressfillstyle.length];
					}

					seriesId = this._configIndex + " SeriesPercentBarItem_" + index;
					rectpct = seriesGroup.getObjectByID(seriesId);
					if (!rectpct) {
						rectpct = new nexacro.ChartGraphicsRect(left, pctbar_top, pctbar_width, pctbar_height);
						rectpct.set_id(seriesId);
						seriesGroup.addChild(rectpct);
					}
					else {
						rectpct.set_x(left);
						rectpct.set_width(pctbar_width);
						rectpct.set_y(pctbar_top);
						rectpct.set_height(pctbar_height);
					}
					if (this.shadowstyle) {
						rectpct.set_shadow(this.shadowstyle);
					}

					if (this.barradius > 0) {
						rectpct.set_radiusround(radius);
					}
					rectpct.set_strokepen(progressbarlinestyle);
					if (fillstyle instanceof Array) {
					}
					else {
						rectpct.set_fillstyle(progressfillstyle);
					}
					rectpct.set_opacity(opacity);

					pointspct[0] = x;
					pointspct[1] = y;
					pointspct[2] = b;

					rectpct.index = index;
					points[3] = x - b;
					rectpct.value = x - b;
					rectpct._points = pointspct;
				}
			}
		}

		var board = this._chart._boardRect, boardWidth = 0, boardHeight = 0, borderWidth = this._chart._boardBorderWidth, borderHeight = this._chart._boardBorderHeight;

		if (board) {
			boardWidth = board.width - borderWidth;
			boardHeight = board.height - borderHeight;
			if (rect) {
				rect._clipitems = [];
				rect.setClipPath(new nexacro.Rect(-left, -top, boardWidth, boardHeight));
			}
		}

		if (rect) {
			rect._series = this;
			this._seriesitems[index] = rect;
		}

		if (rect && !item) {
			var itemtextvisible = this.itemtextvisible;
			if (itemtextvisible) {
				var isEffect = (effect && effect.isloadanimation);
				if (!isEffect) {
					this._drawBarItemText(left, right, bottom, top, width, height, rect);
				}
			}
		}
		return {
			"l" : left, 
			"t" : top, 
			"w" : width, 
			"h" : height, 
			"r" : right, 
			"b" : bottom
		};
	};

	_pChartFloatSeriesControl._drawBarItemText = function (left, right, bottom, top, width, height, item, stackgroupname, index, uservalue) {
		var seriesGroup = this._chart._seriesGroup;
		var itemText, itemtextPosition, itemtextGap;
		itemText = this._createSeriesItemText(item);
		itemtextPosition = this.itemtextposition;
		itemtextGap = this.itemtextgap;

		var rotateaxis = this._chart.rotateaxis;
		function positionstart (itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis) {
			var textTop = 0;
			var textLeft = 0;
			if (!itemtextGap) {
				itemtextGap = 0;
			}

			if (rotateaxis) {
				itemText.set_verticalAlign("middle");
				itemText.set_textAlign("left");
				textTop = top + (height / 2);
				textLeft = left + itemtextGap;
			}
			else {
				itemText.set_verticalAlign("bottom");
				itemText.set_textAlign("center");
				textLeft = left + (width / 2);
				textTop = bottom - itemtextGap;
			}

			itemText.set_x(textLeft);
			itemText.set_y(textTop);
		}
		function positionmiddle (itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis) {
			itemText.set_verticalAlign("middle");
			itemText.set_textAlign("center");
			var textTop = 0;
			var textLeft = 0;
			if (!itemtextGap) {
				itemtextGap = 0;
			}

			if (rotateaxis) {
				textTop = top + (height / 2);
				textLeft = left + (width / 2) + itemtextGap;
			}
			else {
				textLeft = left + (width / 2);
				textTop = top + (height / 2) - itemtextGap;
			}

			itemText.set_x(textLeft);
			itemText.set_y(textTop);
		}
		function positionend (itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis) {
			var textTop = 0;
			var textLeft = 0;
			if (!itemtextGap) {
				itemtextGap = 0;
			}

			if (rotateaxis) {
				itemText.set_verticalAlign("middle");
				itemText.set_textAlign("right");
				textTop = top + (height / 2);
				textLeft = right - itemtextGap;
			}
			else {
				itemText.set_verticalAlign("top");
				itemText.set_textAlign("center");
				textLeft = left + (width / 2);
				textTop = top + itemtextGap;
			}

			itemText.set_x(textLeft);
			itemText.set_y(textTop);
		}
		function positionoutside (itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis) {
			var textTop = 0;
			var textLeft = 0;
			if (!itemtextGap) {
				itemtextGap = 0;
			}

			if (rotateaxis) {
				itemText.set_verticalAlign("middle");
				itemText.set_textAlign("left");
				textTop = top + (height / 2);
				textLeft = right + itemtextGap;
			}
			else {
				itemText.set_verticalAlign("bottom");
				itemText.set_textAlign("center");
				textLeft = left + (width / 2);
				textTop = top - itemtextGap;
			}

			itemText.set_x(textLeft);
			itemText.set_y(textTop);
		}
		if (!nexacro._isNull(itemText)) {
			if (itemtextPosition) {
				switch (itemtextPosition) {
					case "start":
						{

							positionstart(itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis);
						}
						break;
					case "middle":
						{

							positionmiddle(itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis);
						}
						break;
					case "end":
						{

							positionend(itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis);
						}
						break;
					case "outside":
						{

							positionoutside(itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis);
						}
						break;
					default:
						positionmiddle(itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis);
						break;
				}
			}
			else {
				positionmiddle(itemText, left, right, bottom, top, width, height, itemtextGap, rotateaxis);
			}

			this._chart._setChangeInBoardAreaPos(itemText);
			if (stackgroupname !== undefined && stackgroupname !== null) {
			}
			else {
				seriesGroup.addChild(itemText);
				itemText._series = this;
			}
		}
	};

	_pChartFloatSeriesControl._showHighlight = function () {
	};

	_pChartFloatSeriesControl._showBarHighlight = function (item) {
		if (!this.highlightbarvisible) {
			return;
		}

		var barHighlight = item._barHighlight;
		if (!barHighlight) {
			var points = item._points, index = item.index, positivebarlinestyle = this.highlightpositivebarlinestyle || "1px solid #eb495c", positivebarfillstyle = this.highlightpositivebarfillstyle || "#ff0000", negativebarlinestyle = this.highlightnegativebarlinestyle || "1px solid #5058eb", negativebarfillstyle = this.highlightnegativebarfillstyle || "#0000ff", baropacity = this.highlightbaropacity, barLeft, barRight;
			var barwidth;

			var x, y, b, isPositive;
			var rotateaxis = this._chart.rotateaxis;
			var paintfillcolor, paintlinecolor;
			x = points[0];
			y = points[1];
			b = points[2];

			isPositive = true;
			if (rotateaxis) {
				if (x < b) {
					isPositive = false;
				}
			}
			else {
				if (y < b) {
					isPositive = false;
				}
			}
			if (isPositive) {
				if (positivebarfillstyle instanceof Array) {
					paintfillcolor = positivebarfillstyle[index % positivebarfillstyle.length];
				}
				else {
					paintfillcolor = positivebarfillstyle;
				}
				paintlinecolor = positivebarlinestyle;
			}
			else {
				if (negativebarfillstyle instanceof Array) {
					paintfillcolor = negativebarfillstyle[index % negativebarfillstyle.length];
				}
				else {
					paintfillcolor = negativebarfillstyle;
				}
				paintlinecolor = negativebarlinestyle;
			}
			this.on_apply_barsize(this.barsize);
			barwidth = this._barsize || this._chart._barsize;

			barwidth = this._chart._getcheckTimeAxisBarWidth(barwidth);
			switch (this._baralign) {
				case "left":
					barLeft = 0;
					break;
				case "right":
					barLeft = -barwidth;
					break;
				default:
					barLeft = -barwidth / 2;
			}

			barRight = barLeft + barwidth;
			this._drawBar(points[0], points[1], points[2], points[3], barLeft, barRight, this._xaxis, this._yaxis, paintlinecolor, paintfillcolor, baropacity, index, item);
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, false);
			this._chart._graphicsControl.draw();
		}
	};

	_pChartFloatSeriesControl._hideBarHighlight = function (item) {
		if (!this.highlightbarvisible) {
			return;
		}

		var barHighlight = item._barHighlight;
		if (barHighlight && !nexacro._ChartGraphicsLib.isEmpty(barHighlight.parent)) {
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, true);
			this._chart._highlightGroup.removeChild(barHighlight);
			delete item._barHighlight;

			this._chart._graphicsControl.draw();
		}
	};



	_pChartFloatSeriesControl._findMatchingSeries = function (stacktype) {
		var res = null, allseries;
		var stackobject = this._chart._getVisibleStackGroupObject(this);
		allseries = stackobject._list;
		for (var i = 0; i < allseries.length; ++i) {
			if (this == allseries[i]) {
				break;
			}

			res = allseries[i];
		}
		return res;
	};


	_pChartFloatSeriesControl._setColor = function (colorset) {
		this._color = colorset;
		this._changedSeriesColor = true;

		var changedColorset = this._chart._changedColorset;
		if (changedColorset) {
			var visible = this.visible, pointvisible = this.pointvisible, linevisible = this.linevisible, positivebarlinestyle, fillstyle, linestyle, lineareafillstyle, pointlinestyle, pointfillstyle;
			var width, style, color;
			if (visible) {
				if (this._positivebarlinestyle) {
					width = this._positivebarlinestyle.width;
					style = this._positivebarlinestyle.style;
					color = this._positivebarlinestyle.color;

					positivebarlinestyle = width + " " + style + " " + color;
					this.set_positivebarlinestyle(positivebarlinestyle);
				}
				else {
					positivebarlinestyle = "1px solid " + colorset;
					this._applyPropertySeries("Bar", "positivebarlinestyle", positivebarlinestyle);
				}

				if (this._fillstyle) {
					fillstyle = this._fillstyle;
					this.set_fillstyle(fillstyle);
				}
				else {
					fillstyle = colorset;
					this._applyPropertySeries("Bar", "fillstyle", fillstyle);
				}
			}

			if (linevisible) {
				if (this._linestyle) {
					width = this._linestyle.width;
					style = this._linestyle.style;
					color = this._linestyle.color;

					linestyle = width + " " + style + " " + color;
					this.set_linestyle(linestyle);
				}
				else {
					linestyle = "1px solid " + colorset;
					this._applyPropertySeries("Line", "linestyle", linestyle);
					this.linestyle = linestyle;
				}

				if (this.lineareavisible) {
					if (this._lineareafillstyle) {
						lineareafillstyle = this._lineareafillstyle;
						this.set_lineareafillstyle(lineareafillstyle);
					}
					else {
						lineareafillstyle = colorset;
						this._applyPropertySeries("Area", "lineareafillstyle", lineareafillstyle);
						this.lineareafillstyle = lineareafillstyle;
					}
				}
			}

			if (pointvisible) {
				if (this._pointlinestyle) {
					width = this._pointlinestyle.width;
					style = this._pointlinestyle.style;
					color = this._pointlinestyle.color;

					pointlinestyle = width + " " + style + " " + color;
					this.set_pointlinestyle(pointlinestyle);
				}
				else {
					pointlinestyle = "1px solid " + colorset;
					this._applyPropertySeries("Point", "pointlinestyle", pointlinestyle);
					this.pointlinestyle = pointlinestyle;
				}

				if (this._pointfillstyle) {
					pointfillstyle = this._pointfillstyle;
					this.set_pointfillstyle(pointfillstyle);
				}
				else {
					pointfillstyle = colorset;
					this._applyPropertySeries("Point", "pointfillstyle", pointfillstyle);
					this.pointfillstyle = pointfillstyle;
				}
			}
		}
	};

	_pChartFloatSeriesControl._afterSetProperties = function () {
		var legend = this._chart.legend;
		if (legend) {
			this._chart._applyLegendItem();
		}
	};
}
