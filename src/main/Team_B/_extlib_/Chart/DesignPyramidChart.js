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
if (nexacro.PyramidChart)
{
    //==================================================================//
    // PyramidChart
    //==================================================================//
    var _pPyramidChart = nexacro.PyramidChart.prototype;

    _pPyramidChart._use_makeContentsString = false;
    _pPyramidChart._use_categorycolumn = true;

    _pPyramidChart.createCssDesignContents = function ()
    {
    };

    _pPyramidChart.destroyCssDesignContents = function ()
    {
    };

    _pPyramidChart.set_categorycolumn = function (v)
    {
        if (v === undefined || v === null)
            v = "";

        if (this.categorycolumn._value != v)
        {
            this.categorycolumn._set(v);
            this.on_apply_categorycolumn();
        }

        this._draw();
    };

    _pPyramidChart.makeContentsString = function ()
    {
        // PyramidChart
        // column 0 : chart categorycolumn
        // column 1 ~ n : series valuecolumn only one (column 1)
        var ds = this._binddataset;
        if (ds && ds.getColCount() > 0)
        {
            //if (ds.getColCount() == 1)
            //nexacro.__onNexacroStudioError("not enough Dataset Columns.");

            var str_contents = "{\n";
            str_contents += this._getDesignContentsTitle() + ", \n";
            str_contents += this._getDesignContentsLegend() + ", \n";
            str_contents += this._getDesignContentsTooltip() + ", \n";
            str_contents += this._getDesignContentsBoard() + ", \n";
            str_contents += this._getDesignContentsSereisset() + "\n"
            str_contents += "}";

            return "<Contents><![CDATA[" + str_contents + "]]></Contents>";
        }

        return "";
    };

    _pPyramidChart._getDesignContentsTitle = function ()
    {
        var str_contents = "\t\"title\": {\n";
        str_contents += "\t\t\"id\": \"title\", \n";
        str_contents += "\t\t\"text\": \"Pyramid Chart\", \n";
        str_contents += "\t\t\"textfont\": \"20pt/normal \'맑은 고딕\'\", \n";
        str_contents += "\t\t\"padding\": \"0px 0px 5px\"\n";
        str_contents += "\t}";

        return str_contents;
    };

    _pPyramidChart._getDesignContentsBoard = function ()
    {
        var str_contents = "\t\"board\": {\n";
        str_contents += "\t\t\"id\": \"board\"\n";
        str_contents += "\t}";

        return str_contents;
    };

    _pPyramidChart._getDesignContentsTooltip = function ()
    {
        var str_contents = "\t\"tooltip\": {\n";
        str_contents += "\t\t\"id\": \"tooltip\", \n";
        str_contents += "\t\t\"background\": \"#4b4b4b\", \n";
        str_contents += "\t\t\"linestyle\": \"0px none\", \n";
        str_contents += "\t\t\"textcolor\": \"#ffffff\", \n";
        str_contents += "\t\t\"textfont\": \"10pt/normal \'맑은 고딕\'\", \n";
        str_contents += "\t\t\"padding\": \"5px\"\n";
        str_contents += "\t}";

        return str_contents;
    };

    _pPyramidChart._getDesignContentsLegend = function ()
    {
        var str_contents = "\t\"legend\": {\n";
        str_contents += "\t\t\"id\": \"legend\", \n";
       // str_contents += "\t\t\"linestyle\": \"0px solid #717a8380\", \n";
        str_contents += "\t\t\"padding\": \"3px 10px 3px 10px\", \n";
        str_contents += "\t\t\"itemtextfont\": \"9pt \'맑은 고딕\'\", \n";
		str_contents += "\t\t\"visible\": \"false\", \n";
        str_contents += "\t\t\"itemtextcolor\": \"#4c4c4c\"\n";
        str_contents += "\t}";

        return str_contents;
    };

    _pPyramidChart._getDesignContentsSereisset = function ()
    {
        var ds = this._binddataset;
        if (ds)
        {
            var str_contents = "\t\"seriesset\": [\n";
            var max_series = 1;
            var col_cnt = ds.getColCount();
            if (col_cnt > 1)
            {
                str_contents += this._getDesignContentsSereis(0, ds.getColID(1)) + "\n";
            }

            str_contents += "\t]";

            return str_contents;
        }
    };

    _pPyramidChart._getDesignContentsSereis = function (index, valuecolumn_id)
    {
        var str_contents = "\t  {\n";
        str_contents += "\t\t\"id\": \"series" + index + "\", \n";
        str_contents += "\t\t\"margintopdown\": 10, \n";
        str_contents += "\t\t\"marginleftright\": 10, \n";
		str_contents += "\t\t\"graphratio\": 60, \n";
        str_contents += "\t\t\"linestyle\": \"2px solid #ffffff\", \n";
        str_contents += "\t\t\"itemtextvisible\": true, \n";
        str_contents += "\t\t\"itemtextfont\": \"10pt/normal \'맑은 고딕\'\", \n";
        str_contents += "\t\t\"valuecolumn\": \"bind:" + valuecolumn_id + "\"\n";
        str_contents += "\t  }";

        return str_contents;
    };

}