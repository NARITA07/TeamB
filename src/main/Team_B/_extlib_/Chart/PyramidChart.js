
if (!nexacro.PyramidChart) {
	nexacro.PyramidChart = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro._ChartBase.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

		this.categorycolumn = new nexacro.BindableValue("");
	};

	var _pPyramidChart = nexacro._createPrototype(nexacro._ChartBase, nexacro.PyramidChart);
	nexacro.PyramidChart.prototype = _pPyramidChart;
	_pPyramidChart._type_name = "PyramidChart";




	_pPyramidChart.categorycolumn = "";


	_pPyramidChart._boardWidth = 0;
	_pPyramidChart._boardHeight = 0;
	_pPyramidChart._centerLeft = 0;
	_pPyramidChart._centerTop = 0;
	_pPyramidChart.graphtype = "pyramid";
	_pPyramidChart.invertchart = false;

	_pPyramidChart._invalidcategorycolumn = false;





	_pPyramidChart.on_destroy_contents = function () {
		this.categorycolumn = null;
		this._boardWidth = null;
		this._boardHeight = null;
		this._centerLeft = null;
		this._centerTop = null;
		this.graphtype = null;
		this.invertchart = null;

		nexacro._ChartBase.prototype.on_destroy_contents.call(this);

		return true;
	};

	_pPyramidChart.set_graphtype = function (v) {
		if (v != "pyramid" && v != "funnel") {
			v = "pyramid";
		}
		if (this.graphtype != v) {
			this.graphtype = v;
			this.on_apply_graphtype(v);
		}

		this._draw();
	};

	_pPyramidChart.on_apply_graphtype = function (v) {
	};

	_pPyramidChart.set_invertchart = function (v) {
		if (v !== true) {
			v = false;
		}
		if (this.graphtype != v) {
			this.invertchart = v;
			this.on_apply_invertchart(v);
		}

		this._draw();
	};

	_pPyramidChart.on_apply_invertchart = function (v) {
	};

	_pPyramidChart.set_graphtype = function (v) {
		if (v != "pyramid" && v != "funnel") {
			v = "pyramid";
		}
		if (this.graphtype != v) {
			this.graphtype = v;
			this.on_apply_graphtype(v);
		}

		this._draw();
	};

	_pPyramidChart.on_apply_graphtype = function (v) {
	};

	_pPyramidChart.set_categorycolumn = function (v) {
		if (this.categorycolumn._value != v) {
			this.categorycolumn._set(v);
			this.on_apply_categorycolumn();
		}

		this._draw();
	};

	_pPyramidChart._checkcategorycolumn = function () {
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

	_pPyramidChart.on_apply_categorycolumn = function () {
		this.on_apply_binddataset();
	};

	_pPyramidChart.setSeries = function (id, contents) {
		var series, seriesId, seriesIndex = -1;

		if (id && typeof (id) == "string") {
			seriesId = id;
		}
		else {
			if (!nexacro._ChartGraphicsLib.isEmpty(contents)) {
				nexacro._ChartGraphicsLibObject.Each(contents, function (name, val, object) {
					if (name == "id") {
						seriesId = contents.id;
					}
				});
			}
		}

		if (seriesId) {
			series = this.getSeriesByID(seriesId);
			seriesIndex = nexacro._ChartGraphicsLibArray.indexOf(this.seriesset, series);
		}

		if (series) {
			var seriesContents = {
			};
			if (typeof (contents) == "object") {
				if (!nexacro._ChartGraphicsLib.isEmpty(contents)) {
					nexacro._ChartGraphicsLibObject.Each(contents, function (name, val, object) {
						if (name == "id") {
							seriesId = contents.id;
						}
					});
				}
				seriesContents = contents;
			}
			else {
				seriesIndex = -1;
			}

			if (seriesIndex != -1) {
				this.contents.seriesset[seriesIndex] = this._mergeContents(true, this.contents.seriesset[seriesIndex], seriesContents);

				this._drawing = true;
				this._setProperties(seriesContents, series);
				this._drawing = false;
			}

			if (seriesIndex != -1 && this.contents.seriesset[seriesIndex]) {
				seriesIndex = series._configIndex;
			}
		}
		else {
			if (this.seriesset.length > 0) {
				seriesIndex = -1;
			}
			else {
				series = this._appendSeries(contents);
				if (series && series != -1) {
					seriesIndex = series._configIndex;
				}
			}
		}

		this._draw();

		return seriesIndex;
	};

	_pPyramidChart.showSeries = function (id) {
		var s = this.getSeriesByID(id);
		if (s) {
			var visible = s._orgVisible;
			s._orgVisible = undefined;
			if (visible) {
				s.set_visible(true);
			}
		}
	};

	_pPyramidChart.hideSeries = function (id) {
		var s = this.getSeriesByID(id);
		if (s) {
			if (s._orgVisible === undefined || s._orgVisible === null) {
				s._orgVisible = s.visible;
			}
			s.set_visible(false);
		}
	};



	_pPyramidChart._arrange = function () {
		nexacro._ChartBase.prototype._arrange.call(this);

		if (this._rearrange) {
			this._arrangeBoard();
		}
		var s = this.seriesset[0];
		if (s) {
			s._rearrangeProcessItemData();
		}
		this._arrangeSeries();
	};

	_pPyramidChart._createSeriesset = function (o, id) {
		if (!this._seriesGroup) {
			return false;
		}

		var seriesset = this.seriesset, series, seriesLength = -1;

		if (seriesset) {
			seriesLength = seriesset.length;
			if (seriesLength > 0) {
				return;
			}
		}

		var s = seriesset[0], seriesId;
		if (s) {
			seriesId = s.id;
			if (seriesId == id) {
				throw nexacro.MakeNativeError(this, "native_exist_id", seriesId);
				return;
			}
		}

		series = this._appendSeries(o);
		return series;
	};

	_pPyramidChart._createSeries = function (contents, id) {
		var series = new nexacro.ChartPyramidSeriesControl(id, this, this._graphicsControl);
		if (series) {
			return series;
		}
	};

	_pPyramidChart._setSeries = function () {
		var series = this.seriesset, length = series.length, items;

		for (var i = 0; i < length; i++) {
			var s = series[i];
			if (s) {
				if (this._changedData) {
					s._setData();

					if (nexacro._isNull(s._data)) {
						return false;
					}

					items = s._setItemData();
					this._seriesitems = items;
					this._changedColorset = true;
				}

				if (this._changedColorset && !s._changedFillStyle) {
					items = this._seriesitems;
					if (items) {
						s._setItemColor(items);
					}
					this._changedColorset = false;
				}
				else {
					items = this._seriesitems;
					if (items) {
						s.on_apply_fillstyle();
					}
				}
			}
		}
	};

	_pPyramidChart._getHighlightVisible = function () {
		var series = this.seriesset, length = series.length, highlightvisible = false;

		for (var i = 0; i < length; i++) {
			var s = series[i];
			if (s.highlightvisible) {
				highlightvisible = true;
				break;
			}
		}

		return highlightvisible;
	};

	_pPyramidChart._showSeriesItem = function (id) {
		var s = this.seriesset[0];
		var seriesGroup = this._seriesGroup;
		if (s) {
			var seriesitems = s._seriesitems, length = seriesitems.length;

			for (var i = 0; i < length; i++) {
				var item = seriesitems[i], name = item.category;

				if (name == id) {
					item._isShow = true;
					this._rearrange = true;
					if (this.legend) {
						this._applyLegendItem();
					}
				}
			}
		}
		this._draw();
	};

	_pPyramidChart._hideSeriesItem = function (id) {
		var s = this.seriesset[0];
		var seriesGroup = this._seriesGroup;

		if (s) {
			var seriesitems = s._seriesitems, length = seriesitems.length;

			for (var i = 0; i < length; i++) {
				var item = seriesitems[i], name = item.category;

				if (name == id) {
					item._isShow = false;

					this._rearrange = true;
					if (this.legend) {
						this._applyLegendItem();
					}
				}
			}
		}
		this._draw();
	};
	_pPyramidChart._GetSeriesItemIndex = function (id) {
		var s = this.seriesset[0];
		if (s) {
			var seriesitems = s._seriesitems, length = seriesitems.length;

			for (var i = 0; i < length; i++) {
				var item = seriesitems[i], name = item.category;

				if (name == id) {
					return i;
				}
			}
		}
	};
	_pPyramidChart._GetSeriesItemFromId = function (id) {
		var s = this.seriesset[0];
		if (s) {
			var seriesitems = s._seriesitems, length = seriesitems.length;

			for (var i = 0; i < length; i++) {
				var item = seriesitems[i], name = item.category;

				if (name == id) {
					return item;
				}
			}
		}
	};
	_pPyramidChart._GetSeriesItemFromIndex = function (index) {
		var s = this.seriesset[0];
		if (s) {
			var seriesitems = s._seriesitems, length = seriesitems.length;

			for (var i = 0; i < length; i++) {
				var item = seriesitems[i], name = item.category;

				if (i == index) {
					return item;
				}
			}
		}
	};
	_pPyramidChart._GetSeriesItemIndexFromSlice = function (_slice) {
		var s = this.seriesset[0];
		if (s) {
			var seriesitems = s._seriesitems, length = seriesitems.length;

			for (var i = 0; i < length; i++) {
				var item = seriesitems[i], name = item._slice;
				var itemslice = item._slice;
				if (itemslice) {
					if (_slice == itemslice) {
						return i;
					}
					else if (itemslice.highlightvisible == true) {
						if (itemslice._highlight) {
							if (itemslice._highlight == _slice) {
								return i;
							}
						}
					}
				}
			}
		}
	};
	_pPyramidChart._setDataset = function () {
		nexacro._ChartBase.prototype._setDataset.call(this);
	};

	delete _pPyramidChart;
}

