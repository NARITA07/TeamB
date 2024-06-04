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
if (nexacro.RoseChart)
{
    //==================================================================//
    // RoseChart
    //==================================================================//
    var _pRoseChart = nexacro.RoseChart.prototype;

    _pRoseChart._use_makeContentsString = false;
    _pRoseChart._use_categorycolumn = true;

    _pRoseChart.createCssDesignContents = function ()
    {
    };

    _pRoseChart.destroyCssDesignContents = function ()
    {
    };

    _pRoseChart.set_categorycolumn = function (v)
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

    _pRoseChart.makeContentsString = function ()
    {
        // RoseChart
        // column 0 : chart categorycolumn
        // column 1 ~ n : series valuecolumn
		// Rose chart는 categoryaxis,valueaxis 각각 1개씩만 존재한다.
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
			str_contents += this._getDesignContentsCategoryaxis() + ", \n";
			str_contents += this._getDesignContentsValueaxis(1) + ", \n";
            str_contents += this._getDesignContentsSereisset() + "\n"
            str_contents += "}";

            return "<Contents><![CDATA[" + str_contents + "]]></Contents>";
        }

        return "";
    };

    _pRoseChart._getDesignContentsTitle = function ()
    {
        var str_contents = "\t\"title\": {\n";
        str_contents += "\t\t\"id\": \"title\", \n";
        str_contents += "\t\t\"text\": \"Rose Chart\", \n";
        str_contents += "\t\t\"textfont\": \"20pt/normal \'맑은 고딕\'\", \n";
        str_contents += "\t\t\"padding\": \"0px 0px 5px\"\n";
        str_contents += "\t}";

        return str_contents;
    };

    _pRoseChart._getDesignContentsBoard = function ()
    {
        var str_contents = "\t\"board\": {\n";
        str_contents += "\t\t\"id\": \"board\"\n";
        str_contents += "\t}";

        return str_contents;
    };

    _pRoseChart._getDesignContentsTooltip = function ()
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

    _pRoseChart._getDesignContentsLegend = function ()
    {
        var str_contents = "\t\"legend\": {\n";
        str_contents += "\t\t\"id\": \"legend\", \n";
        str_contents += "\t\t\"padding\": \"3px 10px 3px 10px\", \n";
        str_contents += "\t\t\"itemtextfont\": \"9pt \'맑은 고딕\'\", \n";
        str_contents += "\t\t\"itemtextcolor\": \"#4c4c4c\"\n";
        str_contents += "\t}";

        return str_contents;
    };

    _pRoseChart._getDesignContentsSereisset = function ()
    {
        var ds = this._binddataset;
        if (ds)
        {
            var str_contents = "\t\"seriesset\": [\n";

            var col_cnt = ds.getColCount();
            if (col_cnt > 1)
            {
                var index_cnt = 0;

                for (var i = 1; i < col_cnt; i++)
                {
                    str_contents += this._getDesignContentsSereis(index_cnt, ds.getColID(i));
                    index_cnt++;

                    if (i == (col_cnt - 1))
                        str_contents += "\n";
                    else
                        str_contents += ", \n";
                }
            }

            str_contents += "\t]";

            return str_contents;
        }
    };
	 _pRoseChart._getDesignContentsCategoryaxis = function ()
    {
        var str_contents = "\t\"categoryaxis\": {\n";
        str_contents += "\t\t\"id\": \"categoryaxis\", \n";
        str_contents += "\t\t\"labeltextcolor\": \"#6f6f6f\", \n";
        str_contents += "\t\t\"labeltextfont\": \"10pt \'맑은 고딕\'\", \n";
        str_contents += "\t\t\"axislinestyle\": \"1px solid #d0d0d0\", \n";
		str_contents += "\t\t\"boardlinestyle\": \"1px solid #d0d0d0\"\n";
        str_contents += "\t}";

        return str_contents;
    };
	_pRoseChart._getDesignContentsValueaxis = function (min_axis)
    {
        var str_contents = "\t\"valueaxes\": [\n";
        for (var i = 0; i < min_axis; i++)
        {
            str_contents += this._getDesignContentsAxis(i);

            if (i == (min_axis - 1))
                str_contents += "\n";
            else
                str_contents += ", \n";
        }
        str_contents += "\t]";

        return str_contents;
    };
	_pRoseChart._getDesignContentsAxis = function (index)
	{
		var str_contents = "\t  {\n";
        str_contents += "\t\t\"id\": \"valueaxis" + index + "\", \n";
        str_contents += "\t\t\"labeltextcolor\": \"#6f6f6f\", \n";
        str_contents += "\t\t\"labeltextfont\": \"10pt \'맑은 고딕\'\", \n";
        str_contents += "\t\t\"axislinestyle\": \"1px solid #d0d0d0\", \n";
		str_contents += "\t\t\"boardlinestyle\": \"1px solid #d0d0d0\"\n";
        str_contents += "\t  }";

        return str_contents;
	};
    _pRoseChart._getDesignContentsSereis = function (index, valuecolumn_id)
    {
        var str_contents = "\t  {\n";
        str_contents += "\t\t\"id\": \"series" + index + "\", \n";
        str_contents += "\t\t\"titletext\": \"series\", \n";
        str_contents += "\t\t\"linevisible\": true, \n";
        str_contents += "\t\t\"itemtextvisible\": true, \n";
        str_contents += "\t\t\"itemtextcolor\": \"#003860\", \n";
        str_contents += "\t\t\"itemtextfont\": \"bold 6pt \'맑은 고딕\'\", \n";
        str_contents += "\t\t\"valuecolumn\": \"bind:" + valuecolumn_id + "\"\n";
        str_contents += "\t  }";

        return str_contents;
    };

}