if (!nexacro.ChartPyramidSeriesControl) {
	nexacro.ChartPyramidSeriesControl = function (id, parent, graphicsControl) {
		nexacro._SeriesBase.prototype.constructor.apply(this, arguments);

		this._seriesitems = [];

		this._clickItemIndex = [];
		this._clickShow = false;
	};

	var _pChartPyramidSeriesControl = nexacro._createPrototype(nexacro._SeriesBase, nexacro.ChartPyramidSeriesControl);
	nexacro.ChartPyramidSeriesControl.prototype = _pChartPyramidSeriesControl;
	_pChartPyramidSeriesControl._type_name = "ChartPyramidSeriesControl";


	_pChartPyramidSeriesControl.highlightfillstyle = "";
	_pChartPyramidSeriesControl.highlightlinestyle = "";
	_pChartPyramidSeriesControl.highlightopacity = 1;
	_pChartPyramidSeriesControl.autogradation = "none";
	_pChartPyramidSeriesControl.highlightvisible = false;
	_pChartPyramidSeriesControl.itemtextguidelineopacity = 1;
	_pChartPyramidSeriesControl.itemtextguidelinestyle = "";
	_pChartPyramidSeriesControl.itemtextguidesize = undefined;
	_pChartPyramidSeriesControl.fillstyle = "";
	_pChartPyramidSeriesControl.linestyle = "";
	_pChartPyramidSeriesControl.opacity = 1;
	_pChartPyramidSeriesControl.visible = true;
	_pChartPyramidSeriesControl.graphratio = 60;
	_pChartPyramidSeriesControl.marginleftright = 10;
	_pChartPyramidSeriesControl.margintopdown = 10;
	_pChartPyramidSeriesControl.graphhalign = "center";


	_pChartPyramidSeriesControl._itemtextguidesize = null;
	_pChartPyramidSeriesControl._borderwidth = null;
	_pChartPyramidSeriesControl._itemtextguidelinestyle = null;
	_pChartPyramidSeriesControl._changedFillStyle = false;
	_pChartPyramidSeriesControl._fillstyle = null;

	_pChartPyramidSeriesControl.set_visible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.visible != val) {
			this._changeContentsProperty("visible", val, this.visible);
			this.visible = val;
			this.on_apply_visible(val);
		}

		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_visible = function (visible) {
		if (visible) {
			this._applyPropertySeries("visible", true);
			this._setItemTextGuideLineVisible(true);

			if (this.itemtextvisible) {
				this.on_apply_itemtextvisible(true);
			}
		}
		else {
			this._applyPropertySeries("visible", false);
			this._setItemTextGuideLineVisible(false);

			if (!this._itemtextvisible) {
				this.on_apply_itemtextvisible(false);
			}
		}

		this._chart._seriesGroup.set_visible(visible);

		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartPyramidSeriesControl.set_graphhalign = function (val) {
		var halign_enum = ["left", "right", "center"];
		if (halign_enum.indexOf(val) == -1) {
			val = "center";
		}

		if (this.graphhalign != val) {
			this._changeContentsProperty("graphhalign", val, this.graphhalign);
			this.graphhalign = val;
			this.on_apply_graphhalign(val);
		}
		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_graphhalign = function (val) {
		this._chart._recreate = true;
	};
	_pChartPyramidSeriesControl.set_graphratio = function (val) {
		var lVal = nexacro.toNumber(val);
		if (lVal < 0 || lVal > 100) {
			return;
		}
		if (this.graphratio != val) {
			this._changeContentsProperty("graphratio", lVal, this.graphratio);
			this.graphratio = lVal;
			this.on_apply_graphratio(lVal);
		}
		this._chart._draw();
	};
	_pChartPyramidSeriesControl.set_marginleftright = function (val) {
		var lVal = nexacro.toNumber(val);
		if (this.marginleftright != lVal) {
			this._changeContentsProperty("marginleftright", lVal, this.marginleftright);
			this.marginleftright = lVal;
			this.on_apply_marginleftright(lVal);
		}
		this._chart._draw();
	};
	_pChartPyramidSeriesControl.set_margintopdown = function (val) {
		var lVal = nexacro.toNumber(val);
		if (this.margintopdown != lVal) {
			this._changeContentsProperty("margintopdown", lVal, this.margintopdown);
			this.margintopdown = lVal;
			this.on_apply_margintopdown(lVal);
		}
		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_graphratio = 
		_pChartPyramidSeriesControl.on_apply_margintopdown = 
		_pChartPyramidSeriesControl.on_apply_marginleftright = function (margin) {
		this._chart._recreate = true;
	};

	_pChartPyramidSeriesControl.set_linestyle = function (val) {
		this.linestyle = val;
		if (val) {
			if (this._linestyle == null || this._linestyle.value != val) {
				var oldValue;
				if (this._linestyle) {
					oldValue = this._linestyle.value;
				}
				this._changeContentsProperty("linestyle", val, oldValue);

				var linestyle = nexacro.BorderLineObject(val);
				this._linestyle = linestyle;
				this.on_apply_linestyle(linestyle);
			}
		}
		else {
			if (this._linestyle) {
				this._linestyle = null;
				this.on_apply_linestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_linestyle = function (linestyle) {
		if (linestyle) {
			this._borderwidth = linestyle._width;
		}
		this._redrawSeries = false;
		this._applyPropertySeries("linestyle", linestyle);
	};

	_pChartPyramidSeriesControl.set_fillstyle = function (v) {
		this.fillstyle = v;
		var i = 0;
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				var fillarr = this._spliterColor(val, false);
				this._fillstyle = fillarr;

				this._changedFillStyle = true;
				this._chart._changedColorset = false;
				this.on_apply_fillstyle();
			}
		}
		else {
			this._changedFillStyle = false;
			this._chart._changedColorset = true;
			this._chart.on_apply_colorset(this._chart._colorset);
			this._fillstyle = null;
			this.on_apply_fillstyle();
		}

		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_fillstyle = function () {
		if (!this._fillstyle) {
			this._redrawSeries = false;
			if (this._chart.legend) {
				this._chart._applyLegendItem();
			}
			return false;
		}

		var colors = this._fillstyle;
		var seriesitems = this._chart._seriesitems;
		var colorcnt = 0;
		var color;

		if (seriesitems) {
			for (var i = 0; i < seriesitems.length; i++) {
				var item = seriesitems[i];
				if (item && item._isShow) {
					color = colors[colorcnt];
					if (color) {
						colorcnt++;
					}
					else {
						colorcnt = 0;
					}

					if (colorcnt == 0) {
						color = colors[colorcnt];
						colorcnt++;
					}

					seriesitems[i].color = color;

					var slice = item._slice;
					if (slice) {
						slice.set_fillstyle(color);
					}
				}
			}
		}
		this._redrawSeries = false;
		if (this._chart.legend) {
			this._chart._applyLegendItem();
		}
	};

	_pChartPyramidSeriesControl.set_opacity = function (val) {
		this.opacity = val;
		if (0 === val || val) {
			if (this._opacity == null || this._opacity.value != val) {
				var oldValue;
				if (this._opacity) {
					oldValue = this._opacity.value;
				}
				this._changeContentsProperty("opacity", val, oldValue);

				var opacity = nexacro.OpacityObject(val);
				this._opacity = opacity;
				this.on_apply_opacity(opacity);
			}
		}
		else {
			if (this._opacity) {
				this._opacity = null;
				this.on_apply_opacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_opacity = function (opacity) {
		this._redrawSeries = false;
		this._applyPropertySeries("opacity", opacity);
	};

	_pChartPyramidSeriesControl.set_itemtextguidesize = function (val) {
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

		if (this.itemtextguidesize != val) {
			this._changeContentsProperty("itemtextguidesize", val, this.itemtextguidesize);
			this.itemtextguidesize = val;
			this.on_apply_itemtextguidesize(lVal);
		}

		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_itemtextguidesize = function (itemtextguidesize) {
		itemtextguidesize = Math.abs(itemtextguidesize);

		this._itemtextguidesize = itemtextguidesize;
		this._chart._recreate = true;
	};

	_pChartPyramidSeriesControl.set_itemtextguidelinestyle = function (val) {
		this.itemtextguidelinestyle = val;
		if (val) {
			if (this._itemtextguidelinestyle == null || this._itemtextguidelinestyle.value != val) {
				var oldValue;
				if (this._itemtextguidelinestyle) {
					oldValue = this._itemtextguidelinestyle.value;
				}
				this._changeContentsProperty("itemtextguidelinestyle", val, oldValue);

				var itemtextguidelinestyle = nexacro.BorderLineObject(val);
				this._itemtextguidelinestyle = itemtextguidelinestyle;
				this.on_apply_itemtextguidelinestyle(itemtextguidelinestyle);
			}
		}
		else {
			if (this._itemtextguidelinestyle) {
				this._itemtextguidelinestyle = null;
				this.on_apply_itemtextguidelinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_itemtextguidelinestyle = function (itemtextguidelinestyle) {
		if (this._is_initprop) {
			return;
		}

		var chart = this._chart, seriesGroup = chart._seriesGroup, items = this._seriesitems;

		if (seriesGroup && !nexacro._isNull(items)) {
			var length = items.length, item;
			for (var i = 0; i < length; i++) {
				var itemID = this._configIndex + " SeriesPyramidItemLine_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (item) {
					item.set_strokepen(itemtextguidelinestyle ? itemtextguidelinestyle.value || itemtextguidelinestyle : "1px solid #717a8380");
				}
				else {
					this._chart._recreate = true;
				}
			}
		}
	};

	_pChartPyramidSeriesControl.set_itemtextguidelineopacity = function (val) {
		this.itemtextguidelineopacity = val;
		if (0 === val || val) {
			if (this._itemtextguidelineopacity == null || this._itemtextguidelineopacity.value != val) {
				var oldValue;
				if (this._itemtextguidelineopacity) {
					oldValue = this._itemtextguidelineopacity.value;
				}
				this._changeContentsProperty("itemtextguidelineopacity", val, oldValue);

				var itemtextguidelineopacity = nexacro.OpacityObject(val);
				this._itemtextguidelineopacity = itemtextguidelineopacity;
				this.on_apply_itemtextguidelineopacity(itemtextguidelineopacity);
			}
		}
		else {
			if (this._itemtextguidelineopacity) {
				this._itemtextguidelineopacity = null;
				this.on_apply_highlightopacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_itemtextguidelineopacity = function (itemtextguidelineopacity) {
		var chart = this._chart, seriesGroup = chart._seriesGroup, items = this._seriesitems;

		if (seriesGroup && !nexacro._isNull(items)) {
			var length = items.length, item;
			for (var i = 0; i < length; i++) {
				var itemID = this._configIndex + " SeriesPyramidItemLine_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (item) {
					item.set_opacity(itemtextguidelineopacity);
				}
				else {
					this._chart._recreate = true;
				}
			}
		}
	};

	_pChartPyramidSeriesControl.set_highlightvisible = function (val) {
		if (val === undefined || val === null) {
			return;
		}

		val = nexacro._toBoolean(val);
		if (this.highlightvisible != val) {
			this._changeContentsProperty("highlightvisible", val, this.highlightvisible);
			this.highlightvisible = val;
			this.on_apply_highlightvisible(val);
		}

		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_highlightvisible = function (highlightvisible) {
		this._chart._recreate = true;
	};

	_pChartPyramidSeriesControl.set_highlightlinestyle = function (val) {
		this.highlightlinestyle = val;
		if (val) {
			if (this._highlightlinestyle == null || this._highlightlinestyle.value != val) {
				var oldValue;
				if (this._highlightlinestyle) {
					oldValue = this._highlightlinestyle.value;
				}
				this._changeContentsProperty("highlightlinestyle", val, oldValue);

				var highlightlinestyle = nexacro.BorderLineObject(val);
				this._highlightlinestyle = highlightlinestyle;
				this.on_apply_highlightlinestyle(highlightlinestyle);
			}
		}
		else {
			if (this._highlightlinestyle) {
				this._highlightlinestyle = null;
				this.on_apply_highlightlinestyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_highlightlinestyle = function (highlightlinestyle) {
	};

	_pChartPyramidSeriesControl.set_highlightfillstyle = function (val) {
		this.highlightfillstyle = val;
		if (val) {
			if (this._highlightfillstyle == null || this._highlightfillstyle.value != val) {
				var oldValue;
				if (this._highlightfillstyle) {
					oldValue = this._highlightfillstyle.value;
				}
				this._changeContentsProperty("highlightfillstyle", val, oldValue);

				var highlightfillstyle = nexacro.BackgroundObject(val, this);
				this._highlightfillstyle = highlightfillstyle;
				this.on_apply_highlightfillstyle(highlightfillstyle);
			}
		}
		else {
			if (this._highlightfillstyle) {
				this._highlightfillstyle = null;
				this.on_apply_highlightfillstyle(null);
			}
		}

		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_highlightfillstyle = function (highlightfillstyle) {
	};

	_pChartPyramidSeriesControl.set_highlightopacity = function (val) {
		this.highlightopacity = val;
		if (0 === val || val) {
			if (this._highlightopacity == null || this._highlightopacity.value != val) {
				var oldValue;
				if (this._highlightopacity) {
					oldValue = this._highlightopacity.value;
				}
				this._changeContentsProperty("highlightopacity", val, oldValue);

				var highlightopacity = nexacro.OpacityObject(val);
				this._highlightopacity = highlightopacity;
				this.on_apply_highlightopacity(highlightopacity);
			}
		}
		else {
			if (this._highlightopacity) {
				this._highlightopacity = null;
				this.on_apply_highlightopacity(null);
			}
		}

		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_highlightopacity = function (highlightopacity) {
	};


	_pChartPyramidSeriesControl.set_autogradation = function (val) {
		if (val === undefined || val === null) {
			val = "none";
		}
		if (this.autogradation != val) {
			this._changeContentsProperty("autogradation", val, this.autogradation);
			this.autogradation = val;
			this.on_apply_autogradation(val);
		}
		this._chart._draw();
	};

	_pChartPyramidSeriesControl.on_apply_autogradation = function (autogradation) {
		this._redrawSeries = false;
	};


	_pChartPyramidSeriesControl._applyPropertySeries = function (style, value, select) {
		var item, seriesGroup, itemID;

		seriesGroup = this._chart._graphicsControl.getObjectByID("ChartSeriesGroup");
		if (seriesGroup) {
			for (var i = 1; i <= this._itemCnt; i++) {
				itemID = this._configIndex + " SeriesPyramid" + "Item_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (!nexacro._isNull(item)) {
					if (style == "visible") {
						item.set_visible(value);
					}
					else if (style == "linestyle") {
						item.set_strokepen(value);
					}
					else if (style == "opacity") {
						item.set_opacity(value);
					}
				}
			}
		}
	};

	_pChartPyramidSeriesControl._setItemTextGuideLineVisible = function (visible) {
		var chart = this._chart, seriesGroup = chart._seriesGroup, items = this._seriesitems;

		if (seriesGroup && !nexacro._isNull(items)) {
			var length = items.length, item;
			for (var i = 0; i < length; i++) {
				var itemID = this._configIndex + " SeriesPyramidItemLine_" + i;
				item = seriesGroup.getObjectByID(itemID);
				if (item) {
					item.set_visible(visible);
				}
				else {
					this._chart._recreate = true;
				}
			}
		}
	};

	_pChartPyramidSeriesControl._draw = function (redraw) {
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

	_pChartPyramidSeriesControl._drawnow = function () {
		this._itemCnt = 0;
		this._itemtextlist = [];
		this._drawPyramidSeries();
	};

	_pChartPyramidSeriesControl._setItemData = function () {
		var data = this._data, itemdata;

		if (data) {
			itemdata = this._processItemData(data);
		}
		return itemdata;
	};

	_pChartPyramidSeriesControl._setItemColor = function (items) {
		var colorcnt = 0;
		var colorset = this._chart._colorset;
		var item;

		for (var i = 0; i < items.length; i++) {
			item = items[i];
			if (item._isShow && item.value) {
				var itemColor = colorset[colorcnt];
				if (itemColor) {
					colorcnt++;
				}
				else {
					colorcnt = 0;
				}

				if (colorcnt == 0) {
					itemColor = colorset[colorcnt];
					colorcnt++;
				}

				items[i].color = itemColor;
				var slice = items[i]._slice;
				if (slice) {
					slice.set_fillstyle(itemColor);
				}
			}
		}
	};
	_pChartPyramidSeriesControl._rearrangeProcessItemData = function (arritems) {
		var total = 0;

		var items = arritems || this._seriesitems;
		var i = 0;
		var value;
		for (i = 0; i < items.length; ++i) {
			if (items[i]._isShow) {
				value = items[i].value;
				if (value) {
					total += items[i].value;
				}
			}
		}

		for (i = 0; i < items.length; ++i) {
			value = 0;
			value = items[i].value;
			var percent = (value / total).toFixed(2);

			items[i].percent = nexacro.toNumber(percent);
		}

		return items;
	};
	_pChartPyramidSeriesControl._processItemData = function (data) {
		var length = data.length, slice = [], i = 0, value, total = 0;

		for (i = 0; i < length; i++) {
			var seriesItems = {
			};
			var showFlag = true;

			if (data[i] != null && data[i][0] != undefined) {
				if (!this._clickShow && (this._clickItemIndex.length > 0)) {
					for (var j = 0; j < this._clickItemIndex.length; j++) {
						var index = this._clickItemIndex[j];
						if (i == index) {
							showFlag = false;
						}
					}
				}

				if (!showFlag) {
					seriesItems._isShow = false;
				}
				else {
					seriesItems._isShow = true;
				}

				seriesItems.index = data[i][2];
				seriesItems.rowindex = data[i][2];
				seriesItems.category = data[i][0];
				seriesItems.value = parseFloat(data[i][1]) || 0;
				slice.push(seriesItems);
			}
		}
		this._seriesitems = slice;

		var items = this._seriesitems;
		for (i = 0; i < items.length; ++i) {
			if (items[i]._isShow) {
				value = items[i].value;
				if (value) {
					total += items[i].value;
				}
			}
		}

		for (i = 0; i < items.length; ++i) {
			value = 0;
			var percent = 0;
			var angle = 0;
			var endangle = this._endangle || Math.PI * 2;
			value = items[i].value;
			percent = (value / total).toFixed(2);

			items[i].percent = nexacro.toNumber(percent);
		}

		return items;
	};

	_pChartPyramidSeriesControl._drawPyramidSeries = function () {
		var items = this._seriesitems, isNullData = false, board = this._chart._boardRect, boardWidth = 0, boardHeight = 0, borderWidth = this._chart._boardBorderWidth, borderHeight = this._chart._boardBorderHeight, effect = this._chart_aniframe_obj, itemtextvisible = this.itemtextvisible;


		if (!items) {
			return false;
		}

		if (board) {
			this._chart._boardWidth = board.width - borderWidth;
			this._chart._boardHeight = board.height - borderHeight;
			this._chart._centerLeft = this._chart._boardWidth / 2;
			this._chart._centerTop = this._chart._boardHeight / 2;
		}

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item && item._isShow) {
				var category = item.category, value = item.value;
				if (category == null || value === undefined || value === null) {
					isNullData = true;
					break;
				}
			}
		}

		if (items.length <= 0 || isNullData) {
			return;
		}
		this.marginleftright = nexacro.toNumber(this.marginleftright);
		this.margintopdown = nexacro.toNumber(this.margintopdown);

		var chartWidth = this._chart._boardWidth;
		var chartHeight = this._chart._boardHeight;

		var graphleft;
		var graphtop = this.margintopdown;
		var graphheight = chartHeight - (this.margintopdown * 2);

		var graphwidth;
		var graphratio = this.graphratio;
		if (graphratio > 30 && graphratio < 100) {
			graphwidth = chartWidth * (this.graphratio * 0.01);
		}
		else {
			graphwidth = chartWidth;
		}

		switch (this.graphhalign) {
			case "left":
				graphleft = this.marginleftright;
				break;
			case "right":
				graphleft = chartWidth - graphwidth - this.marginleftright;
				break;
			case "center":
				graphleft = (chartWidth / 2) - (graphwidth / 2);
				break;
			default:
		}

		var graphCenterX = graphleft + (graphwidth / 2);
		var graphCenterY = graphtop + (graphheight / 2);

		this._drawPyramid(graphleft, graphtop, graphwidth, graphheight, graphCenterX, graphCenterY);

		if (itemtextvisible) {
			if (effect && effect.isloadanimation) {
			}
			else {
				this._drawLabels(graphleft, graphtop, graphwidth, graphheight, graphCenterX, graphCenterY);
			}
		}
	};

	_pChartPyramidSeriesControl._drawPyramid = function (graphleft, graphtop, graphwidth, graphheight, graphCenterX, graphCenterY) {
		var chart = this._chart, total = 0, linestyle = this.linestyle, opacity = this.opacity, allitems = this._seriesitems.slice(0), items = [], seriesGroup = chart._seriesGroup, slice, itemId, drawitemCnt = 0, effect = this._chart_aniframe_obj, i = 0;

		var maxvalue = 0;
		var itemvalue;
		for (i in allitems) {
			if (allitems[i]._isShow) {
				itemvalue = allitems[i].value;
				total += itemvalue;
				if (itemvalue > maxvalue) {
					maxvalue = itemvalue;
				}
			}
		}

		var isAscending = !chart.invertchart;

		for (i = 0; i < allitems.length; i++) {
			valuedata = allitems[i].value;
			if (valuedata >= 0 && allitems[i]._isShow) {
				items.push(allitems[i]);
			}
			this._itemCnt++;
		}
		var sumvalue = 0;

		function addItem (pThis, index, item, pathData) {
			var itemId = pThis._configIndex + " SeriesPyramidItem_" + index;
			var slice = seriesGroup.getObjectByID(itemId);
			if (!slice) {
				slice = new nexacro.ChartGraphicsPath();
				slice.set_id(itemId);
				seriesGroup.addChild(slice);
			}

			slice._seriesItem = item;
			slice._series = pThis;
			slice.setPathData(pathData);
			item._slice = slice;
			slice.index = item.rowindex;

			if (pThis.highlightvisible) {
				slice.highlightPathData = pathData;
				slice.highlightvisible = true;
			}

			var fillColor = item.color;
			slice.set_strokepen(linestyle ? linestyle.value || linestyle : "1px solid #717a8380");
			slice.set_opacity(opacity);

			var bTarget = false;
			if (pThis.autogradation != "none") {
				var sv_fillColor = fillColor;
				if (fillColor instanceof nexacro._BackgroundObject) {
					if (!fillColor.gradient) {
						bTarget = true;
						sv_fillColor = fillColor.value;
					}
				}
				else if (fillColor) {
					bTarget = (fillColor.indexOf("gradient") < 0) ? true : false;
				}
				if (bTarget) {
					fillColor = sv_fillColor;
					var gColor = "";
					if (pThis.autogradation == "center") {
						var lightcolor = pThis._shadeColor(fillColor, -80);
						gColor = "linear-gradient(to left," + fillColor + " 20%," + lightcolor + " 50%," + fillColor + " 80%)";
					}
					else {
						var darkcolor = pThis._shadeColor(fillColor, 40);
						gColor = "linear-gradient(to left," + darkcolor + " 0%," + fillColor + " 50%," + darkcolor + " 100%)";
					}
					slice.set_fillstyle(gColor);
					slice._highlightcolor = fillColor;
				}
				else {
					slice.set_fillstyle(fillColor);
				}
			}
			else {
				slice.set_fillstyle(fillColor);
			}
			slice._series = pThis;
		}

		function drawPyramidSlice (pThis, i) {
			var item = items[i];
			var value = item.value;
			var curpercent;
			var itemwidth, itemheight;
			var nextwidth, nextheight;
			var nextitem = items[i + 1];

			if (effect && effect.isloadanimation) {
				value = pThis._getanimationdrawvalue(value);
			}

			curpercent = (sumvalue / total);
			itemheight = curpercent * graphheight;
			if (isAscending) {
				itemwidth = curpercent * graphwidth;
			}
			else {
				itemwidth = ((total - sumvalue) / total) * graphwidth;
			}

			curpercent = ((sumvalue + value) / total);
			nextheight = curpercent * graphheight;
			if (isAscending) {
				nextwidth = curpercent * graphwidth;
			}
			else {
				nextwidth = ((total - (sumvalue + value)) / total) * graphwidth;
			}

			sumvalue += value;
			var x1 = graphCenterX - (itemwidth / 2), y1 = itemheight + graphtop, x2 = graphCenterX + (itemwidth / 2), y2 = itemheight + graphtop, x3 = graphCenterX + (nextwidth / 2), y3 = nextheight + graphtop, x4 = graphCenterX - (nextwidth / 2), y4 = y3;

			var p1 = x1 + " " + y1;
			var p2 = x2 + " " + y2;
			var p3 = x3 + " " + y3;
			var p4 = x4 + " " + y4;

			var pathData = "M" + p1 + " L" + p2 + " L" + p3 + " L" + p4 + " Z";
			item.pathData = pathData;

			var posinfo = {
				"x1" : x1, 
				"x2" : x2, 
				"x3" : x3, 
				"x4" : x4, 
				"y1" : y1, 
				"y2" : y2, 
				"y3" : y3, 
				"y4" : y4
			};
			item._posinfo = posinfo;

			addItem(pThis, (i + 1), item, pathData);
		}

		var lastY = graphtop;
		function drawFunnelSlice (pThis, i) {
			var item = items[i];
			var value = item.value;

			var itemwidth = (value / maxvalue) * graphwidth;
			var itemheight = graphheight * item.percent;
			var itemnext = items[i + 1];
			var itemnextwidth, itemnextwidthhalf;

			if (!isAscending && i == 1) {
				itemwidth = (items[0].value / maxvalue) * graphwidth;
			}
			var itemwidthhalf = (itemwidth / 2);
			if (itemnext) {
				if (!isAscending && i == 0) {
					itemnextwidth = itemwidth;
				}
				else {
					itemnextwidth = (itemnext.value / maxvalue) * graphwidth;
				}
			}
			else {
				if (isAscending) {
					itemnextwidth = itemwidth;
				}
				else {
					itemnextwidth = graphwidth;
				}
			}
			if (effect && effect.isloadanimation) {
				itemwidth = pThis._getanimationdrawvalue(itemwidth);
				itemnextwidth = pThis._getanimationdrawvalue(itemnextwidth);
			}

			itemnextwidthhalf = (itemnextwidth / 2);

			var x1 = graphCenterX - itemwidthhalf, y1 = lastY, x2 = graphCenterX + itemwidthhalf, y2 = lastY, x3 = graphCenterX + itemnextwidthhalf, y3 = lastY + itemheight, x4 = graphCenterX - itemnextwidthhalf, y4 = lastY + itemheight;

			var p1 = x1 + " " + y1;
			var p2 = x2 + " " + y2;
			var p3 = x3 + " " + y3;
			var p4 = x4 + " " + y4;

			var pathData = "M" + p1 + " L" + p2 + " L" + p3 + " L" + p4 + " Z";
			item.pathData = pathData;

			var posinfo = {
				"x1" : x1, 
				"x2" : x2, 
				"x3" : x3, 
				"x4" : x4, 
				"y1" : y1, 
				"y2" : y2, 
				"y3" : y3, 
				"y4" : y4
			};
			item._posinfo = posinfo;

			addItem(pThis, (i + 1), item, pathData);

			lastY = lastY + itemheight;
		}

		for (i = 0; i < items.length; i++) {
			if (chart.graphtype == "funnel") {
				drawFunnelSlice(this, i);
			}
			else {
				drawPyramidSlice(this, i);
			}
		}
	};

	_pChartPyramidSeriesControl._drawLabels = function (graphleft, graphtop, graphwidth, graphheight, graphCenterX, graphCenterY) {
		var seriesGroup = this._chart._seriesGroup;

		var items;

		items = this._seriesitems;
		var itemtextguidelinestyle = this.itemtextguidelinestyle, itemtextguidelineopacity = this.itemtextguidelineopacity;
		var itemtextguidesize = this._itemtextguidesize;
		var guidesize = (itemtextguidesize ? itemtextguidesize : 10);
		var textgapsize = 5;

		function addGuideLine (pThis, item, itemText, index, x1, y1, x2, y2) {
			var itemId = pThis._configIndex + " SeriesPyramidItemLine_" + index;
			var guideline = seriesGroup.getObjectByID(itemId);
			if (!guideline) {
				guideline = new nexacro.ChartGraphicsPath();
				guideline.set_id(itemId);
				seriesGroup.addChild(guideline);
			}
			guideline.set_strokepen(itemtextguidelinestyle ? itemtextguidelinestyle.value || itemtextguidelinestyle : "1px solid #717a8380");
			guideline.set_opacity(itemtextguidelineopacity);
			guideline.moveTo(x1, y1);
			guideline.lineTo(x2, y2);

			guideline._series = pThis;
			guideline._seriesItem = item;
			guideline.index = itemText.index;
			guideline.value = itemText.value;
		}

		function drawLabel (pThis, item, index) {
			var itemText = pThis._createSeriesItemText(item);

			if (nexacro._isNull(itemText)) {
				return;
			}

			var posinfo = item._posinfo;
			var txtsize = itemText._txtSize;
			if (!txtsize) {
				itemText._updateText();
				txtsize = itemText._txtSize;
			}
			var textX, textY;
			var linex1, liney1, linex2, liney2;
			var itemheight = Math.abs(posinfo.y4 - posinfo.y1);
			var itemcentery = posinfo.y4 - (itemheight / 2);

			if (pThis.graphhalign == "center") {
				if (itemheight <= txtsize[1]) {
					textX = posinfo.x3 + guidesize + textgapsize;
					textY = posinfo.y1;

					if (itemtextguidesize) {
						if (posinfo.x3 > posinfo.x2) {
							linex1 = posinfo.x3 - (Math.abs(posinfo.x3 - posinfo.x2) / 2);
						}
						else {
							linex1 = posinfo.x2 - (Math.abs(posinfo.x2 - posinfo.x3) / 2);
						}
						liney1 = liney2 = posinfo.y1 + 5;
						linex2 = linex1 + itemtextguidesize;
						addGuideLine(pThis, item, itemText, index, linex1, liney1, linex2, liney2);
						itemText.set_textAlign("left");
						itemText.set_verticalAlign("top");
					}
				}
				else {
					textX = graphCenterX;
					textY = itemcentery;
					itemText.set_textAlign("center");
					itemText.set_verticalAlign("middle");
				}
			}
			else if (pThis.graphhalign == "left") {
				var itemcenterx;
				if (posinfo.x3 > posinfo.x2) {
					itemcenterx = posinfo.x3 - (Math.abs(posinfo.x3 - posinfo.x2) / 2);
				}
				else {
					itemcenterx = posinfo.x2 - (Math.abs(posinfo.x2 - posinfo.x3) / 2);
				}
				textX = itemcenterx + guidesize + textgapsize;
				textY = itemcentery;
				if (itemtextguidesize) {
					addGuideLine(pThis, item, itemText, index, itemcenterx, itemcentery, itemcenterx + guidesize, itemcentery);
				}
				itemText.set_textAlign("left");
				itemText.set_verticalAlign("middle");
			}
			else if (pThis.graphhalign == "right") {
				var itemcenterx;
				if (posinfo.x4 > posinfo.x1) {
					itemcenterx = posinfo.x4 - (Math.abs(posinfo.x4 - posinfo.x1) / 2);
				}
				else {
					itemcenterx = posinfo.x1 - (Math.abs(posinfo.x1 - posinfo.x4) / 2);
				}
				textX = itemcenterx - guidesize - textgapsize;
				textY = itemcentery;
				if (itemtextguidesize) {
					addGuideLine(pThis, item, itemText, index, itemcenterx, itemcentery, itemcenterx - guidesize, itemcentery);
				}
				itemText.set_textAlign("right");
				itemText.set_verticalAlign("middle");
			}

			itemText.set_x(textX);
			itemText.set_y(textY);
			seriesGroup.addChild(itemText);
			itemText._series = pThis;
			itemText._seriesItem = item;

			pThis._chart._setChangeInBoardAreaPos(itemText);
		}

		for (var i = 0; i < this._itemCnt; i++) {
			if (items[i]._isShow) {
				drawLabel(this, items[i], i);
			}
		}
	};

	_pChartPyramidSeriesControl._showHighlight = function (item) {
		if (!this.highlightvisible) {
			return;
		}

		var highlight = item._highlight;
		if (!highlight) {
			this._drawHighlight(item);

			if (this._chart.graphhalign == "center") {
				this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, false);
			}
			else {
				this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, false);
			}
			this._chart._graphicsControl.draw();
		}
	};

	_pChartPyramidSeriesControl._hideHighlight = function (item) {
		if (!this.highlightvisible) {
			return;
		}

		var highlight = item._highlight;
		if (highlight && !nexacro._ChartGraphicsLib.isEmpty(highlight.parent)) {
			this._chart._chageGroupObject(this._chart._seriesGroup, this._chart._highlightGroup, this._itemtextlist, true);
			this._chart._highlightGroup.removeChild(highlight);
			delete item._highlight;

			this._chart._graphicsControl.draw();
		}
	};

	_pChartPyramidSeriesControl._drawHighlight = function (item) {
		var highlightlinestyle = this.highlightlinestyle || "1px solid " + this._chart._highlightcolorset[0], highlightfillstyle = this.highlightfillstyle || this._chart._highlightcolorset[0], highlightopacity = this.highlightopacity, slice, highlightPathData, highlightGroup = this._chart._highlightGroup;

		if (item) {
			highlightPathData = item.highlightPathData;
			if (highlightPathData) {
				slice = new nexacro.ChartGraphicsPath();
				slice.setPathData(highlightPathData);
				slice.set_id("SeriesHighlightPyramidItem");
				slice.set_strokepen(highlightlinestyle);
				if (item._highlightcolor) {
					slice.set_fillstyle(item._highlightcolor);
				}
				else {
					slice.set_fillstyle(item._style.fillstyle);
				}

				slice.set_strokejoin("round");
				slice.set_opacity(highlightopacity);

				highlightGroup.addChild(slice);

				item._highlight = slice;
				slice._item = item;
				slice._series = this;
			}
		}
	};

	_pChartPyramidSeriesControl._afterSetProperties = function () {
		var legend = this._chart.legend;
		if (legend) {
			this._chart._applyLegendItem();
		}
	};

	delete _pChartPyramidSeriesControl;
}
