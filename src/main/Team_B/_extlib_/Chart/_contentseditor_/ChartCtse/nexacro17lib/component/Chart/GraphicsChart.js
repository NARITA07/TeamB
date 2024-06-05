//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2017 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro17-public-license-readme-1.0.html	
//
//==============================================================================

if (!nexacro._ChartGraphicsLib)
{
    nexacro._ChartGraphicsLib = {};

    nexacro._ChartGraphicsLib._ALPHA_CHAR_CODES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102];
    nexacro._ChartGraphicsLib._toString = (Object.prototype.toString);

    nexacro._ChartGraphicsLib.isEmpty = function (value)
    {
        // null, undefined ==> true
        if (value == null) return true;

        // String, Array ==> length == 0
        if (nexacro._isString(value) || nexacro._ChartGraphicsLib.isArray(value))
        {
            return value.length == 0 ? true : false;
        }
        else if (nexacro._ChartGraphicsLib.isObject(value))
        {
            for (var p in value)
            {
                if (value.hasOwnProperty(p))
                {
                    return false;
                }
            }
            return true;
        }

        return false;
    };

    nexacro._ChartGraphicsLib.isBoolean = function (value)
    {
        return typeof value == 'boolean';
    };

    if (Array.isArray)
    {
        nexacro._ChartGraphicsLib.isArray = function (value)
        {
            return Array.isArray(value);
        };
    }
    else
    {
        nexacro._ChartGraphicsLib.isArray = function (value)
        {
            return Object.prototype.toString.call(value) === '[object Array]';
        };
    }

    nexacro._ChartGraphicsLib.isObject = function (value)
    {
        if (value === null || value === undefined) return false;

        // nexacro Component
        if (nexacro._ChartGraphicsLib.isXComponent(value)) return false;

        // nexacro Object (e.g. Dataset)
        if (value instanceof nexacro.Object) return false;

        return typeof value == "object" &&
			   'constructor' in value &&
			   value.constructor === Object;
    };

    nexacro._ChartGraphicsLib.isNumber = function (value)
    {
        return typeof value === 'number' && isFinite(value);
    };

    nexacro._ChartGraphicsLib.isFunction = function (value)
    {
        return nexacro._ChartGraphicsLib._toString.call(value) === '[object Function]';
    };

    nexacro._ChartGraphicsLib.isXComponent = function (value)
    {
        if (value === null || value === undefined) return false;

        return value instanceof nexacro.Component;
    };

    nexacro._ChartGraphicsLib.getUniqueId = function (prefix, separator)
    {
        if (nexacro._ChartGraphicsLib.isEmpty(prefix)) prefix = "";
        if (nexacro._ChartGraphicsLib.isEmpty(separator))
        {
            separator = 45;
        } else
        {
            separator = separator.charCodeAt(0);
        }

        var charcode = nexacro._ChartGraphicsLib._ALPHA_CHAR_CODES,
			math = Math;
        var seq = 0;
        var seq0;
        var tmpArray = new Array(36);
        var idx = -1;

        while (seq < 8)
        {
            tmpArray[++idx] = charcode[math.random() * 16 | 0];
            seq++;
        }
        seq = 0;
        while (seq < 3)
        {
            tmpArray[++idx] = separator;//45 => "-", 95=> "_"
            seq0 = 0;
            while (seq0 < 4)
            {
                tmpArray[++idx] = charcode[math.random() * 16 | 0];
                seq0++;
            }
            seq++;
        }
        tmpArray[++idx] = separator; //45 => "-", 95=> "_"
        // 끝에서 12자리을 random으로 처리하면 속도가 좀더 개선됨(10만건 생성 약 0.8초 ==> chrome)
        /*
		seq = 0;
		while (seq < 12) 
		{
			tmpArray[++idx] = charcode[math.random() * 16 | 0];
			seq++;
		}
		return prefix + String.fromCharCode.apply(null, tmpArray);
		*/
        // 원래 로직은 끝에서 12자리을 현재 time 구한 8자리 와 random 4자리를 조합한 처리임.(10만건 생성 약 1.3초 ==> chrome)
        /**/
        var tmpStr = (new Date()).getTime();
        tmpStr = ("0000000" + tmpStr.toString(16)).substr(-8);
        seq = 0;
        while (seq < 8)
        {
            tmpArray[++idx] = tmpStr.charCodeAt(seq);
            seq++;
        }
        seq = 0;
        while (seq < 4)
        {
            tmpArray[++idx] = charcode[math.random() * 16 | 0];
            seq++;
        }
        return prefix + String.fromCharCode.apply(null, tmpArray);
    };

    if (nexacro._Browser == "Runtime")
    {
        nexacro._ChartGraphicsLib._getLines = function (nexacroFont, txt, wordwrap, maxWidth)
        {
            var lines;
            if (wordwrap)
            {
                var sz;
                var fsz = nexacroFont.size;
                var sizeForOneChar = (sz >= 0 ? nexacro._convertPtToPx(fsz) : Math.abs(fsz));
                if (sizeForOneChar >= maxWidth)
                {
                    return txt.split("");
                }

                sz = nexacro.__getTextSize(txt, nexacroFont, "none");
                if (sz[0] > maxWidth)
                {
                    lines = [];
                    var tmpLines = txt.split("\n"),
						line, //words, wordSize,
						lineSize;	//testLine = "",
						//reallines = [];
                    for (var i = 0, len = tmpLines.length ; i < len ; i++)
                    {
                        line = tmpLines[i];
                        lineSize = nexacro.__getTextSize(line, nexacroFont, "none");
                        if (lineSize[0] > maxWidth)
                        {
                            lines = lines.concat(this._fragmentText(nexacroFont, line, maxWidth));
                        }
                        else
                        {
                            lines.push(line);
                        }
                    }
                }
                else
                {
                    lines = txt.split("\n");
                }
            }
            else
            {
                lines = txt.split("\n");
            }
            return lines;
        };

        nexacro._ChartGraphicsLib._fragmentText = function (nexacroFont, text, maxWidth)
        {
            var words = text.split(' '),
				lines = [],
                tmpChars = "",
				tmpstr = "",
				tmpLine = "",
				tmpLine2 = "",
				c = 0,
				clen,
				line = "";

            for (var n = 0, len = words.length ; n < len ; n++)
            {
                tmpLine = line + words[n] + ' ';
                if (n > 0 && (nexacro.__getTextSize(tmpLine, nexacroFont, "none"))[0] > maxWidth)
                {
                    tmpChars = line.split(""); 
                    for (c = 0, clen = tmpChars.length ; c < clen ; c++)
                    {
                        tmpLine2 = tmpstr + tmpChars[c];
                        if (c > 0 && (nexacro.__getTextSize(tmpLine2, nexacroFont, "none"))[0] > maxWidth)
                        {
                            lines.push(tmpstr);
                            tmpstr = tmpChars[c];
                        }
                        else
                        {
                            tmpstr = tmpLine2;
                        }
                    }
                    line = tmpstr + words[n] + ' ';
                }
                else
                {
                    line = tmpLine;
                }
            }
            if ((nexacro.__getTextSize(line, nexacroFont, "none"))[0] > maxWidth)
            {
                tmpChars = line.split(""); 
				tmpstr = "";
                for (c = 0, clen = tmpChars.length ; c < clen ; c++)
                {
                    tmpLine2 = tmpstr + tmpChars[c];
                    if (c > 0 && (nexacro.__getTextSize(tmpLine2, nexacroFont, "none"))[0] > maxWidth)
                    {
                        lines.push(tmpstr);
                        tmpstr = tmpChars[c];
                    }
                    else
                    {
                        tmpstr = tmpLine2;
                    }
                }
                if (tmpstr.length)
                {
                    lines.push(tmpstr);
                }
            }
            else if (line.length)
            {
                lines.push(line);
            }
            return lines;
        };

        nexacro._ChartGraphicsLib._getTextSize = function (nexacroFont, lines, fontHeight)
        {
            var w = 0,
				len = lines.length,
				h = fontHeight * len;

            for (var i = 0 ; i < len ; i++)
            {
                w = Math.max(w, (nexacro.__getTextSize(lines[i], nexacroFont, "none"))[0]);
            }
            return [w, h];
        };
    }
    else if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
    {
        // TODO - 미지원 경고메세지 추가
    }
    else
    {
        nexacro._ChartGraphicsLib._getDefaultCanvas = function ()
        {
            var defaultCanvas = nexacro._ChartGraphicsLib._graphicsDefaultCanvas;
            if (!defaultCanvas)
            {
                var _doc = nexacro._managerFrameDoc;
                defaultCanvas = _doc.createElement("canvas");
                defaultCanvas.width = 1;
                defaultCanvas.height = 1;
                _doc.body.appendChild(defaultCanvas);
                nexacro._ChartGraphicsLib._graphicsDefaultCanvas = defaultCanvas;
            }
            return defaultCanvas;
        };

        nexacro._ChartGraphicsLib._getLines = function (nexacroFont, txt, wordwrap, maxWidth)
        {
            var canvas = nexacro._ChartGraphicsLib._getDefaultCanvas(),
				ctx = canvas.getContext('2d');
            var lines,
				sz,
				i,
				len;
				//txtsWidth = 0;

            if (wordwrap)
            {
                sz = nexacroFont._size;
                var sizeForOneChar = (sz >= 0 ? nexacro._convertPtToPx(sz) : Math.abs(sz));
                if (sizeForOneChar >= maxWidth)
                {
                    return txt.split("");
                }
                ctx.font = nexacroFont._sysvalue;
                sz = ctx.measureText(txt);
                if (sz.width > maxWidth)
                {
                    lines = [];
                    var tmpLines = txt.split("\n"),
						line, //words, wordSize,
						lineSize;	//testLine = "",
						//reallines = [];
                    for (i = 0, len = tmpLines.length ; i < len ; i++)
                    {
                        line = tmpLines[i];
                        lineSize = ctx.measureText(line);
                        if (lineSize.width > maxWidth)
                        {
                            lines = lines.concat(nexacro._ChartGraphicsLib._fragmentText(ctx, line, maxWidth));
                        }
                        else
                        {
                            lines.push(line);
                        }
                    }
                }
                else
                {
                    lines = txt.split("\n");
                }
            }
            else
            {
                lines = txt.split("\n");
            }
            return lines;
        };

        nexacro._ChartGraphicsLib._fragmentText = function (ctx, text, maxWidth)
        {
            var words = text.split(' '),
				lines = [],
                tmpChars = "",
				tmpLine = "",
				tmpstr = "",
				tmpLine2 = "",
				c = 0,
				clen = 0,
				line = "";

            for (var n = 0, len = words.length ; n < len ; n++)
            {
                tmpLine = line + words[n] + ' ';
                if (n > 0 && ctx.measureText(tmpLine).width > maxWidth)
                {
                    tmpChars = line.split("");
                    for (c = 0, clen = tmpChars.length ; c < clen ; c++)
                    {
                        tmpLine2 = tmpstr + tmpChars[c];
                        if (c > 0 && ctx.measureText(tmpLine2).width > maxWidth)
                        {
                            lines.push(tmpstr);
                            tmpstr = tmpChars[c];
                        }
                        else
                        {
                            tmpstr = tmpLine2;
                        }
                    }
                    line = tmpstr + words[n] + ' ';
                }
                else
                {
                    line = tmpLine;
                }
            }
            if (ctx.measureText(line).width > maxWidth)
            {
                tmpChars = line.split(""); 
				tmpstr = "";
                for (c = 0, clen = tmpChars.length ; c < clen ; c++)
                {
                    tmpLine2 = tmpstr + tmpChars[c];
                    if (c > 0 && ctx.measureText(tmpLine2).width > maxWidth)
                    {
                        lines.push(tmpstr);
                        tmpstr = tmpChars[c];
                    }
                    else
                    {
                        tmpstr = tmpLine2;
                    }
                }
                if (tmpstr.length)
                {
                    lines.push(tmpstr);
                }
            }
            else if (line.length)
            {
                lines.push(line);
            }
            return lines;
        };

        nexacro._ChartGraphicsLib._getTextSize = function (nexacroFont, lines, fontHeight)
        {
            var canvas = nexacro._ChartGraphicsLib._getDefaultCanvas(),
				ctx = canvas.getContext('2d');

            ctx.font = nexacroFont._sysvalue;
            var w = 0,
				len = lines.length,
				h = fontHeight * len;
            for (var i = 0 ; i < len ; i++)
            {
                w = Math.max(w, ctx.measureText(lines[i]).width);
            }
            return [w, h];
        };
    }
}

if (!nexacro._ChartGraphicsLibArray)
{
    nexacro._ChartGraphicsLibArray = {};

    nexacro._ChartGraphicsLibArray.forEach = function (array, func, scope)
    {
        var i, len = array.length;

        for (i = 0; i < len; i++)
        {
            func.call(scope, array[i], i, array);
        }
    };

    nexacro._ChartGraphicsLibArray.Each = function (array, func, scope, reverse)
    {
        var i, len = array.length;

        if (reverse !== true)
        {
            for (i = 0; i < len; i++)
            {
                if (func.call(scope || array[i], array[i], i, array) === false)
                {
                    return i;
                }
            }
        }
        else
        {
            for (i = len - 1; i > -1; i--)
            {
                if (func.call(scope || array[i], array[i], i, array) === false)
                {
                    return i;
                }
            }
        }

        return true;
    };

    nexacro._ChartGraphicsLibArray.arrayCopy = function (src, srcPos, dest, destPos, length)
    {
        if (!length) return;
        // copy src to dest from index srcPos to index destPos of length recursivly on objects
        var cnt = length + srcPos;
		var i;
		var j;
        if (src == dest)
        {
            src = src.slice(srcPos, cnt);
            cnt = src.length;
            for (i = 0, j = destPos; i < cnt; i++, j++)
            {
                dest[j] = src[i];
            }
        }
        else
        {
            for (i = srcPos, j = destPos; i < cnt; i++, j++)
            {
                dest[j] = src[i];
            }
        }
    };

    nexacro._ChartGraphicsLibArray.indexOf = function (array, item, from, strict)
    {
        var len = array.length;
        if (from == null) 
		{
			from = 0;
		}
        var tostrict = !!strict;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0)
        {
            from += len;
        }

        if (tostrict)
        {
            for (; from < len; from++)
            {
                if (array[from] === item)
                {
                    return from;
                }
            }
        }
        else
        {
            for (; from < len; from++)
            {
                if (array[from] == item)
                {
                    return from;
                }
            }
        }

        return -1;
    };

    nexacro._ChartGraphicsLibArray.removeAt = function (array, index)
    {
        array[index] = null;
        array.splice(index, 1);
    };

    nexacro._ChartGraphicsLibArray.remove = function (array, item)
    {
        var index = nexacro._ChartGraphicsLibArray.indexOf(array, item);

        if (index !== -1)
        {
            array[index] = null;
            array.splice(index, 1);
        }
    };

    nexacro._ChartGraphicsLibArray.clean = function (array)
    {
        var results = [], i = 0,
			len = array.length, item;

        for (; i < len; i++)
        {
            item = array[i];

            if (!nexacro._ChartGraphicsLib.isEmpty(item))
            {
                results.push(item);
            }
        }

        return results;
    };

    nexacro._ChartGraphicsLibArray.filter = function (array, func, scope)
    {
        if (!func || !(typeof func === "function"))
        {
            return;
        }

        var results = [],
			i = 0,
			len = array.length;

        for (; i < len; i++)
        {
            if (func.call(scope, array[i], i, array))
            {
                results.push(array[i]);
            }
        }

        return results;
    };

    nexacro._ChartGraphicsLibArray.lastIndexOfProp = function (array, prop, item, from, strict_)
    {
        var i, 
            obj,
			strict = strict_ || false,
			propValue;

        if (from == null)
        {
            from = array.length - 1;
        }
        else if (from < 0)
        {
            from = Math.max(0, array.length + from);
        }
		
		if (strict)
		{
			// none
		}
		
		for (i = from; i >= 0; i--)
		{
			if (i in array && array[i])
			{
				obj = array[i];
				propValue = obj[prop];

				if (propValue === item)
				{
					return i;
				}
			}
		}		

		/*
        if (strict)
        {
            for (i = from; i >= 0; i--)
            {
                if (i in array && array[i])
                {
                    obj = array[i],
					propValue = obj[prop];

                    if (propValue === item)
                    {
                        return i;
                    }
                }
            }
        }
        else
        {
            for (i = from; i >= 0; i--)
            {
                if (i in array && array[i])
                {
                    obj = array[i],
					propValue = obj[prop];

                    if (propValue == item)
                    {
                        return i;
                    }
                }
            }
        }
		*/

        return -1;
    };

    nexacro._ChartGraphicsLibArray.indexOfProp = function (array, prop, item, from_, strict_)
    {
        var len = array.length,
			from = Number(from_) || 0,
			strict = strict_ || false,
			obj, propValue;

        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0)
        {
            from += len;
        }
		
        if (strict)
        {
			// none
		}			
		
		for (; from < len; from++)
		{
			if (from in array && array[from])
			{
				obj = array[from];
				propValue = obj[prop];

				if (propValue === item)
				{
					return from;
				}
			}
		}		

		/*
        if (strict)
        {
            for (; from < len; from++)
            {
                if (from in array && array[from])
                {
                    obj = array[from],
					propValue = obj[prop];

                    if (propValue === item)
                    {
                        return from;
                    }
                }
            }
        }
        else
        {
            for (; from < len; from++)
            {
                if (from in array && array[from])
                {
                    obj = array[from],
					propValue = obj[prop];

                    if (propValue == item)
                    {
                        return from;
                    }
                }
            }
        }
		*/

        return -1;
    };

    nexacro._ChartGraphicsLibArray.move = function (array, from, to)
    {
        var i, tmp;
        from = parseInt(from, 10);
        to = parseInt(to, 10);

        if (from !== to &&
			0 <= from && from <= array.length &&
			0 <= to && to <= array.length)
        {

            tmp = array[from];
            if (from < to)
            {
                for (i = from; i < to; i++)
                {
                    array[i] = array[i + 1];
                }
            }
            else
            {
                for (i = from; i > to; i--)
                {
                    array[i] = array[i - 1];
                }
            }

            array[to] = tmp;
            return true;
        }

        return false;
    };

    nexacro._ChartGraphicsLibArray.map = function (array, func, scope)
    {
        if (!func || !(typeof func === "function"))
        {
            return;
        }

        var results = [],
			i = 0, len = array.length;

        for (; i < len; i++)
        {
            results[i] = func.call(scope, array[i], i, array);
        }

        return results;
    };

    nexacro._ChartGraphicsLibArray.max = function (array)
    {
        return Math.max.apply(Math, array);
    };

    nexacro._ChartGraphicsLibArray.min = function (array)
    {
        return Math.min.apply(Math, array);
    };
}

if (!nexacro._ChartGraphicsLibObject)
{
    nexacro._ChartGraphicsLibObject = {};

    nexacro._ChartGraphicsLibObject.Each = function (object, func, scope_)
    {
        var p,
			scope = scope_ || object;
        for (p in object)
        {
            if (object.hasOwnProperty(p))
            {
                if (func.call(scope, p, object[p], object) === false)
                {
                    return;
                }
            }
        }
    };

    nexacro._ChartGraphicsLibObject.merge = function (tarobject)
    {
        var i = 1,
			func, scope,
			ln = arguments.length,
			o, prop, val;

        if (!tarobject) return;

        if (typeof arguments[ln - 1] == "function")
        {
            ln = ln - 1;
            func = arguments[ln];
        }
        else if (typeof arguments[ln - 2] == "function")
        {
            ln = ln - 2;
            func = arguments[ln];
            scope = arguments[ln + 1] || this;
        }

        if (func)
        {
            for (; i < ln ; i++) //1
            {
                o = arguments[i];
                for (prop in o)
                {
                    if (o.hasOwnProperty(prop))
                    {
                        val = o[prop];
                        if (func.call(scope, prop, val, tarobject) !== false)
                        {
                            tarobject[prop] = val;
                        }
                    }
                }
            }
        }
        else
        {
            for (; i < ln ; i++) //1
            {
                o = arguments[i];
                for (prop in o)
                {
                    if (o.hasOwnProperty(prop))
                    {
                        val = o[prop];
                        if (!tarobject[prop])
                        {
                            tarobject[prop] = val;
                        }
                    }
                }
            }
        }
        return tarobject;
    };

    nexacro._ChartGraphicsLibObject.copyProperties = function (tarobject, srcobject)
    {
        if (tarobject && srcobject)
        {
            var p, value;

            for (p in srcobject)
            {
                if (srcobject.hasOwnProperty(p))
                {
                    value = srcobject[p];
                    tarobject[p] = value;
                }
            }
        }
    };
}

if (!nexacro._ChartGraphicsLibString)
{
    nexacro._ChartGraphicsLibString = {};

    nexacro._ChartGraphicsLibString.capitalize = function (str)
    {
        //if ( !str ) Eco.Logger.error({message:"str is null!", stack: true});
        return str.replace(/\b[a-z]/g, function (match)
        {
            return match.toUpperCase();
        });
    };

    nexacro._ChartGraphicsLibString.removeStr = function (source, target, direction, opt_ignoreCase)
    {
        direction = direction || "left";
        if (opt_ignoreCase !== false) opt_ignoreCase = true;

        var tempSource, tempTarget, pos;
        //var sourceLen = source.length;
        var targetLen = target.length;

        tempSource = source;
        tempTarget = target;

        if (!opt_ignoreCase)
        {
            tempSource = source.toLowerCase();
            tempTarget = target.toLowerCase();
        }

        //왼쪽부터 검색
        if (direction == "left")
        {
            pos = tempSource.indexOf(tempTarget);
        }
        else if (direction == "right")
        {
            pos = tempSource.lastIndexOf(tempTarget);
        }
        else
        {
            return;
        }

        if (pos < 0)
        {
            return source;
        }
        else if (tempSource == tempTarget)
        {
            return "";
        }
        else if (pos == 0)
        {
            return tempSource.substr(targetLen);
        }
        else if (pos > 0)
        {
            return tempSource.substr(0, pos) + tempSource.substr(pos + targetLen);
        }
    };
}

if (!nexacro._ChartGraphicsMathUtil)
{
    nexacro._ChartGraphicsMathUtil = {};

    nexacro._ChartGraphicsMathUtil._abscissas = [
		[0.5773502691896257645091488],
		[0, 0.7745966692414833770358531],
		[0.3399810435848562648026658, 0.8611363115940525752239465],
		[0, 0.5384693101056830910363144, 0.9061798459386639927976269],
		[0.2386191860831969086305017, 0.6612093864662645136613996, 0.9324695142031520278123016],
		[0, 0.4058451513773971669066064, 0.7415311855993944398638648, 0.9491079123427585245261897],
		[0.1834346424956498049394761, 0.5255324099163289858177390, 0.7966664774136267395915539, 0.9602898564975362316835609],
		[0, 0.3242534234038089290385380, 0.6133714327005903973087020, 0.8360311073266357942994298, 0.9681602395076260898355762],
		[0.1488743389816312108848260, 0.4333953941292471907992659, 0.6794095682990244062343274, 0.8650633666889845107320967, 0.9739065285171717200779640],
		[0, 0.2695431559523449723315320, 0.5190961292068118159257257, 0.7301520055740493240934163, 0.8870625997680952990751578, 0.9782286581460569928039380],
		[0.1252334085114689154724414, 0.3678314989981801937526915, 0.5873179542866174472967024, 0.7699026741943046870368938, 0.9041172563704748566784659, 0.9815606342467192506905491],
		[0, 0.2304583159551347940655281, 0.4484927510364468528779129, 0.6423493394403402206439846, 0.8015780907333099127942065, 0.9175983992229779652065478, 0.9841830547185881494728294],
		[0.1080549487073436620662447, 0.3191123689278897604356718, 0.5152486363581540919652907, 0.6872929048116854701480198, 0.8272013150697649931897947, 0.9284348836635735173363911, 0.9862838086968123388415973],
		[0, 0.2011940939974345223006283, 0.3941513470775633698972074, 0.5709721726085388475372267, 0.7244177313601700474161861, 0.8482065834104272162006483, 0.9372733924007059043077589, 0.9879925180204854284895657],
		[0.0950125098376374401853193, 0.2816035507792589132304605, 0.4580167776572273863424194, 0.6178762444026437484466718, 0.7554044083550030338951012, 0.8656312023878317438804679, 0.9445750230732325760779884, 0.9894009349916499325961542]
    ];

    nexacro._ChartGraphicsMathUtil._weights = [
		[1],
		[0.8888888888888888888888889, 0.5555555555555555555555556],
		[0.6521451548625461426269361, 0.3478548451374538573730639],
		[0.5688888888888888888888889, 0.4786286704993664680412915, 0.2369268850561890875142640],
		[0.4679139345726910473898703, 0.3607615730481386075698335, 0.1713244923791703450402961],
		[0.4179591836734693877551020, 0.3818300505051189449503698, 0.2797053914892766679014678, 0.1294849661688696932706114],
		[0.3626837833783619829651504, 0.3137066458778872873379622, 0.2223810344533744705443560, 0.1012285362903762591525314],
		[0.3302393550012597631645251, 0.3123470770400028400686304, 0.2606106964029354623187429, 0.1806481606948574040584720, 0.0812743883615744119718922],
		[0.2955242247147528701738930, 0.2692667193099963550912269, 0.2190863625159820439955349, 0.1494513491505805931457763, 0.0666713443086881375935688],
		[0.2729250867779006307144835, 0.2628045445102466621806889, 0.2331937645919904799185237, 0.1862902109277342514260976, 0.1255803694649046246346943, 0.0556685671161736664827537],
		[0.2491470458134027850005624, 0.2334925365383548087608499, 0.2031674267230659217490645, 0.1600783285433462263346525, 0.1069393259953184309602547, 0.0471753363865118271946160],
		[0.2325515532308739101945895, 0.2262831802628972384120902, 0.2078160475368885023125232, 0.1781459807619457382800467, 0.1388735102197872384636018, 0.0921214998377284479144218, 0.0404840047653158795200216],
		[0.2152638534631577901958764, 0.2051984637212956039659241, 0.1855383974779378137417166, 0.1572031671581935345696019, 0.1215185706879031846894148, 0.0801580871597602098056333, 0.0351194603317518630318329],
		[0.2025782419255612728806202, 0.1984314853271115764561183, 0.1861610000155622110268006, 0.1662692058169939335532009, 0.1395706779261543144478048, 0.1071592204671719350118695, 0.0703660474881081247092674, 0.0307532419961172683546284],
		[0.1894506104550684962853967, 0.1826034150449235888667637, 0.1691565193950025381893121, 0.1495959888165767320815017, 0.1246289712555338720524763, 0.0951585116824927848099251, 0.0622535239386478928628438, 0.0271524594117540948517806]
    ];

    nexacro._ChartGraphicsMathUtil._TOLERANCE = 10e-6;
    nexacro._ChartGraphicsMathUtil._EPSILON = 10e-12;
    nexacro._ChartGraphicsMathUtil._KAPPA = 4 * (Math.sqrt(2) - 1) / 3;

    nexacro._ChartGraphicsMathUtil.isZero = function (val)
    {
        return Math.abs(val) <= this._EPSILON;
    };

    nexacro._ChartGraphicsMathUtil.integrate = function (f, a, b, n)
    {
        var x = this._abscissas[n - 2],
			w = this._weights[n - 2],
			A = 0.5 * (b - a),
			B = A + a,
			i = 0,
			m = (n + 1) >> 1,
			sum = n & 1 ? w[i++] * f(B) : 0;

        while (i < m)
        {
            var Ax = A * x[i];
            sum += w[i++] * (f(B + Ax) + f(B - Ax));
        }
        return A * sum;
    };

    nexacro._ChartGraphicsMathUtil.findRoot = function (f, df, x, a, b, n, tolerance)
    {
        //var abs = Math.abs;
        for (var i = 0; i < n; i++)
        {
            var fx = f(x),
				dx = fx / df(x);

            if (Math.abs(dx) < tolerance)
                return x;

            var nx = x - dx;
            if (fx > 0)
            {
                b = x;
                x = nx <= a ? 0.5 * (a + b) : nx;
            }
            else
            {
                a = x;
                x = nx >= b ? 0.5 * (a + b) : nx;
            }
        }
    };

    nexacro._ChartGraphicsMathUtil.solveQuadratic = function (a, b, c, roots)
    {
        var epsilon = this._EPSILON;
			//abs = Math.abs;
        if (Math.abs(a) < epsilon)
        {
            if (Math.abs(b) >= epsilon)
            {
                roots[0] = -c / b;
                return 1;
            }
            return Math.abs(c) < epsilon ? -1 : 0;
        }

        var q = b * b - 4 * a * c;

        if (q < 0) return 0;
        q = Math.sqrt(q);
        a *= 2;
        var n = 0;
        roots[n++] = (-b - q) / a;
        if (q > 0) roots[n++] = (-b + q) / a;
        return n;
    };

    nexacro._ChartGraphicsMathUtil.solveCubic = function (a, b, c, d, roots)
    {
        var epsilon = this._EPSILON,
			//abs = Math.abs,
			//sqrt = Math.sqrt,
			//pow = Math.pow,
			//cos = Math.cos,
			sqp,
			snq,
			phi,
			t,
			o;
			//PI = Math.PI;

        if (Math.abs(a) < epsilon)
        {
            return this.solveQuadratic(b, c, d, roots);
        }
        b /= a;
        c /= a;
        d /= a;
        var bb = b * b,
			p = (bb - 3 * c) / 9,
			q = (2 * bb * b - 9 * b * c + 27 * d) / 54,
			ppp = p * p * p,
			D = q * q - ppp;
        b /= 3;
        if (Math.abs(D) < epsilon)
        {
            if (Math.abs(q) < epsilon)
            {
                roots[0] = -b;
                return 1;
            }
            sqp = Math.sqrt(p);
			snq = q > 0 ? 1 : -1;
            roots[0] = -snq * 2 * sqp - b;
            roots[1] = snq * sqp - b;
            return 2;
        }
        if (D < 0)
        {
            sqp = Math.sqrt(p);
			phi = Math.acos(q / (sqp * sqp * sqp)) / 3;
			t = -2 * sqp;
			o = 2 * Math.PI / 3;
            roots[0] = t * Math.cos(phi) - b;
            roots[1] = t * Math.cos(phi + o) - b;
            roots[2] = t * Math.cos(phi - o) - b;
            return 3;
        }
        var A = (q > 0 ? -1 : 1) * Math.pow(Math.abs(q) + Math.sqrt(D), 1 / 3);
        roots[0] = A + p / A - b;
        return 1;
    };

    nexacro._ChartGraphicsMathUtil.getDistLineSegAndPoint = function (x1, y1, x2, y2, px, py)
    {
        x2 -= x1;
        y2 -= y1;
        px -= x1;
        py -= y1;

        var dotprod = px * x2 + py * y2;
        var projlenSq;

        if (dotprod <= 0.0)
        {
            projlenSq = 0.0;
        }
        else
        {
            px = x2 - px;
            py = y2 - py;
            dotprod = px * x2 + py * y2;

            if (dotprod <= 0.0)
            {
                projlenSq = 0.0;
            }
            else
            {
                projlenSq = dotprod * dotprod / (x2 * x2 + y2 * y2);
            }
        }

        var lenSq = px * px + py * py - projlenSq;
        if (lenSq < 0)
        {
            lenSq = 0;
        }
        return lenSq;
    };

    nexacro._ChartGraphicsMathUtil.getDirLineSegAndPoint = function (x1, y1, x2, y2, px, py)
    {
        x2 -= x1;
        y2 -= y1;
        px -= x1;
        py -= y1;
        var dir = px * y2 - py * x2;
        if (dir == 0.0)
        {
            dir = px * x2 + py * y2;
            if (dir > 0.0)
            {
                px -= x2;
                py -= y2;
                dir = px * x2 + py * y2;

                if (dir < 0.0)
                {
                    dir = 0.0;
                }
            }
        }
        return (dir < 0.0) ? -1 : ((dir > 0.0) ? 1 : 0);
    };
}

if (!nexacro._ChartGraphicsClassUtils)
{
    nexacro._ChartGraphicsClassUtils = {};

    nexacro._ChartGraphicsClassUtils._fmtPercision = 5;
    nexacro._ChartGraphicsClassUtils._fmtMultiplier = Math.pow(10, 5);

    nexacro._ChartGraphicsClassUtils.fmtNumber = function (val)
    {
        return (Math.round(val * nexacro._ChartGraphicsClassUtils._fmtMultiplier) / nexacro._ChartGraphicsClassUtils._fmtMultiplier) + "";
    };

    nexacro._ChartGraphicsClassUtils.fmtPoint = function (val, separator)
    {
        return nexacro._ChartGraphicsClassUtils.fmtNumber(val.x) + (separator || ',') + nexacro._ChartGraphicsClassUtils.fmtNumber(val.y);
    };

    nexacro._ChartGraphicsClassUtils.fmtSize = function (val, separator)
    {
        return nexacro._ChartGraphicsClassUtils.fmtNumber(val.width) + (separator || ',') + nexacro._ChartGraphicsClassUtils.fmtNumber(val.height);
    };

    nexacro._ChartGraphicsClassUtils.fmtRect = function (val, separator)
    {
        return nexacro._ChartGraphicsClassUtils.fmtPoint(val, separator) + (separator || ',') + nexacro._ChartGraphicsClassUtils.fmtSize(val, separator);
    };
}

if (!nexacro._ChartGraphicsHashMap)
{
    nexacro._ChartGraphicsHashMap = function ()
    {
        this._size = 0;
        this._map = {};
    };

    var _pGraphicsHashMap = nexacro._createPrototype(nexacro.Object, nexacro._ChartGraphicsHashMap);
    nexacro._ChartGraphicsHashMap.prototype = _pGraphicsHashMap;

    nexacro._ChartGraphicsHashMap._hashkeypool = {};
    nexacro._ChartGraphicsHashMap._simpleToString = function ()
    {
        return this._hashKey;
    };
    nexacro._ChartGraphicsHashMap.getHashKey = function (prefix, obj)
    {
        var key;
        if (obj._hashKey == null)
        {
            var nextVal = this._hashkeypool[prefix];
            if (nextVal == null)
            {
                nextVal = 0;
                this._hashkeypool[prefix] = nextVal;
            }
            else
            {
                nextVal++;
                this._hashkeypool[prefix] = nextVal;
            }
            key = prefix + nextVal;
            obj._hashKey = key;
        }
        else
        {
            key = obj._hashKey;
        }
        return key;
    };
    nexacro._ChartGraphicsHashMap.makeHashKey = function (obj, toStringFn)
    {
        obj._hashKey = nexacro._ChartGraphicsLib.getUniqueId();
        obj.toString = toStringFn || this._simpleToString;
    };
    nexacro._ChartGraphicsHashMap.makeHashKeyForArray = function (arr, toStringFn_)
    {
        var getUniFn = nexacro._ChartGraphicsLib.getUniqueId,
		i,
		len = arr.length,
        toStringFn = toStringFn_ || this._simpleToString;

        for (i = 0; i < len ; i++)
        {
            arr[i]._hashKey = getUniFn();
            arr[i].toString = toStringFn;
        }
    };

    _pGraphicsHashMap.put = function (key, value)
    {
        if (this.containsKey(key)) return false;
        var map = this._map;
        this._size++;
        return map[key] = value;
    };

    _pGraphicsHashMap.get = function (key)
    {
        return this._map[key];
    };

    _pGraphicsHashMap.remove = function (key)
    {
        if (!this.containsKey(key)) return false;
        var map = this._map;
        this._size--;
        delete map[key];
        return true;
    };

    _pGraphicsHashMap.containsKey = function (key)
    {
        return key in this._map;
    };

    _pGraphicsHashMap.getSize = function ()
    {
        return this._size;
    };

    _pGraphicsHashMap.clear = function ()
    {
        this._size = 0;
        this._map = {};
    };

    _pGraphicsHashMap.fromDataset = function (ds, keyColumn, valueColumn, bClear)
    {
		var i,
			len = ds.getRowCount() || 0;
        if (bClear !== false)
        {
            this.clear();
        }
        if (valueColumn)
        {
            for (i = 0; i < len ; i++)
            {
                this.put(ds.getColumn(i, keyColumn), ds.getColumn(i, valueColumn));
            }
        }
        else
        {
            for (i = 0; i < len ; i++)
            {
                this.put(ds.getColumn(i, keyColumn), i);
            }
        }
    };

    _pGraphicsHashMap.toArray = function (flag)
    {
        var arr = [];
        if (flag == null) flag = 0;
        if (flag == 0) // getValues
        {
            this.forEach(function (key) { arr.push(key); });
        }
        else if (flag == 1) // getKeys
        {
            this.forEach(function (key, value) { arr.push(value); });
        }
        else
        {
            this.forEach(function (key, value) { arr.push({ key: key, value: value }); });
        }
        return arr;
    };

    _pGraphicsHashMap.forEach = function (f)
    {
        var map = this._map;
        for (var key in map)
        {
            f.call(this, key, map[key]);
        }
    };

    _pGraphicsHashMap._debug = function (bConsole)
    {
        if (bConsole)
        {
            this.forEach(function (key, value)
            {
                console.log("key: ", key, "value: ", value);
            });
        }
        else
        {
            this.forEach(function (key, value)
            {
                trace(key + "--->" + value);
            });
        }
    };

}

if (!nexacro._ChartGraphicsMatrix)
{
    nexacro._ChartGraphicsMatrix = function (arg)
    {
        var count = arguments.length;
			//ok = true;

        if (count == 6)
        {
            this.set_scaleX(arguments[0]);
            this.set_shearY(arguments[2]);
            this.set_shearX(arguments[1]);
            this.set_scaleY(arguments[3]);
            this.set_translateX(arguments[4]);
            this.set_translateY(arguments[5]);
            // this.setProperties(arguments);
        }
        if (count == 1)
        {
            if (arg instanceof nexacro._ChartGraphicsMatrix)
            {
                // this.set(arg._scaleX, arg._shearX, arg._scaleY, arg._shearY, arg._translateX, arg._translateY);
                this.set(arg._scaleX, arg._shearX, arg._shearY, arg._scaleY, arg._translateX, arg._translateY);
            }
            else if (nexacro._ChartGraphicsLib.isArray(arg))
            {
                this.set_scaleX(arguments[0]);
                this.set_shearY(arguments[2]);
                this.set_shearX(arguments[1]);
                this.set_scaleY(arguments[3]);
                this.set_translateX(arguments[4]);
                this.set_translateY(arguments[5]);
                // this.setProperties(arg);
            }
            else
            {
                //ok = false;
            }

            //if (!ok)
            //{
                // Eco.Logger.error('Unsupported matrix parameters');
            //}
        }
        else if (count == 0)
        {
            this.reset();
        }
        else
        {
            //ok = false;
        }
    };

    var _pGraphicsMatrix = nexacro._createPrototype(nexacro.Object, nexacro._ChartGraphicsMatrix);
    nexacro._ChartGraphicsMatrix.prototype = _pGraphicsMatrix;

    nexacro._ChartGraphicsMatrix.DEGTORAD = Math.PI / 180;
    nexacro._ChartGraphicsMatrix.RADTODEG = 180 / Math.PI;

    _pGraphicsMatrix.scaleX = 1;
    _pGraphicsMatrix.shearY = 0;
    _pGraphicsMatrix.shearX = 0;
    _pGraphicsMatrix.scaleY = 1;
    _pGraphicsMatrix.translateX = 0;
    _pGraphicsMatrix.translateY = 0;

    _pGraphicsMatrix._scaleX = 1;
    _pGraphicsMatrix._shearY = 0;
    _pGraphicsMatrix._shearX = 0;
    _pGraphicsMatrix._scaleY = 1;
    _pGraphicsMatrix._translateX = 0;
    _pGraphicsMatrix._translateY = 0;

    _pGraphicsMatrix.set_scaleX = function (v)
    {
        if (isNumber(v) && this.scaleX != v)
        {
            this.scaleX = v;
            this._scaleX = this.scaleX;
        }
    };

    _pGraphicsMatrix.set_shearY = function (v)
    {
        if (isNumber(v) && this.shearY != v)
        {
            this.shearY = v;
            this._shearY = this.shearY;
        }
    };

    _pGraphicsMatrix.set_shearX = function (v)
    {
        if (isNumber(v) && this.shearX != v)
        {
            this.shearX = v;
            this._shearX = this.shearX;
        }
    };

    _pGraphicsMatrix.set_scaleY = function (v)
    {
        if (isNumber(v) && this.scaleY != v)
        {
            this.scaleY = v;
            this._scaleY = this.scaleY;
        }
    };

    _pGraphicsMatrix.set_translateX = function (v)
    {
        if (isNumber(v) && this.translateX != v)
        {
            this.translateX = v;
            this._translateX = this.translateX;
        }
    };

    _pGraphicsMatrix.set_translateY = function (v)
    {
        if (isNumber(v) && this.translateY != v)
        {
            this.translateY = v;
            this._translateY = this.translateY;
        }
    };

    _pGraphicsMatrix.set = function (a, c, b, d, tx, ty)
    {
        this.set_scaleX(a);
        this.set_shearY(b);
        this.set_shearX(c);
        this.set_scaleY(d);
        this.set_translateX(tx);
        this.set_translateY(ty);

        return this;
    };

    _pGraphicsMatrix.clone = function ()
    {
        return new nexacro._ChartGraphicsMatrix(this);
    };

    _pGraphicsMatrix.equals = function (m)
    {
        return m === this || m && this._scaleX == m._scaleX && this._shearX == m._shearX
                && this._shearY == m._shearY && this._scaleY == m._scaleY && this._translateX == m._translateX
                && this._translateY == m._translateY
                || false;
    };

    _pGraphicsMatrix.toString = function ()
    {
        var f0 = [nexacro._ChartGraphicsClassUtils.fmtNumber(this._scaleX), nexacro._ChartGraphicsClassUtils.fmtNumber(this._shearX),
                    nexacro._ChartGraphicsClassUtils.fmtNumber(this._translateX)];
        var f1 = [nexacro._ChartGraphicsClassUtils.fmtNumber(this._shearY), nexacro._ChartGraphicsClassUtils.fmtNumber(this._scaleY),
                    nexacro._ChartGraphicsClassUtils.fmtNumber(this._translateY)];

        return '[[' + f0.join(', ') + '], ['
                + f1.join(', ') + ']]';
    };

    _pGraphicsMatrix.reset = function ()
    {
        this._scaleX = this._scaleY = 1;
        this._shearY = this._shearX = this._translateX = this._translateY = 0;
        return this;
    };

    _pGraphicsMatrix.scale = function (pt, centerPt)
    {
        var read = 0;
        if (pt instanceof nexacro.Point)
        {
            read = 1;
        }
        else
        {
            pt = new nexacro.Point(arguments[0], arguments[1]);
            read = 2;
        }
        if (arguments[read] != null)
        {
            if (arguments[read] instanceof nexacro.Point)
            {
                centerPt = arguments[read];
            }
            else
            {
                centerPt = new nexacro.Point(arguments[read], arguments[read + 1]);
            }
        }
        else
        {
            centerPt = null;
        }

        if (centerPt)
        {
            this.translate(centerPt);
        }
        this._scaleX *= pt.x;
        this._shearY *= pt.x;
        this._shearX *= pt.y;
        this._scaleY *= pt.y;
        if (centerPt)
        {
            this.translate(centerPt.negate());
        }
        return this;
    };

    _pGraphicsMatrix.translate = function (pt)
    {
        if (!(pt instanceof nexacro.Point))
        {
            pt = new nexacro.Point(arguments[0], arguments[1]);
        }
        var x = pt.x,
            y = pt.y;
        this._translateX += x * this._scaleX + y * this._shearY;
        this._translateY += x * this._shearX + y * this._scaleY;
        //trace("translate==>" + x + "," + y + "////" + this._translateX + "," + this._translateY);
        return this;
    };

    _pGraphicsMatrix.rotate = function (angle, centerPt)
    {
        if (!(centerPt instanceof nexacro.Point))
        {
            var argsLen = arguments.length;
            if (argsLen == 3)
            {
                centerPt = new nexacro.Point(arguments[1], arguments[2]);
            }
            else
            {
                centerPt = new nexacro.Point();
            }
        }
        angle = angle * nexacro._ChartGraphicsMatrix.DEGTORAD; // to rad
        var x = centerPt.x,
            y = centerPt.y,
            cos = Math.cos(angle),
            sin = Math.sin(angle),
            tx = x - x * cos + y * sin,
            ty = y - x * sin - y * cos,
            a = this._scaleX,
            b = this._shearX,
            c = this._shearY,
            d = this._scaleY;
        this._scaleX = cos * a + sin * b;
        this._shearX = -sin * a + cos * b;
        this._shearY = cos * c + sin * d;
        this._scaleY = -sin * c + cos * d;
        this._translateX += tx * a + ty * b;
        this._translateY += tx * c + ty * d;
        return this;
    };

    _pGraphicsMatrix.shear = function (pt, centerPt)
    {
        var read = 0;
        if (pt instanceof nexacro.Point)
        {
            read = 1;
        }
        else
        {
            pt = new nexacro.Point(arguments[0], arguments[1]);
            read = 2;
        }
        if (arguments[read] != null)
        {
            if (arguments[read] instanceof nexacro.Point)
            {
                centerPt = arguments[read];
            }
            else
            {
                centerPt = new nexacro.Point(arguments[read], arguments[read + 1]);
            }
        }
        else
        {
            centerPt = null;
        }
        if (centerPt)
        {
            this.translate(centerPt);
        }
        //x, y
        var a = this._scaleX,
            c = this._shearX;
        this._scaleX += pt.y * this._shearY;
        this._shearX += pt.y * this._scaleY;
        this._shearY += pt.x * a;
        this._scaleY += pt.x * c;

        if (centerPt)
        {
            this.translate(centerPt.negate());
        }
        return this;
    };

    _pGraphicsMatrix.skew = function (xdeg, ydeg, centerX, centerY)
    {
        //TODO: 현재 처리 안됨
        xdeg = xdeg * nexacro._ChartGraphicsMatrix.DEGTORAD;
        ydeg = ydeg * nexacro._ChartGraphicsMatrix.DEGTORAD;
        var tx = centerX - centerX * Math.cos(xdeg) + centerY * Math.sin(xdeg),
            ty = centerY - centerX * Math.sin(ydeg) - centerY * Math.cos(ydeg),
            a = this._scaleX,
            b = this._shearX,
            c = this._shearY,
            d = this._scaleY;
        tx = tx * a + ty * b;
        ty = tx * c + ty * d;
        this.concatenate(new nexacro._ChartGraphicsMatrix(Math.cos(ydeg), -Math.sin(xdeg), Math.sin(ydeg), Math.cos(xdeg), tx, ty));
    };

    _pGraphicsMatrix.isIdentity = function ()
    {
        return this._scaleX == 1 && this._shearY == 0 && this._shearX == 0 && this._scaleY == 1
                && this._translateX == 0 && this._translateY == 0;
    };

    _pGraphicsMatrix.isInvertible = function ()
    {
        return !!this._getDeterminant();
    };

    _pGraphicsMatrix.isSingular = function ()
    {
        return !this._getDeterminant();
    };

    _pGraphicsMatrix.concatenate = function (m)
    {
        var a = this._scaleX,
            b = this._shearX,
            c = this._shearY,
            d = this._scaleY;

        this._scaleX = m._scaleX * a + m._shearY * b;
        this._shearX = m._shearX * a + m._scaleY * b;
        this._shearY = m._scaleX * c + m._shearY * d;
        this._scaleY = m._shearX * c + m._scaleY * d;
        this._translateX += m._translateX * a + m._translateY * b;
        this._translateY += m._translateX * c + m._translateY * d;
        return this;
    };

    _pGraphicsMatrix.preConcatenate = function (m)
    {
        var a = this._scaleX,
            b = this._shearX,
            c = this._shearY,
            d = this._scaleY,
            tx = this._translateX,
            ty = this._translateY;
        this._scaleX = m._scaleX * a + m._shearX * c;
        this._shearX = m._scaleX * b + m._shearX * d;
        this._shearY = m._shearY * a + m._scaleY * c;
        this._scaleY = m._shearY * b + m._scaleY * d;
        this._translateX = m._scaleX * tx + m._shearX * ty + m._translateX;
        this._translateY = m._shearY * tx + m._scaleY * ty + m._translateY;
        return this;
    };

    _pGraphicsMatrix.transform = function (src, srcOff, dst, dstOff, numPts)
    {
        if (arguments.length < 5)
        {
            if (!(src instanceof nexacro.Point))
            {
                src = new nexacro.Point(arguments[0], arguments[1]);
                var readargs = src.__readArgs;
                return this._transformPoint(src, arguments[readargs]);
            }
            else
            {
                return this._transformPoint(src, srcOff);
            }
        }
        else
        {
            return this._transformCoordinates(src, srcOff, dst, dstOff, numPts);
        }
    };

    _pGraphicsMatrix._transformPoint = function (pt, dest)
    {
        var x = pt.x,
            y = pt.y;
        if (!dest)
        {
            dest = new nexacro.Point();
        }
        return dest.set(
            x * this._scaleX + y * this._shearX + this._translateX,
            x * this._shearY + y * this._scaleY + this._translateY
        );
    };

    _pGraphicsMatrix._transformCoordinates = function (src, srcOff, dst, dstOff, numPts)
    {
        var i = srcOff, j = dstOff,
            srcEnd = srcOff + 2 * numPts,
            x, y,
            a = this._scaleX,
            b = this._shearX,
            c = this._shearY,
            d = this._scaleY;

        var tx = this._translateX,
            ty = this._translateY;

        //        if (src[8] && "ChartTooltipPath" == src[8])
        //            trace(src[2], src[2]+this._translateX, src[8]);

        while (i < srcEnd)
        {
            x = src[i++];
            y = src[i++];
            dst[j++] = x * a + y * b + tx;
            dst[j++] = x * c + y * d + ty;
        }
        return dst;
    };

    _pGraphicsMatrix._transformCorners = function (rect, obj_id)
    {
        var x1 = rect.left,
            y1 = rect.top,
            x2 = x1 + rect.width,
            y2 = y1 + rect.height,
            coords = [x1, y1, x2, y1, x2, y2, x1, y2, obj_id];

        //        if ("ChartTooltipText" == obj_id)
        //            trace(rect.width);

        return this._transformCoordinates(coords, 0, coords, 0, 4);
    };

    _pGraphicsMatrix._transformBounds = function (bounds, dest, obj_id)
    {
        var coords = this._transformCorners(bounds, obj_id),
            min = coords.slice(0, 2),
            max = coords.slice(0),
            val, j;
        for (var i = 2; i < 8; i++)
        {
            val = coords[i];
            j = i & 1;
            /*
            min[j] = Math.min(val, min[j]);
            if ( val != min[j] )
            {
                max[j] = Math.max(val, max[j]);
            }
            */
            if (val < min[j])
            {
                min[j] = val;
            }
            else if (val > max[j])
            {
                max[j] = val;
            }


        }
        if (!dest)
        {
            dest = new nexacro.Rect();
        }
        return dest.set(min[0], min[1], max[0] - min[0], max[1] - min[1]);
    };
    
    _pGraphicsMatrix.inverseTransform = function (pt)
    {
        
        if (!(pt instanceof nexacro.Point))
        {
            pt = new nexacro.Point(arguments[0], arguments[1]);
            var readargs = pt.__readArgs;
            return this._inverseTransform(pt, arguments[readargs]);
        }
        else
        {
            return this._inverseTransform(pt, arguments[1]);
        }
    };
    
    _pGraphicsMatrix._getDeterminant = function ()
    {
        var det = this._scaleX * this._scaleY - this._shearX * this._shearY;
        return isFinite(det) && !nexacro._ChartGraphicsMathUtil.isZero(det)
                && isFinite(this._translateX) && isFinite(this._translateY)
                ? det : null;
    };

    _pGraphicsMatrix._inverseTransform = function (pt, dest)
    {
        var det = this._getDeterminant();
        if (!det)
        {
            return null;
        }
        var x = pt.x - this._translateX,
            y = pt.y - this._translateY;
        if (!dest)
        {
            dest = new nexacro.Point();
        }
        return dest.set(
            (x * this._scaleY - y * this._shearX) / det,
            (y * this._scaleX - x * this._shearY) / det
        );
    };

    _pGraphicsMatrix.decompose = function ()
    {
        var a = this._scaleX, b = this._shearX, c = this._shearY, d = this._scaleY;
        if (nexacro._ChartGraphicsMathUtil.isZero(a * d - b * c))
        {
            return null;
        }

        var scaleX = Math.sqrt(a * a + b * b);
        a /= scaleX;
        b /= scaleX;

        var shear = a * c + b * d;
        c -= a * shear;
        d -= b * shear;

        var scaleY = Math.sqrt(c * c + d * d);
        c /= scaleY;
        d /= scaleY;
        shear /= scaleY;

        if (a * d < b * c)
        {
            a = -a;
            b = -b;
            shear = -shear;
            scaleX = -scaleX;
        }

        return {
            translation: this.getTranslation(),
            scaling: new nexacro.Point(scaleX, scaleY),
            rotation: -Math.atan2(b, a) * 180 / Math.PI,
            shearing: shear
        };
    };

    _pGraphicsMatrix.consolidate = function ()
    {
        var attrs = {
            "a": this._scaleX,
            "b": this._shearX,
            "c": this._shearY,
            "d": this._scaleY,
            "e": this._translateX,
            "f": this._translateY
        };
        return attrs;
    };

    _pGraphicsMatrix.getValues = function ()
    {
        return [this._scaleX, this._shearY, this._shearX, this._scaleY, this._translateX, this._translateY];
    };

    _pGraphicsMatrix.getTranslation = function ()
    {
        return new nexacro.Point(this._translateX, this._translateY);
    };

    _pGraphicsMatrix.getScaling = function ()
    {
        return (this.decompose() || {}).scaling;
    };

    _pGraphicsMatrix.getRotation = function ()
    {
        return (this.decompose() || {}).rotation;
    };

    _pGraphicsMatrix.inverted = function ()
    {
        var det = this._getDeterminant();
        return det && new nexacro._ChartGraphicsMatrix(
                this._scaleY / det,
                -this._shearY / det,
                -this._shearX / det,
                this._scaleX / det,
                (this._shearX * this._translateY - this._scaleY * this._translateX) / det,
                (this._shearY * this._translateX - this._scaleX * this._translateY) / det);
    };

    _pGraphicsMatrix.shiftless = function ()
    {
        return new nexacro._ChartGraphicsMatrix(this._scaleX, this._shearY, this._shearX, this._scaleY, 0, 0);
    };

    _pGraphicsMatrix.equalsExceptTranslate = function (m)
    {
        return m === this || m && this._scaleX == m._scaleX && this._shearX == m._shearX
                && this._shearY == m._shearY && this._scaleY == m._scaleY
                || false;
    };

	_pGraphicsMatrix._fixedHalflineAntiAlise = function (obj)
	{
		var ret = {},
			//seg,
			objpos = null,
			isfixantialiseX = true,
			isfixantialiseY = true,
			sx, sy, x, y;

		function isFixedAntiAliesCheck(n)
		{
			if (nexacro._Browser == "Runtime")
				return true;
			return n === +n && n === (n | 0);
		}
		ret.x = this._translateX;
		ret.y = this._translateY;
		if (obj && obj._strokewidth)
		{

			if (obj._segments && obj._strokewidth == 1)
			{
				if (obj._segments.length > 0)
				{
					objpos = {};
					objpos.x = obj._segments[0].point.x;
					objpos.y = obj._segments[0].point.y;
				}
				if (objpos)
				{
					sx = Math.floor(objpos.x);
					sy = Math.floor(objpos.y);

					if (!isFixedAntiAliesCheck(objpos.x))
					{
						if ((sx + 0.3) < objpos.x && objpos.x < (sx + 0.7))
							isfixantialiseX = false;
					}
					if (!isFixedAntiAliesCheck(objpos.y)) 
					{
						if ((sy + 0.3) < objpos.y && objpos.y < (sy + 0.7))
							isfixantialiseY = false;
					}
					x = Math.round(this._translateX);
					y = Math.round(this._translateY);


					if (this._translateX == x && isfixantialiseX) x += 0.5;
					else
						x = this._translateX;

					if (this._translateY == y && isfixantialiseY) y += 0.5;
					else
						y = this._translateY;

					ret.x = x;
					ret.y = y;

				}
				else
				{
					ret.x = this._translateX;
					ret.y = this._translateY;
				}
			}
			else
			{
				if (obj._strokewidth == 1)
				{
					sx = Math.floor(this._translateX);
					sy = Math.floor(this._translateY);
					if (!isFixedAntiAliesCheck(this._translateX)) 
					{
						if ((sx + 0.3) < this._translateX && this._translateX < (sx + 0.7))
							isfixantialiseX = false;
					}
					if (!isFixedAntiAliesCheck(this._translateY)) 
					{
						if ((sy + 0.3) < this._translateY && this._translateY < (sy + 0.7))
							isfixantialiseY = false;
					}


					x = Math.round(this._translateX);
					y = Math.round(this._translateY);

					obj._size.width = Math.round(obj._size.width);
					obj._size.height = Math.round(obj._size.height);

					if (isfixantialiseX) x += 0.5;
					else
						x = this._translateX;
					if (isfixantialiseY) y += 0.5;
					else
						y = this._translateY;


					ret.x = x;
					ret.y = y;
				}
				else
				{
					ret.x = this._translateX;
					ret.y = this._translateY;
				}

			}

		}
		return ret;
	};
	_pGraphicsMatrix.applyToContext = function (ctx, obj)
	{
		var fixpos = this._fixedHalflineAntiAlise(obj);
		ctx.transform(this._scaleX, this._shearY, this._shearX, this._scaleY, fixpos.x, fixpos.y);
	};

}

if (!nexacro._ChartGraphicsQuadTree)
{
    nexacro._ChartGraphicsQuadTree = function (x, y, w, h)
    {
        this._dict = new nexacro._ChartGraphicsHashMap();
        w = Math.max(w, h);
        this._root = new nexacro._ChartGraphicsQuadTreeNode(new nexacro.Rect(x, y, w, w));
    };

    var _pGraphicsQuadTree = nexacro._createPrototype(nexacro.Object, nexacro._ChartGraphicsQuadTree);
    nexacro._ChartGraphicsQuadTree.prototype = _pGraphicsQuadTree;

    _pGraphicsQuadTree.setDebug = function (topForm)
    {
        this._root._topForm = topForm;
        if (topForm) this._root._debug = true;
    };

    _pGraphicsQuadTree.query = function (areaRect, results)
    {
        if (nexacro._ChartGraphicsLib.isArray(results))
        {
            this._root.query(areaRect, results);
        }
        else
        {
            return this._root.query(areaRect);
        }
    };

    _pGraphicsQuadTree.getAll = function ()
    {
        return this._dict.getValues();
    };

    _pGraphicsQuadTree.getCount = function ()
    {
        return this._dict.getSize();
    };

    _pGraphicsQuadTree.move = function (item)
    {
        if (this.contains(item))
        {
            var i = 0;
            while (!this._checkRegion(item))
            {
                if (i == 20)
                {
                    var rect = item.getBoundRect();
                    trace("error checkRegion (move)" + rect.left + "," + rect.top + "," + rect.width + "," + rect.height);
                    return false;
                }
                i++;
            }
            this._root.move(item);
            return true;
        }
        else
        {
            return false;
        }
    };

    _pGraphicsQuadTree.add = function (item)
    {
        var i = 0;
        while (!this._checkRegion(item))
        {
            if (i == 20)
            {
                var rect = item.getBoundRect();
                trace("error checkRegion (add) " + rect.left + "," + rect.top + "," + rect.width + "," + rect.height);
                return;
            }
            i++;
        }
        var root = this._root,
			map = this._dict;
        if (nexacro._ChartGraphicsLib.isArray(item))
        {
            var len = item.length;

            for (i = 0; i < len; i++)
            {
                root.insert(item[i]);
                map.put(item[i], item[i]);
            }
        }
        else
        {
            root.insert(item);
            map.put(item, item);
        }
    };

    _pGraphicsQuadTree.clear = function ()
    {
        //this.root.clear();
        this._dict.clear();
        this._root.clear();
    };

    _pGraphicsQuadTree.contains = function (item)
    {
        return this._dict.containsKey(item);
    };

    _pGraphicsQuadTree.remove = function (item)
    {
        if (this.contains(item))
        {
            this._root.remove(item, true);
            this._dict.remove(item);
            return true;
        }
        else
        {
            return false;
        }
    };

    _pGraphicsQuadTree._checkRegion = function (item)
    {
        var root = this._root,
			bounds = root._bounds,
			itemBounds = item.getBoundRect();
        if (!bounds || bounds.width <= 0 || bounds.height <= 0)
        {
			return true;	// 2019.9.10 div내 상대좌표의 경우 form size가 미결정
            //Eco.Logger.error("QuadTree 의 bounds(width, height) 값이 0 이면 Rectangle정보를 구성할 수 없습니다.");
        }
        if (!bounds.containsRect(itemBounds))
        {
            var p;
            if (itemBounds.left < bounds.left)
            {
                if (itemBounds.top < bounds.top)
                {
                    p = this._grow(bounds.width, bounds.height);
                }
                else
                {
                    p = this._grow(bounds.width, 0);
                }
            }
            else if ((itemBounds.left + itemBounds.width) > (bounds.left + bounds.width))
            {
                if (itemBounds.top < bounds.top)
                {
                    p = this._grow(0, bounds.height);
                }
                else
                {
                    p = this._grow(0, 0);
                }
            }
            else if (itemBounds.top < bounds.top)
            {
                p = this._grow(0, bounds.height);
            }
            else if (itemBounds.top + itemBounds.height > bounds.top + bounds.height)
            {
                p = this._grow(0, 0);
            }
            if (p)
            {
                this._root = p;
            }
            return false;
        }
        return true;
    };

    _pGraphicsQuadTree._grow = function (xoffset, yoffset)
    {
        var root = this._root,
			bounds = root._bounds;
        var x = bounds.left - xoffset,
			y = bounds.top - yoffset,
			cls = nexacro._ChartGraphicsQuadTreeNode,
			rectCls = nexacro.Rect,
			w = bounds.width,
			h = bounds.height;

        //console.log("grow Root Bounds", x, y, bounds.width * 2, bounds.height * 2);

        var p = new cls(x, y, bounds.width * 2, bounds.height * 2);
        var nodes = p._childNodes;
        if (xoffset)
        {
            if (yoffset)
            {
                nodes[3] = root; //br
                root.Parent = p;
            }
            else
            {
                nodes[2] = root; //tr
                root.Parent = p;
            }
        }
        else if (yoffset)
        {
            nodes[1] = root; //bl
            root.Parent = p;
        }
        else
        {
            nodes[0] = root; //tl
            root.Parent = p;
        }
        nodes[0] = nodes[0] || new cls(p, new rectCls(x, y, w, h)); //tl
        nodes[1] = nodes[1] || new cls(p, new rectCls(x, y + h, w, h)); //bl
        nodes[2] = nodes[2] || new cls(p, new rectCls(x + w, y, w, h)); //tr
        nodes[3] = nodes[3] || new cls(p, new rectCls(x + w, y + h, w, h)); //br
        return p;
    };

}

if (!nexacro._ChartGraphicsQuadTreeNode)
{
    nexacro._ChartGraphicsQuadTreeNode = function ()
    {
        if (arguments.length == 4)
        {
            this._bounds = new nexacro.Rect(arguments[0], arguments[1],
				arguments[2], arguments[3]);
        }
        else if (arguments.length == 2)
        {
            this.Parent = arguments[0];
            this._bounds = arguments[1];
        }
        else if (arguments.length == 1)
        {
            this._bounds = arguments[0];
        }
        this._items = []; //이 node에 속한 요소들
        this._childNodes = []; //4node로 쪼개어 진다.
    };

    var _pGraphicsQuadTreeNode = nexacro._createPrototype(nexacro.Object, nexacro._ChartGraphicsQuadTreeNode);
    nexacro._ChartGraphicsQuadTreeNode.prototype = _pGraphicsQuadTreeNode;

    _pGraphicsQuadTreeNode.maxItemsPerNode = 2;

    _pGraphicsQuadTreeNode.isEmptyLeaf = function ()
    {
        return this.getCount() == 0 && this._childNodes.length == 0;
    };

    _pGraphicsQuadTreeNode.getCount = function ()
    {
        var cnt = 0;

        cnt += this._items.length;

        var nodes = this._childNodes, node;
        for (var i = 0, len = nodes.length ; i < len ; i++)
        {
            node = nodes[i];
            cnt += node.getCount();
        }
        return cnt;
    };

    _pGraphicsQuadTreeNode.add = function (item)
    {
        item._qOwner = this;
        var items = this._items;
        items.push(item);
    };

    _pGraphicsQuadTreeNode._remove = function (item)
    {
        var items = this._items;
        var idx = nexacro._ChartGraphicsLibArray.indexOf(items, item);
        if (idx >= 0)
        {
            items[idx] = items[items.length - 1];
            nexacro._ChartGraphicsLibArray.removeAt(items, items.length - 1);
        }
    };

    _pGraphicsQuadTreeNode.relocate = function (item)
    {
        if (this._bounds.containsRect(item.getBoundRect()))
        {
            var nodes = this._childNodes;
            if (nodes.length)
            {
                var dest = this.getDestTree(item);
                if (item._qOwner != dest)
                {
                    var formerOwner = item._qOwner;
                    this.remove(item, false);
                    dest.insert(item);
                    if (formerOwner)
                    {
                        formerOwner.cleanUpwards();
                    }
                }
            }
        }
        else
        {
            if (this.Parent != null)
            {
                //console.log(this.Parent);
                this.Parent.relocate(item);
            }
        }
    };

    _pGraphicsQuadTreeNode.cleanUpwards = function ()
    {
        var nodes = this._childNodes;
        if (nodes.length)
        {
            if (nodes[0].isEmptyLeaf() &&
				nodes[1].isEmptyLeaf() &&
				nodes[2].isEmptyLeaf() &&
				nodes[3].isEmptyLeaf())
            {
                this._childNodes = [];
                if (this.Parent != null && this.getCount() == 0)
                {
                    this.Parent.cleanUpwards();
                }
            }
        }
        else
        {
            if (this.Parent != null && this.getCount() == 0)
            {
                this.Parent.cleanUpwards();
            }
        }
    };

    _pGraphicsQuadTreeNode.clear = function ()
    {
        var nodes = this._childNodes;
        if (nodes.length)
        {
            nodes[0].clear();
            nodes[1].clear();
            nodes[2].clear();
            nodes[3].clear();
        }
        this._childNodes = [];
        var items = this._items;
        for (var i = 0, len = items.length ; i < len ; i++)
        {
            items[i]._qOwner = null;
        }
        this._items = [];
    };

    _pGraphicsQuadTreeNode.remove = function (item, bClean)
    {
        if (item._qOwner != null)
        {
            if (item._qOwner == this)
            {
                this._remove(item);
                if (bClean)
                {
                    this.cleanUpwards();
                }
            }
            else
            {
                item._qOwner.remove(item, bClean);
            }
        }
    };

    _pGraphicsQuadTreeNode.getAll = function (results)
    {
        results.push.apply(results, this._items);
        var nodes = this._childNodes;
        for (var i = 0, len = nodes.length ; i < len ; i++)
        {
            nodes[i].getAll(results);
        }
    };

    _pGraphicsQuadTreeNode.query = function (areaRect, results)
    {
		var i,
		res = [],
		len = 0;
        if (results != null && nexacro._ChartGraphicsLib.isArray(results))
        {
            var bounds = this._bounds;
            if (areaRect.containsRect(bounds))
            {
                this.getAll(results);
            }
            else if (areaRect.intersectRect(bounds))
            {
                //trace("==>" + bounds.toString());
                var nodes = this._childNodes,
					items = this._items;

				len = items.length || 0;
                for (i = 0; i < len ; i++)
                {
                    if (areaRect.intersectRect(items[i].getBoundRect()))
                    {
                        results.push(items[i]);
                        //trace("push===>" + items[i]._id);
                    }
                }
				len = nodes.length;
                for (i = 0; i < len ; i++)
                {
                    nodes[i].query(areaRect, results);
                }
            }
        }
        else
        {
            
            this.query(areaRect, res);
            return res;
        }
    };

    _pGraphicsQuadTreeNode.insert = function (item)
    {
        var bounds = this._bounds,
			itemBounds = item.getBoundRect();

        if (!bounds.containsRect(itemBounds))
        {
            return;
        }
        var nodes = this._childNodes,
			items = this._items;

        if (items.length == 0 ||
			 (nodes.length == 0 && items.length + 1 <= this.maxItemsPerNode))
        {
            this.add(item);
        }
        else
        {
            if (nodes.length == 0)
            {
                this._createSubNodes();
            }
            var dest = this.getDestTree(item);
            if (dest == this)
            {
                this.add(item);
            }
            else
            {
                dest.insert(item);
            }
        }
    };

    _pGraphicsQuadTreeNode._createSubNodes = function ()
    {
        var bounds = this._bounds;
        //if ( this._depth >= this._maxDepth || (bounds.width * bounds.height) <= 10 )
        if ((bounds.width * bounds.height) <= 10)
        {
            return;
        }
        var halfWidth = bounds.width / 2;
        var halfHeight = bounds.height / 2;
        var left = bounds.left;
        var top = bounds.top;
        var nodes = this._childNodes,
			cls = nexacro._ChartGraphicsQuadTreeNode,
			rectCls = nexacro.Rect;
        nodes[0] = new cls(this, new rectCls(left, top, halfWidth, halfHeight)); //tl
        nodes[1] = new cls(this, new rectCls(left, top + halfHeight, halfWidth, halfHeight)); //bl
        nodes[2] = new cls(this, new rectCls(left + halfWidth, top, halfWidth, halfHeight)); //tr
        nodes[3] = new cls(this, new rectCls(left + halfWidth, top + halfHeight, halfWidth, halfHeight)); //br

        var items = this._items, dest;
        for (var i = 0 ; i < items.length ; i++)
        {
            dest = this.getDestTree(items[i]);
            if (dest != this)
            {
                dest.insert(items[i]);
                this._remove(items[i]);
                i--;
            }
        }
    };

    _pGraphicsQuadTreeNode.getDestTree = function (item)
    {
        var destTree = this;
        var nodes = this._childNodes, node, nodeBounds;
        for (var i = 0, len = nodes.length ; i < len ; i++)
        {
            node = nodes[i];
            nodeBounds = node._bounds;
            if (nodeBounds.containsRect(item.getBoundRect()))
            {
                destTree = node;
                return destTree;
            }
        }
        return destTree;
    };

    _pGraphicsQuadTreeNode.move = function (item)
    {
        if (item._qOwner != null)
        {
            item._qOwner.relocate(item);
        }
        else
        {
            this.relocate(item);
        }
    };

    _pGraphicsQuadTreeNode._getTopForm = function ()
    {
        if (this._topForm == null)
        {
            var p = this;
            while (p.Parent)
            {
                p = p.Parent;
            }
            this._topForm = p._topForm;
        }
        return this._topForm;
    };

}

if (!nexacro._ChartGraphicsRectsManager)
{
    nexacro._ChartGraphicsRectsManager = function ()
    {
        var argLens = arguments.length;
        if (argLens >= 1)
        {
            var arg0 = arguments[0];
            if (nexacro._ChartGraphicsLib.isArray(arg0))
            {
                if (argLens == 3)
                {
                    // offset, size
                    this._rects = arg0.slice(arguments[1], arguments[1] + arguments[2] - 1);
                }
                else
                {
                    this._rects = arg0.slice(0);
                }
                this._rects.sort(this._compare);
            }
            else if (arg0 instanceof nexacro.Rect)
            {
                this._rects = [arg0];
            }
            else if (arg0 instanceof nexacro._ChartGraphicsRectsManager)
            {
                this._rects = arg0._rects.slice(0);
                this._rects.sort(this._compare);
            }
        }
        else
        {
            this._rects = [];
        }
    };

    var _pGraphicsRectsManager = nexacro._createPrototype(nexacro.Object, nexacro._ChartGraphicsRectsManager);
    nexacro._ChartGraphicsRectsManager.prototype = _pGraphicsRectsManager;

    _pGraphicsRectsManager.clear = function ()
    {
        this._rects = [];
        this._bounds = null;
    };

    _pGraphicsRectsManager._compare = function (a, b)
    {
        return a.x - b.x;
    };

    _pGraphicsRectsManager._debug = function ()
    {
        var rects = this._rects,
			size = rects.length;
        console.log("nexacro._ChartGraphicsRectsManager: ", "size: ", size);
        console.log("bounds: ", this.getBoundRect());
        for (var i = 0 ; i < size ; i++)
        {
            console.log(rects[i].toString());
        }
    };

    _pGraphicsRectsManager.getBoundRect = function ()
    {
        var bounds = this._bounds;
        if (!bounds)
        {
            var rects = this._rects,
				len = rects.length,
				r;
            //console.log("getBoundRect:" , rects);
            if (len)
            {
                bounds = rects[0].clone();
                for (var i = 1 ; i < len ; i++)
                {
                    r = rects[i];
                    if (r.left < bounds.left)
                    {
                        bounds.width = bounds.left + bounds.width - r.left;
                        bounds.left = r.left;
                    }
                    if (r.top < bounds.top)
                    {
                        bounds.height = bounds.top + bounds.height - r.top;
                        bounds.top = r.top;
                    }
                    if (r.left + r.width > bounds.left + bounds.width)
                    {
                        bounds.width = r.left + r.width - bounds.left;
                    }
                    if (r.top + r.height > bounds.top + bounds.height)
                    {
                        bounds.height = r.top + r.height - bounds.top;
                    }
                }
                this._bounds = bounds;
            }
        }
        return bounds;
    };

    _pGraphicsRectsManager.add = function (rect)
    {
        this._add(rect, 0, this._rects.length - 1);
    };

    _pGraphicsRectsManager._add = function (rect, l, r)
    {
        var idx = l,
			rects = this._rects,
			size = rects.length;
        while (l <= r)
        {
            idx = (l + r) >>> 1; //(l+r)/2;
            while ((rects[idx] == null) && (idx < r)) idx++;
            if (rects[idx] == null)
            {
                // All 'null' from center to r so skip them
                r = (l + r) >>> 1; //(l+r)/2;
                idx = (l + r) >>> 1;//(l+r)/2;
                if (l > r)
                {
                    idx = l;
                }
                while ((rects[idx] == null) && (idx > l)) idx--;
                if (rects[idx] == null)
                {
                    rects[idx] = rect;
                    return;
                }
            }
            if (rect.left == rects[idx].left) break;
            if (rect.left < rects[idx].left)
            {
                if (idx == 0) break;
                if ((rects[idx - 1] != null) &&
					(rect.left >= rects[idx - 1].left)) break;
                r = idx - 1;
            }
            else
            {
                if (idx == size - 1) { idx++; break; }
                if ((rects[idx + 1] != null) &&
					(rect.left <= rects[idx + 1].left)) { idx++; break; }
                l = idx + 1;
            }
        }
        if (idx < size)
        {
            rects.splice(idx, 0, rect);
        }
        else
        {
            rects[idx] = rect;
        }
        this._bounds = null;
    };

    _pGraphicsRectsManager._addOrSkipWhenInclude = function (rect, l, r)
    {
        var idx = l,
			rects = this._rects,
			size = rects.length;
        while (l <= r)
        {
            idx = (l + r) >>> 1; //(l+r)/2;
            while ((rects[idx] == null) && (idx < r)) idx++;
            if (rects[idx] == null)
            {
                // All 'null' from center to r so skip them
                r = (l + r) >>> 1; //(l+r)/2;
                idx = (l + r) >>> 1;//(l+r)/2;
                if (l > r)
                {
                    idx = l;
                }
                while ((rects[idx] == null) && (idx > l)) idx--;
                if (rects[idx] == null)
                {
                    rects[idx] = rect;
                    return;
                }
            }
            if (rect.left == rects[idx].left) break;
            if (rect.left < rects[idx].left)
            {
                if (idx == 0) break;
                if ((rects[idx - 1] != null) &&
					(rect.left >= rects[idx - 1].left)) break;
                r = idx - 1;
            }
            else
            {
                if (idx == size - 1) { idx++; break; }
                if ((rects[idx + 1] != null) &&
					(rect.left <= rects[idx + 1].left)) { idx++; break; }
                l = idx + 1;
            }
        }
        if (idx < size)
        {
            rects.splice(idx, 0, rect);
        }
        else
        {
            rects[idx] = rect;
        }
        this._bounds = null;
    };

    _pGraphicsRectsManager.contains = function (rect)
    {
        var l = 0,
			i = 0,
			rects = this._rects,
			size = rects.length,
			r = size - 1,
			idx = 0;
        while (l <= r)
        {
            idx = (l + r) >>> 1;
            if (rect.left == rects[idx].left) break;
            if (rect.left < rects[idx].left)
            {
                if (idx == 0) break;
                if (rect.left >= rects[idx - 1].left) break;
                r = idx - 1;
            }
            else
            {
                if (idx == size - 1) { idx++; break; }
                if (rect.left <= rects[idx + 1].left) { idx++; break; }
                l = idx + 1;
            }
        }

        if (rects[idx].left != rect.left) return false;

        for (i = idx; i >= 0; i--)
        {
            if (rects[idx].equals(rect)) return true;
            if (rects[idx].left != rect.left) break;
        }

        for (i = idx + 1; i < size; i++)
        {
            if (rects[idx].equals(rect)) return true;
            if (rects[idx].left != rect.left) break;
        }

        return false;
    };

    _pGraphicsRectsManager.containsAll = function (arr)
    {
        if (!(arr instanceof nexacro._ChartGraphicsRectsManager))
        {
            arr = new nexacro._ChartGraphicsRectsManager(arr);
        }
        return this._containsAll(arr);
    };

    _pGraphicsRectsManager._containsAll = function (rectMgr)
    {
        var x, xChange = 0,
			rects = this._rects,
			size = rects.length,
			argRects = rectMgr._rects,
			argSize = argRects.length;
        for (var j = 0, i = 0; j < argSize; j++)
        {
            i = xChange;
            while (rects[i].left < argRects[j].left)
            {
                i++;
                if (i == size) return false;
            }
            xChange = i;
            x = rects[i].left;
            while (!argRects[j].equals(rects[i]))
            {
                i++;
                if (i == size) return false;
                if (x != rects[i].left)
                    return false;
            }
        }
        return true;
    };

    _pGraphicsRectsManager.remove = function (rect)
    {
        var l = 0,
			i = 0,
			rects = this._rects,
			size = rects.length,
			r = size - 1,
			arrayCopy = nexacro._ChartGraphicsLibArray.arrayCopy,
			idx = 0;

        while (l <= r)
        {
            idx = (l + r) >>> 1;
            if (rect.left == rects[idx].left) break;
            if (rect.left < rects[idx].left)
            {
                if (idx == 0) break;
                if (rect.left >= rects[idx - 1].left) break;
                r = idx - 1;
            }
            else
            {
                if (idx == size - 1) { idx++; break; }
                if (rect.left <= rects[idx + 1].left) { idx++; break; }
                l = idx + 1;
            }
        }

        if (rects[idx].left != rect.left) return false;

        for (i = idx; i >= 0; i--)
        {
            if (rects[idx].equals(rect))
            {
                arrayCopy(rects, idx + 1, rects, idx, size - idx);
                rects.length = size - 1;
                this._bounds = null;
                return true;
            }
            if (rects[idx].left != rect.left) break;
        }

        for (i = idx + 1; i < size; i++)
        {
            if (rects[idx].equals(rect))
            {
                arrayCopy(rects, idx + 1, rects, idx, size - idx);
                rects.length = size - 1;
                this._bounds = null;
                return true;
            }
            if (rects[idx].left != rect.left) break;
        }

        return false;
    };

    _pGraphicsRectsManager.removeAll = function (arr)
    {
        if (!(arr instanceof nexacro._ChartGraphicsRectsManager))
        {
            arr = new nexacro._ChartGraphicsRectsManager(arr);
        }
        return this._removeAll(arr);
    };

    _pGraphicsRectsManager._removeAll = function (rectsMgr)
    {
        var x, xChange = 0,
			rects = this._rects,
			size = rects.length,
			argRects = rectsMgr, //_rects,
			i,
			j,
			argSize = argRects.length;
        var ret = false;

        for (j = 0; j < argSize; j++)
        {
            i = xChange;
            while ((rects[i] == null) ||
				(rects[i].left < argRects[j].left))
            {
                i++;
                if (i == size) break;
            }

            if (i == size) break;

            xChange = i;
            x = rects[i].left;
            while (true)
            {
                if (rects[i] == null)
                {
                    i++;
                    if (i == size) break;
                    continue;
                }
                if (argRects[j].equals(rects[i]))
                {
                    rects[i] = null;
                    ret = true;
                }
                i++;
                if (i == size) break;
                if (x != rects[i].left) break;
            }
        }

        if (ret)
        {
            j = 0; i = 0;
            while (i < size)
            {
                if (rects[i] != null)
                {
                    rects[j++] = rects[i];
                }
                i++;
            }
            rects.length = j;
            this._bounds = null;
        }
        return ret;
    };

    _pGraphicsRectsManager.retainAll = function (arr)
    {
        if (!(arr instanceof nexacro._ChartGraphicsRectsManager))
        {
            arr = new nexacro._ChartGraphicsRectsManager(arr);
        }
        return this._retainAll(arr);
    };

    _pGraphicsRectsManager._retainAll = function (rectsMgr)
    {
        var x, xChange = 0,
			rects = this._rects,
			size = rects.length,
			argRects = rectsMgr._rects,
			i,
			j,
			argSize = argRects.length;
        var ret = false;

        for (j = 0, i = 0; j < size; j++)
        {
            i = xChange;
            while (argRects[i].left < rects[j].left)
            {
                i++;
                if (i == argSize) break;
            }
            if (i == argSize)
            {
                ret = true;

                for (var k = j; k < size; k++)
                {
                    rects[k] = null;
                }
                size = j;
                rects.length = j;
                break;
            }
            xChange = i;
            x = argRects[i].left;
            while (true)
            {
                if (rects[j].equals(argRects[i])) break;
                i++;
                if ((i == argSize) ||
					(x != argRects[i].left))
                {
                    rects[j] = null;
                    ret = true;
                    break;
                }
            }
        }

        if (ret)
        {
            j = 0; i = 0;
            while (i < size)
            {
                if (rects[i] != null)
                {
                    rects[j++] = rects[i];
                }
                i++;
            }
            rects.length = j;
            this._bounds = null;
        }
        return ret;
    };

    _pGraphicsRectsManager.append = function (rectsMgr)
    {
        var argRects = rectsMgr._rects,
			argSize = argRects.length;
        if (argSize == 0)
        {
            return;
        }

        var rects = this._rects,
			dst = rects,
			size = rects.length,
			arrayCopy = nexacro._ChartGraphicsLibArray.arrayCopy;

        if (size == 0)
        {
            this._rects = argRects.slice(0);
            this._bounds = null;
            return;
        }

        if (rects.length < (size + argSize))
        {
            dst = new Array(size + argSize);
        }

        var src1 = argRects,
			src1Sz = argSize,
			src1I = src1Sz - 1;

        var src2 = rects,
			src2Sz = size,
			src2I = src2Sz - 1;

        var dstI = size + argSize - 1;
        var x1 = src1[src1I].left;
        var x2 = src2[src2I].left;

        while (dstI >= 0)
        {
            if (x1 <= x2)
            {
                dst[dstI] = src2[src2I];
                if (src2I == 0)
                {
                    arrayCopy(src1, 0, dst, 0, src1I + 1);
                    break;
                }
                src2I--;
                x2 = src2[src2I].left;
            }
            else
            {
                dst[dstI] = src1[src1I];
                if (src1I == 0)
                {
                    arrayCopy(src2, 0, dst, 0, src2I + 1);
                    break;
                }
                src1I--;
                x1 = src1[src1I].left;
            }
            dstI--;
        }
        this._rects = dst;
        this._bounds = null;
    };

    _pGraphicsRectsManager.mergeRects = function (overhead, lineOverhead)
    {
        var rects = this._rects,
			i,
			j,
			size = rects.length;

        if (size == 0) return;

        var r, cr;
        var cost1, cost2, cost3;
        var splits = new Array(4);

        for (i = 0; i < size; i++)
        {
            r = rects[i];
            if (r == null) continue;
            cost1 = (overhead +
				(r.height * lineOverhead) +
				(r.height * r.width));
            do
            {
                var maxX = r.left + r.width + overhead / r.height;
                for (j = i + 1; j < size; j++)
                {
                    cr = rects[j];
                    if ((cr == null) || (cr == r)) continue;
                    if (cr.left >= maxX)
                    {
                        j = size;
                        break;
                    }
                    cost2 = (overhead +
						(cr.height * lineOverhead) +
						(cr.height * cr.width));
                    var mr = r.union(cr);
                    cost3 = (overhead +
						(mr.height * lineOverhead) +
						(mr.height * mr.width));
                    if (cost3 <= cost1 + cost2)
                    {
                        r = rects[i] = mr;
                        rects[j] = null;
                        cost1 = cost3;
                        j = -1;
                        break;
                    }

                    if (!r.intersectRect(cr)) continue;

                    this.splitRect(cr, r, splits);
                    var splitCost = 0;
                    var l = 0;
                    for (var k = 0; k < 4; k++)
                    {
                        if (splits[k] != null)
                        {
                            var sr = splits[k];

                            if (k < 3) splits[l++] = sr;
                            splitCost += (overhead +
								(sr.height * lineOverhead) +
								(sr.height * sr.width));
                        }
                    }
                    if (splitCost >= cost2) continue;

                    if (l == 0)
                    {
                        rects[j] = null;
                        if (splits[3] != null)
                        {
                            this._add(splits[3], j, size - 1);
                            size = rects.length;
                        }
                        continue;
                    }

                    rects[j] = splits[0];
                    if (l > 1)
                    {
                        this.insertRects(splits, 1, j + 1, l - 1);
                        size = rects.length;
                    }
                    if (splits[3] != null)
                    {
                        this._add(splits[3], j, size - 1);
                        size = rects.length;
                    }
                }
            }
            while (j != size);
        }

        j = 0; i = 0;
        var area = 0;
        while (i < size)
        {
            if (rects[i] != null)
            {
                r = rects[i];
                rects[j++] = r;
                area += overhead + (r.height * lineOverhead) +
						(r.height * r.width);
            }
            i++;
        }
        rects.length = j;
        this._bounds = null;
        r = this.getBoundRect();
        if (r == null) return;
        if (overhead + (r.height * lineOverhead) + (r.height * r.width) < area)
        {
            rects[0] = r;
            rects.length = 1;
        }
    };

    _pGraphicsRectsManager.subtract = function (rectsMgr, overhead, lineOverhead)
    {
        var r,
		i,
		j,
		k,
		sr;
        var cost;
        var jMin = 0;
        var splits = new Array(4);
        var rects = this._rects,
			size = rects.length,
			argRects = rectsMgr._rects,
			argSize = argRects.length;

        for (i = 0; i < size; i++)
        {
            r = rects[i];
            cost = (overhead +
					(r.height * lineOverhead) +
					(r.height * r.width));

            for (j = jMin; j < argSize; j++)
            {
                sr = argRects[j];

                if (sr.left + sr.width < r.left)
                {
                    if (j == jMin) jMin++;
                    continue;
                }

                if (sr.left > r.left + r.width)
                    break;

                if (!r.intersectRect(sr))
                    continue;

                this.splitRect(r, sr, splits);

                var splitCost = 0;
                var tmpR;
                for (k = 0; k < 4; k++)
                {
                    tmpR = splits[k];
                    if (tmpR != null)
                    {
                        splitCost += (overhead +
							(tmpR.height * lineOverhead) +
							(tmpR.height * tmpR.width));
                    }
                }

                if (splitCost >= cost)
                    continue;

                var l = 0;
                for (k = 0; k < 3; k++)
                {
                    if (splits[k] != null)
                        splits[l++] = splits[k];
                }

                if (l == 0)
                {
                    rects[i].width = 0;
                    if (splits[3] != null)
                    {
                        this._add(splits[3], i, size - 1);
                        size = rects.length;
                    }
                    break;
                }

                r = splits[0];
                rects[i] = r;
                cost = (overhead +
					(r.height * lineOverhead) +
					(r.height * r.width));

                if (l > 1)
                {
                    this.insertRects(splits, 1, i + 1, l - 1);
                    size = rects.length;
                }

                if (splits[3] != null)
                {
                    this._add(splits[3], i + l, size - 1);
                    size = rects.length;
                }
            }
        }

        j = 0; i = 0;
        while (i < size)
        {
            if (rects[i].width == 0)
                rects[i] = null;
            else
                rects[j++] = rects[i];
            i++;
        }
        rects.length = j;
        this._bounds = null;
    };

    _pGraphicsRectsManager.splitRect = function (r, sr, splits)
    {
        var rx0 = r.left;
        var rx1 = rx0 + r.width - 1;
        var ry0 = r.top;
        var ry1 = ry0 + r.height - 1;

        var srx0 = sr.left;
        var srx1 = srx0 + sr.width - 1;
        var sry0 = sr.top;
        var sry1 = sry0 + sr.height - 1;

        if ((ry0 < sry0) && (ry1 >= sry0))
        {
            splits[0] = new nexacro.Rect(rx0, ry0, r.width, sry0 - ry0);
            ry0 = sry0;
        }
        else
        {
            splits[0] = null;
        }

        if ((ry0 <= sry1) && (ry1 > sry1))
        {
            splits[1] = new nexacro.Rect(rx0, sry1 + 1, r.width, ry1 - sry1);
            ry1 = sry1;
        }
        else
        {
            splits[1] = null;
        }

        if ((rx0 < srx0) && (rx1 >= srx0))
        {
            splits[2] = new nexacro.Rect(rx0, ry0, srx0 - rx0, ry1 - ry0 + 1);
        }
        else
        {
            splits[2] = null;
        }

        if ((rx0 <= srx1) && (rx1 > srx1))
        {
            splits[3] = new nexacro.Rect(srx1 + 1, ry0, rx1 - srx1, ry1 - ry0 + 1);
        }
        else
        {
            splits[3] = null;
        }
    };

    _pGraphicsRectsManager.insertRects = function (rects, srcPos, dstPos, len)
    {
        if (len == 0) return;

        var innerRects = this._rects,
			size = innerRects.length;
        innerRects.length = (size + len);

        for (var i = size - 1; i >= dstPos; i--)
            innerRects[i + len] = innerRects[i];

        nexacro._ChartGraphicsLibArray.arrayCopy(rects, srcPos, innerRects, dstPos, len);
        //size += len;
    };

    _pGraphicsRectsManager.Each = function (fn, scope)
    {
        var rects = this._rects,
			size = rects.length;

        scope = scope || this;
        for (var i = 0 ; i < size ; i++)
        {
            fn.call(scope, rects[i]);
        }
    };

}

if (!nexacro._ChartGraphicsSize)
{
    nexacro._ChartGraphicsSize = function (w, h)
    {
        var type = typeof w;
        if (type == 'number')
        {
            var hasHeight = typeof h === 'number';
            this.width = w;
            this.height = hasHeight ? h : w;
            this.__readArgs = hasHeight ? 2 : 1;
        }
        else if (type == 'undefined' || w === null)
        {
            this.width = this.height = 0;
            this.__readArgs = w === null ? 1 : 0;
        }
        else
        {
            if (nexacro._ChartGraphicsLib.isArray(w))
            {
                this.width = w[0];
                this.height = w.length > 1 ? w[1] : w[0];
                this.__readArgs = 1;
            }
            else if (w.width != null)
            {
                this.width = w.width;
                this.height = w.height;
                this.__readArgs = 1;
            }
            else if (w.x != null)
            {
                this.width = w.x;
                this.height = w.y;
                this.__readArgs = 1;
            }
            else
            {
                this.width = this.height = 0;
                this.__readArgs = 0;
            }
        }
    };

    var _pGraphicsSize = nexacro._createPrototype(nexacro.Object, nexacro._ChartGraphicsSize);
    nexacro._ChartGraphicsSize.prototype = _pGraphicsSize;

    nexacro._ChartGraphicsSize.min = function ()
    {
        var sz1 = new this(arguments[0], arguments[1]);
        var readargs = sz1.__readArgs;
        var sz2 = new this(arguments[readargs], arguments[readargs + 1]);
        return new this(
				Math.min(sz1.width, sz2.width),
				Math.min(sz1.height, sz2.height)
			);
    };

    nexacro._ChartGraphicsSize.max = function ()
    {
        var sz1 = new this(arguments[0], arguments[1]);
        var readargs = sz1.__readArgs;
        var sz2 = new this(arguments[readargs], arguments[readargs + 1]);
        return new this(
				Math.max(sz1.width, sz2.width),
				Math.max(sz1.height, sz2.height)
			);
    };

    nexacro._ChartGraphicsSize.random = function ()
    {
        return new this(Math.random(), Math.random());
    };

    _pGraphicsSize.width = 0;
    _pGraphicsSize.height = 0;

    _pGraphicsSize.set_width = function (v)
    {
        if (isNumber(v) && this.width != v)
        {
            this.width = v;
        }
    };

    _pGraphicsSize.set_height = function (v)
    {
        if (isNumber(v) && this.height != v)
        {
            this.height = v;
        }
    };

    _pGraphicsSize.set = function (w, h)
    {
        this.set_width(w);
        this.set_height(h);
        return this;
    };

    _pGraphicsSize.equals = function (sz)
    {
        return sz === this || sz && (this.width === sz.width
				&& this.height === sz.height
				|| nexacro._ChartGraphicsLib.isArray(sz) && this.width === sz[0]
					&& this.height === sz[1]) || false;
    };

    _pGraphicsSize.clone = function ()
    {
        return new nexacro._ChartGraphicsSize(this.width, this.height);
    };

    _pGraphicsSize.toString = function ()
    {
        return '{ width: ' + nexacro._ChartGraphicsClassUtils.fmtNumber(this.width)
				+ ', height: ' + nexacro._ChartGraphicsClassUtils.fmtNumber(this.height) + ' }';
    };

    _pGraphicsSize.add = function (sz)
    {
        if (!(sz instanceof nexacro._ChartGraphicsSize))
        {
            sz = new nexacro._ChartGraphicsSize(arguments[0], arguments[1]);
        }
        return new nexacro._ChartGraphicsSize(this.width + sz.width, this.height + sz.height);
    };

    _pGraphicsSize.subtract = function (sz)
    {
        if (!(sz instanceof nexacro.Size))
        {
            sz = new nexacro._ChartGraphicsSize(arguments[0], arguments[1]);
        }
        return new nexacro._ChartGraphicsSize(this.width - sz.width, this.height - sz.height);
    };

    _pGraphicsSize.multiply = function (sz)
    {
        if (!(sz instanceof nexacro._ChartGraphicsSize))
        {
            sz = new nexacro._ChartGraphicsSize(arguments[0], arguments[1]);
        }
        return new nexacro._ChartGraphicsSize(this.width * sz.width, this.height * sz.height);
    };

    _pGraphicsSize.divide = function (sz)
    {
        if (!(sz instanceof nexacro._ChartGraphicsSize))
        {
            sz = new nexacro._ChartGraphicsSize(arguments[0], arguments[1]);
        }
        return new nexacro._ChartGraphicsSize(this.width / sz.width, this.height / sz.height);
    };

    _pGraphicsSize.modulo = function (sz)
    {
        if (!(sz instanceof nexacro._ChartGraphicsSize))
        {
            sz = new nexacro._ChartGraphicsSize(arguments[0], arguments[1]);
        }
        return new nexacro._ChartGraphicsSize(this.width % sz.width, this.height % sz.height);
    };

    _pGraphicsSize.negate = function ()
    {
        return new nexacro._ChartGraphicsSize(-this.width, -this.height);
    };

    _pGraphicsSize.isZero = function ()
    {
        return nexacro._ChartGraphicsMathUtil.isZero(this.width) && nexacro._ChartGraphicsMathUtil.isZero(this.height);
    };

    _pGraphicsSize.isNaN = function ()
    {
        return isNaN(this.width) || isNaN(this.height);
    };

    _pGraphicsSize.round = function ()
    {
        return new nexacro._ChartGraphicsSize(Math.round(this.width), Math.round(this.height));
    };

    _pGraphicsSize.ceil = function ()
    {
        return new nexacro._ChartGraphicsSize(Math.ceil(this.width), Math.ceil(this.height));
    };

    _pGraphicsSize.floor = function ()
    {
        return new nexacro._ChartGraphicsSize(Math.floor(this.width), Math.floor(this.height));
    };

    _pGraphicsSize.abs = function ()
    {
        return new nexacro._ChartGraphicsSize(Math.abs(this.width), Math.abs(this.height));
    };

}

if (!nexacro._ChartGraphicsObject)
{
    nexacro._ChartGraphicsObject = function (x, y)
    {
        // this.parent = parent; // readonly 속성으로 제공
        nexacro._ChartGraphicsHashMap.getHashKey("ge", this);
        this._matrix = new nexacro._ChartGraphicsMatrix();
        this._drawflags = 0; // 4 + 2 + 8 + 1 + 16 + 64
        this._painted = 0;
        this._style = {};
        var read = 0,
			args = arguments,
			argslen = args.length;
        var pt;
        if (argslen > 0)
        {
            if (x instanceof nexacro.Point)
            {
                read++;
                this._matrix.translate(x);
                this.x = x.x;
                this.y = x.y;
                this._drawflags |= 1;
            }
            else if (argslen >= 2)
            {
                this.x = x;
                this.y = y;
                pt = new nexacro.Point(x, y);
                this._matrix.translate(pt);
                this._drawflags |= 1;
                read += 2;
            }
        }
        else
        {
            this.x = 0;
            this.y = 0;
        }
        this.__readArgs = read;
        this._childidx_map = {};
        this.childlength = 0;
    };

    var _pGraphicsObject = nexacro._ChartGraphicsObject.prototype = nexacro._createPrototype(nexacro.Object, nexacro._ChartGraphicsObject);
    _pGraphicsObject._type_name = "_GraphicsObject";

    // Property	
    _pGraphicsObject.id = ""; // nexacro _pObject.set_id()
    _pGraphicsObject.strokepen = "";
    _pGraphicsObject.fillstyle = "";
    _pGraphicsObject.x = 0;
    _pGraphicsObject.y = 0;
    _pGraphicsObject.cx = 0;
    _pGraphicsObject.cy = 0;
    _pGraphicsObject.visible = true;
    _pGraphicsObject.opacity = 1;
    _pGraphicsObject.strokejoin = "miter";

    // 삭제?
    _pGraphicsObject.strokecap = "";
    _pGraphicsObject.miterlimit = 1;

    //internal variables
    _pGraphicsObject._id = "";
    _pGraphicsObject._center = "";
    _pGraphicsObject._clipitems = "";
    _pGraphicsObject._nextsibling = null;
    _pGraphicsObject._previoussibling = null;
    _pGraphicsObject._firstchild = null;
    _pGraphicsObject._isfirstchild = "";
    _pGraphicsObject._nonscalingstroke = ""; // 추후 검토 후 노출

	// 8.20-1 Shadow
	_pGraphicsObject.set_shadow = function (val) {
		var s = this._style, oldval = this.shadow, oldobj, newobj;

		if (oldval != val) {
			this.shadow = val;
			oldobj = s.shadow;

			if (val) {
				if (oldobj == null || oldobj.value != val) {
					newobj = nexacro.ShadowObjectNew(val);
					s.shadow = newobj;
				}
			}
			else {
				if (oldobj) {
					s.shadow = null;
				}
			}

			this._drawflags |= 8;
			this._changedShadow = true;
		}
	};
	
    //============================================================
    // nexacro._ChartGraphicsObject : Properties
    //============================================================
    _pGraphicsObject.set_strokepen = function (val)
    {
        var s = this._style,
			oldval = this.strokepen,
			oldobj, newobj;

        if (oldval != val)
        {
            this.strokepen = val;
            oldobj = s.strokepen;

            if (val)
            {
                if (oldobj == null || oldobj.value != val)
                {
                    newobj = nexacro.BorderLineObject(val);
                    s.strokepen = newobj;
                }
            }
            else
            {
                if (oldobj)
                {
                    s.strokepen = null;
                }
            }

            this._drawflags |= 8; //stylechanged
            if (newobj)
            {
                var lineW = newobj._width || 0;
                if (this._strokewidth != lineW)
                {
                    this._strokewidth = lineW;
                    if (lineW % 2) this._isOddStrokeWidth = true;
                    else this._isOddStrokeWidth = false;
                    this._bounds = null;
                    this._globalBounds = null;
                }
            }
            else
            {
                if (this._strokewidth != 0)
                {
                    this._strokewidth = 0;
                    this._isOddStrokeWidth = false;
                }
            }
            this._changedStrokepen = true;
        }
    };

    _pGraphicsObject.set_fillstyle = function (val)
    {
        var s = this._style,
			oldval = this.fillstyle,
			oldobj, newobj;
        
        if (oldval != val)
        {
            this._isGradation = false;
            this.fillstyle = val;
            oldobj = s.fillstyle;

            if (val)
            {
                if (oldobj == null || oldobj.value != val)
                {
                    newobj = nexacro.BackgroundObject(val);
                    s.fillstyle = newobj;
                }
            }
            else
            {
                if (oldobj)
                {
                    s.fillstyle = null;
                }
            }

            this._drawflags |= 8; //stylechanged
            this._changedFillstyle = true;

            if (newobj && newobj.gradient)
            {
				newobj.gradient._parseInfo(newobj.value);
                this._isGradation = true;
            }
        }
    };

    _pGraphicsObject.set_strokejoin = function (val)
    {
        var s = this._style,
			oldval = this.strokejoin,
			oldobj, newobj;

        if (oldval != val)
        {
            this.strokejoin = val;
            oldobj = s.strokejoin;

            if (val)
            {
                if (oldobj == null || oldobj.value != val)
                {
                    newobj = nexacro.CSSValueObject(val);
                    s.strokejoin = newobj;
                }
            }
            else
            {
                if (oldobj)
                {
                    s.strokejoin = null;
                }
            }

            this._drawflags |= 8; //stylechanged
            this._changedStrokejoin = true;
        }
    };

    _pGraphicsObject.set_strokecap = function (val)
    {
        var s = this._style,
			oldval = this.strokecap,
			oldobj, newobj;

        if (oldval != val)
        {
            this.strokecap = val;
            oldobj = s.strokecap;

            if (val)
            {
                if (oldobj == null || oldobj.value != val)
                {
                    newobj = nexacro.CSSValueObject(val);
                    s.strokecap = newobj;
                }
            }
            else
            {
                if (oldobj)
                {
                    s.strokecap = null;
                }
            }

            this._drawflags |= 8; //stylechanged
            this._changedStrokecap = true;
        }
    };

    _pGraphicsObject.set_miterlimit = function (val)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(val))
        {
            return;
        }

        if (val != this.miterlimit)
        {
            this.miterlimit = val;
            this._drawflags |= 8; //stylechanged
            this._changedMiterlimit = true;
        }
    };

    _pGraphicsObject.set_visible = function (v)
    {
        if (v == null) //default
        {
            v = true;
        }

        v = nexacro._toBoolean(v);

        if (v !== this.visible)
        {
            this.visible = v;
            var p = this.parent;
            if (p)
            {
                p._drawflags |= 4;
            }
        }

    };

    _pGraphicsObject.set_id = function (v)
    {
        if (v != this.id)
        {
            this.id = this._id = v;
        }
    };

    _pGraphicsObject.set_opacity = function (v)
    {
        if (v == null) //default
        {
            this.opacity = 1;
            return;
        }
        else if (v < 0)
        {
            this.opacity = 0;
            return;
        }

        this.opacity = v;
    };

    _pGraphicsObject.set_x = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }

        if (v != this.x)
        {
            this.translate(v - this.x, 0);
            this.x = v;
            var pos = this.getCenter();
            this.cx = pos.x;
        }
    };

    _pGraphicsObject.set_y = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }

        if (v != this.y)
        {
            this.translate(0, v - this.y);
            this.y = v;
            var pos = this.getCenter();
            this.cy = pos.y;
        }
    };

    _pGraphicsObject.set_cx = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }

        if (v != this.cx)
        {
            var pos = this.getCenter();
            if (pos.x != v)
            {
                this.translate(v - pos.x, 0);
                this.cx = v;
                this.x += (v - pos.x);
            }
        }
    };

    _pGraphicsObject.set_cy = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }

        if (v != this.cy)
        {
            var pos = this.getCenter();
            if (pos.y != v)
            {
                this.translate(0, v - pos.y);
                this.cy = v;
                this.y += (v - pos.y);
            }
        }
    };

    // 검토 후 제공
    // _pGraphicsObject.set_nonscalingstroke = function (v)
    // {
    // var argsLen = arguments.length;
    // if ( argsLen == 0 ) return;
    // if ( v == null ) //default
    // {
    // v = false;
    // }
    // var booleanVal = !!v;
    // if ( booleanVal !== this.nonscalingstroke )
    // {
    // this.nonscalingstroke = booleanVal;
    // this._drawflags |= 8; //stylechanged
    // }
    // };

    //============================================================
    // nexacro._ChartGraphicsObject : methods
    //============================================================
    _pGraphicsObject.setClipPathBaseRect = function (x,y,baserect,offsetw,offseth)
	{
		var baseWidth = baserect.width -offsetw;
		var baseHeight = baserect.height - offseth;
		
		
		this.setClipPath(new nexacro.Rect(-x,-y,baseWidth,baseHeight));
		
	};
    _pGraphicsObject.setClipPath = function (v)
    {
        if (!v) return;
		if (!(v instanceof nexacro.Rect))
		{
			// Eco.Logger.error("현재는 argument로 Eco.Rectangle만 지원한다!!");
			return;
		}
        var clipitems = this._clipitems;
        if (!clipitems)
        {
            clipitems = [];
            this._clipitems = clipitems;
        }
        clipitems.push(v);
    };

    _pGraphicsObject.setPoint = function (v)
    {
        if (v != this._point)
        {
            var argLen = arguments.length;
            if (argLen == 0) return;
            if (v == null) //default
            {
                this.translate(-this.x, -this.y);
                this.x = 0;
                this.y = 0;
            }
            else if (!(v instanceof nexacro.Point))
            {
                var y = arguments[1];
                if (this.x != v || this.y != y)
                {
                    this.translate(v - this.x, y - this.y);
                    this.x = v;
                    this.y = y;
                }
            }
            else
            {
                if (this.x != v.x || this.y != v.y)
                {
                    this.translate(v.x - this.x, v.y - this.y);
                    this.x = v.x;
                    this.y = v.y;
                }
            }
        }

    };

    _pGraphicsObject.setCenter = function (v)
    {
        var argLen = arguments.length;
        var pt;
        if (argLen == 0) return;
        if (v == null) //default
        {
            pt = new nexacro.Point();
        }
        else if (!(v instanceof nexacro.Point))
        {
            pt = new nexacro.Point(arguments[0], arguments[1]);
        }
		else
		{
			pt = v;
		}
        this.translate(pt.subtract(this.getCenter()));
    };

    _pGraphicsObject.getNextSibling = function ()
    {
        return this._nextsibling;
    };

    _pGraphicsObject.getPreviousSibling = function ()
    {
        return this._isfirstchild ? null : this._previoussibling;
    };

    _pGraphicsObject.getCX = function ()
    {
        var pos,
		pt;
        if (this instanceof nexacro.ChartGraphicsGroup)
        {
            pt = this.getBoundRect().getCenterPoint();
            pos = this._center = new nexacro.Point(pt.x, pt.y);
        }
        else
        {
            pos = this._center;
            if (!pos)
            {
                pt = this.getBoundRect().getCenterPoint();
                pos = this._center = new nexacro.Point(pt.x, pt.y);
            }
        }

        return pos.x;
    };

    _pGraphicsObject.getCY = function ()
    {
        var pos,
			pt;
        if (this instanceof nexacro.ChartGraphicsGroup)
        {
            pt = this.getBoundRect().getCenterPoint();
            pos = this._center = new nexacro.Point(pt.x, pt.y);
        }
        else
        {
            pos = this._center;
            if (!pos)
            {
                pt = this.getBoundRect().getCenterPoint();
                pos = this._center = new nexacro.Point(pt.x, pt.y);
            }
        }

        return pos.y;
    };

    _pGraphicsObject.getCenter = function (bArray)
    {
        var pos,
		pt;
        if (this instanceof nexacro.ChartGraphicsGroup)
        {
            pt = this.getBoundRect().getCenterPoint();
            pos = this._center = new nexacro.Point(pt.x, pt.y);
        }
        else
        {
            pos = this._center;
            if (!pos)
            {
                pt = this.getBoundRect().getCenterPoint();
                pos = this._center = new nexacro.Point(pt.x, pt.y);
            }
        }

        if (bArray)
        {
            return [pos.x, pos.y];
        }
        else
        {
            return pos;
        }
    };

    _pGraphicsObject.getPoint = function (bArray)
    {
        if (bArray)
        {
            return [this.x, this.y];
        }
        else
        {
            return new nexacro.Point(this.x, this.y);
        }
    };

    _pGraphicsObject.getClipPath = function ()
    {
        return this._clipitems;
    };

    // transform 속성의 getter가 기존 _getTransform함수와 명칭이 중복됨
    // 현재 transform 내부에서 사용하는 경우는 없음 - getter 함수명과 다르게 지정하도록 변경 필요
    // _pGraphicsObject.getTransform = function () 
    // {
    // return this._getTransform();
    // };

    // matrix 속성 삭제 -> 필요 시 내부함수로 변경
    // _pGraphicsObject.getMatrix = function ()
    // {
    // return this._matrix;
    // };

    // 검토 후 제공
    // _pGraphicsObject.getNonScalingStroke = function ()
    // {
    // return this.nonscalingstroke;
    // };

    _pGraphicsObject.getBoundRect = function (bCopy, iscurrent)
    {
        var bounds = this._bounds;
        if (iscurrent)
        {
            bounds = null;
        }
        if (bounds) return bounds;
		
        var rect = this._getRect(true, iscurrent);
        if (rect)
        {
            bounds = this._matrix._transformBounds(rect, null, this.id);
            if (!iscurrent) this._bounds = bounds;
        }
        if (bCopy)
        {
			if(bounds)
			{
				return bounds.clone();
			}
        }
        else
        {
            return bounds;
        }
    };

    _pGraphicsObject.translate = function (pt)
    {
        var m = new nexacro._ChartGraphicsMatrix();
        if (!((typeof pt) == "object") && (pt instanceof nexacro.Point))
        {
            pt = new nexacro.Point(arguments[0], arguments[1]);
        }
        m.translate(pt);
        return this.transform(m);
    };

    _pGraphicsObject.setTransform = function (v)
    {
        if (nexacro._isString(v))
        {
            this._toTransform(v);
        }
        else // setTransform(메트릭스값 초기화) TODO
        {
            // if ( v == null ) //default
            // {
            // v = new nexacro._ChartGraphicsMatrix();
            // }
            // // this._matrix.initialize(v);
            // this._matrix.constructor(v);
            // this._drawflags |= 1; //matrixchanged
        }
    };

    // 사용자 미노출, 내부에서 필요 시 내부함수로 
    // nexacroObject 상속 시 toString() 오버라이딩해서 사용 필요
    // DataUtil Class의 containsKey()에서 사용
    _pGraphicsObject.toString = function ()
    {
        return this._type_name + "#" + (this.id ? this.id + "(" + this._hashKey + ")" : this._hashKey);
    };

    // 1차에서 미제공
    // _pGraphicsObject.clone = function (deep)
    // {
    // var newElem = new this.constructor();
    // //속성들 복사 처리필요.
    // if ( deep )
    // {
    // var child = this._firstchild;
    // for ( ; child != null ; child = child._nextsibling)
    // {
    // newElem.appendChild(child.clone(true));
    // }
    // }
    // return newElem;
    // };

    _pGraphicsObject.isEmpty = function ()
    {
        return !(this._firstchild != null);
    };

    _pGraphicsObject.getGlobalBoundRect = function (bCopy, iscurrent)
    {
        var bounds = this._globalBounds;
        if (iscurrent)
        {
            bounds = null;
        }
        if (bounds)
        {
            if (bCopy)
                return bounds.clone();
            else
                return bounds;
        }

        var rect = this._getRect(true, iscurrent);
        if (rect)
        {
            if (iscurrent)
            {
                var elems = [this], p = this.parent,
					pLayerCls = nexacro._ChartGraphicsLayer, m;
                while (p)
                {
                    elems.unshift(p);
                    if (p instanceof pLayerCls)
                    {
                        break;
                    }
                    p = p.parent;
                }
                for (var i = 0, len = elems.length ; i < len ; i++)
                {
                    if (i == 0)
                    {
                        if (elems[i] instanceof pLayerCls)
                        {
                            m = (elems[i]._matrix ? (elems[i].parent._matrix.clone()).concatenate(elems[i]._matrix) : elems[i].parent._matrix.clone());
                        }
                        else
                        {
                            m = elems[i]._matrix.clone();
                        }
                    }
                    else
                    {
                        m = (m.clone()).concatenate(elems[i]._matrix);
                    }
                }
				if(m)
				{
					bounds = m._transformBounds(rect, null, this.id);
				}
            }
            else
            {
                bounds = (this._globalMatrix || this._matrix)._transformBounds(rect, null, this.id);
                this._globalBounds = bounds;
            }
        }
        if (bCopy)
        {
			if(bounds)
			{
				return bounds.clone();
			}
        }
        else
        {
            return bounds;
        }
    };

    _pGraphicsObject.scale = function (x, y, center)
    {
        if (arguments.length < 2 || (y instanceof nexacro.Point))
        {
            center = y;
            y = x;
        }
        var m = new nexacro._ChartGraphicsMatrix();
        this.transform(m.scale(x, y, center || this.getCenter()));
    };

    _pGraphicsObject.translate = function (pt)
    {
        var m = new nexacro._ChartGraphicsMatrix();
        if (!(pt instanceof nexacro.Point))
        {
            pt = new nexacro.Point(arguments[0], arguments[1]);
        }
        m.translate(pt);
        return this.transform(m);
    };

    _pGraphicsObject.rotate = function (angle, center)
    {
        if (arguments.length == 3)
        {
            center = new nexacro.Point(arguments[1], arguments[2]);
        }
        var m = new nexacro._ChartGraphicsMatrix();
        this.transform(m.rotate(angle, center || this.getCenter()));
    };

    _pGraphicsObject.shear = function (x, y, center)
    {
        if (arguments.length < 2 || (y instanceof nexacro.Point))
        {
            center = y;
            y = x;
        }
        var m = new nexacro._ChartGraphicsMatrix();
        this.transform(m.shear(x, y, center || this.getCenter()));
    };

    _pGraphicsObject.transform = function (m)
    {
        var bounds = this._bounds,
			pos = this._center;

        this._matrix.preConcatenate(m);

        this._drawflags |= 1; //matrixchanged
        if (bounds && m.getRotation() % 90 === 0)
        {
            m._transformBounds(bounds, bounds, this.id);
            var pt = bounds.getCenterPoint();
            this._center = new nexacro.Point(pt.x, pt.y);
        }
        else if (pos)
        {
            this._center = m._transformPoint(pos, pos);
        }
    };

    _pGraphicsObject.hitTest = function (pt)
    {
        var rect = this._getRect();
        if (rect)
        {
            return rect.containsPoint(pt);
        }
        return false;
    };

    _pGraphicsObject._reMoveParent = function ()
    {
        var parent = this.parent;
        if (parent)
        {
            var re = parent.removeChild(this);
            if (re != this)
            {
                return false;
            }

            delete parent._idCache;
            delete parent._children;
            delete parent._totalItems;
        }
    };
    _pGraphicsObject.destroy = function ()
    {

        this._reMoveParent();

        this.id = null;
        this.strokepen = null;
        this.fillstyle = null;
        this.x = null;
        this.y = null;
        this.cx = null;
        this.cy = null;
        this.visible = null;
        this.opacity = null;
        this.strokejoin = null;
        this.cursor = null;
        this.strokecap = null;
        this.miterlimit = null;

        this._id = null;
        this._center = null;
        this._clipitems = null;
        this._nextsibling = null;
        this._previoussibling = null;
        this._firstchild = null;
        this._isfirstchild = null;
        this._nonscalingstroke = null;

        this._matrix = null;
        this._drawflags = null;
        this._painted = null;
        this._type = null;
        this.__readArgs = null;

        this._childidx_map = null;

        nexacro.Object.prototype.destroy.call(this);
        return true;
    };

    //===============================================================
    // nexacro.ChartGraphicsObject : Logical part
    //===============================================================
    _pGraphicsObject._getItemById = function (val)
    {
		var elem;
        if (this._firstchild)
        {
            var idCache = this._idCache;
            if (!idCache || idCache._childchanged != this._childchanged)
            {
                idCache = {};
                this._idCache = idCache;
                idCache._childchanged = this._childchanged;
                elem = this._firstchild;
                for (; elem ; elem = elem._nextsibling)
                {
                    if (elem._id)
                    {
                        idCache[elem._id] = elem;
                    }
                }
            }
            var res = idCache[val];
            if (!res)
            {
                elem = this._firstchild;
                for (; elem ; elem = elem._nextsibling)
                {
                    if (elem._firstchild)
                    {
                        res = elem._getItemById(val);
                        if (res)
                        {
                            break;
                        }
                    }
                }
                return res;
            }
            return res;
        }
    };

    _pGraphicsObject._overrideChild = function (newChild, refChild)
    {
        this._insertBefore(newChild, refChild, true);
        this._removeChild(refChild, true);
    };

    _pGraphicsObject._insertBefore = function (newChild, refChild, no_check_id)
    {
        if (!no_check_id && this._childidx_map[newChild.id])
        {
            throw nexacro.MakeNativeError(this, "native_exist_id", newChild.id);
            //return;
        }

        if (refChild && refChild.parent != this)
        {
            trace("refChild' parent error");
            return;
        }
        if (newChild == refChild)
        {
            refChild = refChild.getNextSibling();
            this.removeChild(newChild);
            this.insertChild(newChild, refChild);
            return newChild;
        }

        var oldparent = newChild.parent;
        if (oldparent)
        {
            oldparent.removeChild(newChild);
        }

        newChild.parent = this;

        if (!no_check_id)
            this._childidx_map[newChild.id] = true;

        this.childlength++;

        if (!this._firstchild)
        {
            this._firstchild = newChild;
            newChild._isfirstchild = true;
            newChild._previoussibling = newChild;
        }
        else
        {
            if (!refChild) //add
            {
                var lastChild = this._firstchild._previoussibling;
                lastChild._nextsibling = newChild;
                newChild._previoussibling = lastChild;
                this._firstchild._previoussibling = newChild;
            }
            else //insert
            {
                var firstChild = this._firstchild;
                if (refChild == firstChild)
                {
                    firstChild._isfirstchild = false;
                    newChild._nextsibling = firstChild;
                    newChild._previoussibling = firstChild._previoussibling;
                    firstChild._previoussibling = newChild;
                    this._firstchild = newChild;
                    newChild._isfirstchild = true;
                }
                else
                {
                    var prev = refChild._previoussibling;
                    newChild._nextsibling = refChild;
                    prev._nextsibling = newChild;
                    refChild._previoussibling = newChild;
                    newChild._previoussibling = prev;
                }
            }
        }
        this._childchanged++; //childchanged
        this._drawflags |= 4; //boundchanged
        var layer = this._getOwnerLayer();
        if (layer)
        {
            layer._onTreeChanged();
        }
        var childListCache = this._childListCache;
        if (childListCache)
        {
            if (childListCache.flength != -1)
            {
                childListCache.flength++;
            }
            if (childListCache.fchildindex != -1)
            {
                if (refChild && childListCache.fchild == refChild)
                {
                    childListCache.fchild = newChild;
                }
                else
                {
                    childListCache.fchildindex = -1;
                    //childListCache.fchild = null;
                }
            }
        }
        return newChild;
    };

    _pGraphicsObject._removeChild = function (oldChild, no_check_id)
    {
        if (oldChild && oldChild.parent != this)
        {
            // Eco.Logger.error("oldChild' parent가 호출하는 this와 동일해야 한다!");
        }

        var childListCache = this._childListCache;
        if (childListCache)
        {
            if (childListCache.flength != -1)
            {
                childListCache.flength--;
            }
            if (childListCache.fchildindex != -1)
            {
                if (childListCache.fchild == oldChild)
                {
                    childListCache.fchildindex--;
                    childListCache.fchild = oldChild.getPreviousSibling();
                }
                else
                {
                    childListCache.fchildindex = -1;
                    //childListCache.fchild = null;
                }
            }
        }
        if (oldChild == this._firstchild)
        {
            oldChild._isfirstchild = false;
            this._firstchild = oldChild._nextsibling;
            var firstChild = this._firstchild;
            if (firstChild)
            {
                firstChild._isfirstchild = true;
                firstChild._previoussibling = oldChild._previoussibling;
            }
        }
        else
        {
            var prev = oldChild._previoussibling;
            var next = oldChild._nextsibling;
            prev._nextsibling = next;
            if (!next)
            {
                this._firstchild._previoussibling = prev;
            }
            else
            {
                next._previoussibling = prev;
            }
        }

        if (!no_check_id)
            this._childidx_map[oldChild.id] = undefined;

        this.childlength--;

        oldChild._remove(true);
        oldChild.parent = null;
        oldChild._nextsibling = null;
        oldChild._previoussibling = null;
        this._childchanged++;
        this._drawflags |= 4; //boundchanged
        var layer = this._getOwnerLayer();
        if (layer)
        {
            layer._onTreeChanged();
        }
        return oldChild;
    };

    _pGraphicsObject._getStrokeWidth = function ()
    {
        return this._strokewidth || 0;
    };

    _pGraphicsObject._getRect = function (bStrokeWidth, iscurrent)
    {
        var child = this._firstchild;
        if (!child)
        {
            return new nexacro.Rect();
        }
        var rect = this._rect;
        if (iscurrent)
        {
            rect = null;
        }
        if (!rect)
        {
            var x1 = Infinity,
				x2 = -x1,
				y1 = x1,
				y2 = x2;

            for (; child != null ; child = child._nextsibling)
            {
                if (child.visible && !child.isEmpty())
                {
                    rect = child.getBoundRect(false, iscurrent);
                    x1 = Math.min(rect.left, x1);
                    y1 = Math.min(rect.top, y1);
                    x2 = Math.max(rect.left + rect.width, x2);
                    y2 = Math.max(rect.top + rect.height, y2);
                }
            }
            rect = isFinite(x1) ? new nexacro.Rect(x1, y1, x2 - x1, y2 - y1) : new nexacro.Rect();
            if (!iscurrent) this._rect = rect;
        }
        if (bStrokeWidth)
        {
            rect = rect.expand(this._getStrokeWidth() / 2);
        }
        return rect;
    };

    _pGraphicsObject._getTransform = function ()
    {
        var m = this._matrix.clone(),
			xyM = new nexacro._ChartGraphicsMatrix();

        xyM.translate(-this.x - (this._dx || 0), -this.y - (this._dy || 0));

        m.preConcatenate(xyM);

        if (m.isIdentity())
            return "";

        var fmtNubmer = nexacro._ChartGraphicsClassUtils.fmtNumber;
        var decomposed = m.decompose();
        if (decomposed && !decomposed.shearing)
        {
            var parts = [],
				angle = decomposed.rotation,
				trans = decomposed.translation,
				scale = decomposed.scaling;

            if (!trans.isZero())
                parts.push('translate(' + fmtNubmer(trans.x) + "," + fmtNubmer(trans.y) + ')');
            if (!nexacro._ChartGraphicsMathUtil.isZero(scale.x - 1) || !nexacro._ChartGraphicsMathUtil.isZero(scale.y - 1))
                parts.push('scale(' + fmtNubmer(scale.x) + "," + fmtNubmer(scale.y) + ')');
            if (angle)
                parts.push('rotate(' + fmtNubmer(angle) + ')');
            return parts.join(' ');
        }
        else
        {
            return 'matrix(' + m.getValues().join(',') + ')';
        }
    };

    _pGraphicsObject._toTransform = function (str)
    {
        var attrs = {};
        if (str)
        {
            for (var i in str = str.match(/(\w+\((\-?\d+\.?\d*,?|(\s+?))+\))+/g))
            {
                if (str[i].match)
                {
                    var c = str[i].match(/[\w\.\-]+/g);
                    attrs[c.shift()] = c;
                }
            }
        }
        var m = new nexacro._ChartGraphicsMatrix(), val, shearX, shearY;
        for (var cmd in attrs)
        {
            val = attrs[cmd];
            switch (cmd)
            {
                case "translate":
                    if (val.length == 1)
                    {
                        m.translate(parseFloat(val[0]), 0);
                    }
                    else
                    {
                        m.translate(parseFloat(val[0]), parseFloat(val[1]));
                    }
                    break;
                case "rotate":
                    if (val.length == 1)
                    {
                        m.rotate(parseFloat(val[0]));
                    }
                    else
                    {
                        m.rotate(parseFloat(val[0]), parseFloat(val[1]), parseFloat(val[2]));
                    }
                    break;
                case "scale":
                    if (val.length == 1)
                    {
                        m.scale(parseFloat(val[0]), parseFloat(val[0]));
                    }
                    else
                    {
                        m.scale(parseFloat(val[0]), parseFloat(val[1]));
                    }
                    break;
                case "matrix":
                    m.set(parseFloat(val[0]), parseFloat(val[2]), parseFloat(val[1]), parseFloat(val[3]), parseFloat(val[4]), parseFloat(val[5]));
                    break;
                case "skew":
                    if (val.length == 1)
                    {
                        shearX = shearY = Math.tan(parseFloat(val[0]) * nexacro._ChartGraphicsMatrix.DEGTORAD);
                    }
                    else
                    {
                        shearX = Math.tan(parseFloat(val[0]) * nexacro._ChartGraphicsMatrix.DEGTORAD);
                        shearY = Math.tan(parseFloat(val[1]) * nexacro._ChartGraphicsMatrix.DEGTORAD);
                    }
                    break;
            }
        }
        if (shearX != null || shearY != null)
        {
            m.shear(shearX || 0, shearY || 0);
        }
        if (this._type)
        {
            m.translate(this.x + (this._dx || 0), this.y + (this._dy || 0));
            // this.set_matrix(m);
            //if (m == null) //default
            //{
            //    m = new nexacro._ChartGraphicsMatrix();
            //}
            // this._matrix.initialize(v);
            this._matrix.constructor(m);
            this._drawflags |= 1; //matrixchanged
        }
        return m;
    };

    _pGraphicsObject._setOldGlobalBounds = function ()
    {
        if ((this._painted & (1 | 2 | 4)) && !this._oldGlobalBounds)
        {
            this._oldGlobalBounds = this.getGlobalBoundRect(true);
        }
    };

    _pGraphicsObject._getOwnerLayer = function ()
    {
        var ownerLayer = this._ownerLayer;
        if (!ownerLayer)
        {
            var p = this.parent,
				pLayerCls = nexacro._ChartGraphicsLayer;
            while (p)
            {
                if (p instanceof pLayerCls)
                {
                    ownerLayer = p;
                    break;
                }
                p = p.parent;
            }
            this._ownerLayer = ownerLayer;
        }
        return ownerLayer;
    };

    _pGraphicsObject._updateStyles = function (ctx, sizeChanged)
    {
        var sysstyle = this._renderstyle;
        if (!sysstyle)
        {
            sysstyle = {};
            this._renderstyle = sysstyle;
        }
        var style = this._style;
		// 8.20-1 Shadow
		if (this._changedShadow) {
			this._updateShadow(style.shadow, sysstyle);
			this._changedShadow = false;
		}		
        if (this._changedStrokepen)
        {
            this._updateStrokePen(style.strokepen, sysstyle);
            this._changedStrokepen = false;
        }
        if (this._changedFillstyle || sizeChanged)
        {
            this._updateFill(style.fillstyle, sysstyle, ctx);
            this._changedFillstyle = false;
        }

        ctx.setElementGlobalAlpha(this._globalAlpha);

        if (this._changedStrokejoin)
        {
            this._updateStrokeJoin(style.strokejoin, sysstyle);
            this._changedStrokejoin = false;
        }

        if (this._changedStrokecap)
        {
            this._updateStrokeCap(style.strokecap, sysstyle);
            this._changedStrokecap = false;
        }

        if (this._changedMiterlimit)
        {
            sysstyle._miterlimit = parseInt(this.miterlimit);
            this._changedMiterlimit = false;
        }
    };

    if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
    {
        // TODO - 미지원 경고메세지 추가
    }
    else
    {
        _pGraphicsObject._updateStrokePen = function (strokePenObj, sys_style)
        {
             if (strokePenObj)
            {
                var canvasval = strokePenObj._syscanvasval;
                if (!canvasval)
                {
                    var substyle = strokePenObj.style;
                    canvasval = {};
                    if (substyle == "none")
                    {
                        canvasval._width = null;
                        canvasval._strokecolor = null;
                    }
					else
					{
						canvasval._width = strokePenObj._width;
                        canvasval._strokecolor = strokePenObj.color;
						canvasval._linetype = substyle;
					}
                    /*else if (substyle == "solid")
                    {
                        canvasval._width = strokePenObj._width;
                        canvasval._strokecolor = strokePenObj.color;
                        canvasval._dasharr = null;
                        canvasval._dashoffset = null;
                    }
                    else
                    {
                        canvasval._width = strokePenObj._width;
                        canvasval._strokecolor = strokePenObj.color;
                        switch (substyle)
                        {
                            case "dotted":
                                canvasval._dasharr = [1, 2];
                                canvasval._dashoffset = 2;
                                break;
                            case "dashed":
                                canvasval._dasharr = [4, 2];
                                canvasval._dashoffset = 2;
                                break;
                            default:
                                canvasval._dasharr = null;
                                canvasval._dashoffset = null;
                                break;
                        }
                    }*/
                    strokePenObj._syscanvasval = canvasval;
                }
				sys_style._linetype = canvasval._linetype;
                sys_style._width = canvasval._width;
                sys_style._strokecolor = canvasval._strokecolor;
               // sys_style._dasharr = canvasval._dasharr;
               // sys_style._dashoffset = canvasval._dashoffset;
            }
            else
            {
                sys_style._width = null;
                sys_style._strokecolor = null;
				sys_style._linetype = "none";
               // sys_style._dasharr = null;
               // sys_style._dashoffset = null;
            }
        };
		// 8.20-1 Shadow
		_pGraphicsObject._updateShadow = function (shadowObj, sys_style) {
			if (shadowObj) {
				var canvasval = shadowObj._syscanvasval;
				if (!canvasval) {
					//var substyle = shadowObj.style;
					canvasval = {
					};
					canvasval._shadow = shadowObj;
					shadowObj._syscanvasval = canvasval;
				}
				sys_style._shadow = canvasval._shadow;
			}
			else {
				sys_style._shadow = null;
			}
		};		
    }

    _pGraphicsObject._updateFill = function (fillstyleObj, sys_style, ctx)
    {
        if (fillstyleObj)
        {
            var canvasval = fillstyleObj._syscanvasval;
			
            if (!canvasval || this._isGradation)
            {
                if (this._isGradation)
                {
                    var fillGradationObj;
                    fillGradationObj = fillstyleObj.gradient;

                    if (fillGradationObj)
                    {
                        var gradationsubstyle = fillGradationObj.style,
							gradationpoint = fillGradationObj.point,
							startPt, endPt,
							ctxGradient;

                        var bounds = this._getRect();
                        if (gradationsubstyle == "linear")
                        {
                            startPt = new nexacro.Point(bounds.width * gradationpoint.startX / 100, bounds.height * gradationpoint.startY / 100);
                            endPt = new nexacro.Point(bounds.width * gradationpoint.endX / 100, bounds.height * gradationpoint.endY / 100);

                            startPt.x += bounds.left;
                            startPt.y += bounds.top;
                            endPt.x += bounds.left;
                            endPt.y += bounds.top;
                           
                            ctxGradient = ctx.createLinearGradient(startPt.x, startPt.y, endPt.x, endPt.y);
                           
                            nexacro._ChartGraphicsLibArray.forEach(fillGradationObj.color_stops, function (o, index)
                            {
                                ctxGradient.addColorStop(o.percents, o.color);
                            });

                            canvasval = ctxGradient;
                        }
                        else if (gradationsubstyle == "radial")
                        {
							// PIE 8.28
							if(gradationpoint.centerX !== undefined)
							{
								ctxGradient = ctx.createRadialGradient(gradationpoint.centerX, gradationpoint.centerY, 
												gradationpoint.innerRadius, gradationpoint.centerX, 
												gradationpoint.centerY, gradationpoint.radius);
							   
								nexacro._ChartGraphicsLibArray.forEach(fillGradationObj.color_stops, function (o, index)
								{
									ctxGradient.addColorStop(o.percents, o.color);
								});
							}
							else
							{
								// 8.27
								startPt = new nexacro.Point(bounds.width * gradationpoint.startX / 100, bounds.height * gradationpoint.startY / 100);
								endPt = new nexacro.Point(bounds.width * gradationpoint.endX / 100, bounds.height * gradationpoint.endY / 100);
								startPt.x += bounds.left;
								startPt.y += bounds.top;
								endPt.x += bounds.left;
								endPt.y += bounds.top;
								
								var startRadius = bounds.width * (fillGradationObj.startradius?fillGradationObj.startradius:0);
								var endRadius = bounds.width * (fillGradationObj.endradius?fillGradationObj.endradius:0.9);
								
								ctxGradient = ctx.createRadialGradient(startPt.x, startPt.y, startRadius, endPt.x, endPt.y, endRadius);
							   
								nexacro._ChartGraphicsLibArray.forEach(fillGradationObj.color_stops, function (o, index)
								{
									ctxGradient.addColorStop(o.percents, o.color);
								});
							}

                            canvasval = ctxGradient;
                        }
                        else
                        {
                            canvasval = fillstyleObj.color;
                        }
                    }
                }
                else
                {
                    canvasval = fillstyleObj.color;
                }

                fillstyleObj._syscanvasval = canvasval;
            }
            sys_style._fillcolor = canvasval;
        }
        else
        {
            sys_style._fillcolor = null;
        }
    };

    _pGraphicsObject._updateStrokeJoin = function (strokejoinObj, sys_style)
    {
        if (strokejoinObj)
        {
            var tmpval = strokejoinObj.value;
            sys_style._strokejoin = tmpval;
        }
        else
        {
            sys_style._strokejoin = null;
        }
    };

    _pGraphicsObject._updateStrokeCap = function (strokecapObj, sys_style)
    {
        if (strokecapObj)
        {
            var tmpval = strokecapObj.value;
            if (tmpval == "flat")
            {
                sys_style._strokecap = "butt";
            }
            else
            {
                sys_style._strokecap = tmpval;
            }
        }
        else
        {
            sys_style._strokecap = null;
        }
    };

    _pGraphicsObject._getItemsByFilter = function (propNm, val)
    {
        if (this._firstchild)
        {
            var filterCache = this._filterCache;
			
			
            if (!filterCache)
            {
                filterCache = {};
                this._filterCache = filterCache;
            }
            var selectorkey = propNm + "_" + val,
				cached = filterCache[selectorkey],
				elem,
				elems,
				res,
				retvals = [],
				arr = [],
				seq;
            if (!cached)
            {
                cached = {
                    pElement: this,
                    propertyNm: propNm,
                    value: val,
                    elements: null
                };
                filterCache[selectorkey] = cached;
            }
            if (cached._childchanged != this._childchanged)
            {
                arr = [];
                seq = 0;
                elem = this._firstchild;
                if (val == "*")
                {
                    for (; elem ; elem = elem._nextsibling)
                    {
                        arr[seq] = elem;
                        seq++;
                    }
                }
                else
                {
                    for (; elem ; elem = elem._nextsibling)
                    {
                        if (elem[propNm] == val)
                        {
                            arr[seq] = elem;
                            seq++;
                        }
                    }
                }
                cached.elements = arr;
                cached._childchanged = this._childchanged;
            }
            elem = this._firstchild;
		    elems = cached.elements;
			res = elems.slice(0);
			retvals = [];
            seq = 0;
            //for ( var i = 0, len = elems.length ; i < len ; i++ )
            for (; elem ; elem = elem._nextsibling)
            {
                //elem = elems[i];
                if (elem._firstchild)
                {
                    seq++;
                    retvals = elem._getItemsByFilter(propNm, val);
                    retvals.unshift(seq, 0);
                    res.splice.apply(res, retvals);
                    seq += retvals.length - 2;
                }
                else
                {
                    seq++;
                }
            }
            return res;
        }
        else
        {
            return null;
        }
    };

    _pGraphicsObject._setGlobalTransforms = function (pMatrix)
    {
        this._globalMatrix = (pMatrix ? (pMatrix.clone()).concatenate(this._matrix) : this._matrix.clone());
    };

    _pGraphicsObject._render = function (ctx)
    {
        var style = this._renderstyle,
			m = this._globalMatrix;

        if (m && style)
        {
            var isScalingStroke = this._type == "Image" || this._type == "Text" || this._nonscalingstroke !== true;
            this._painted = 1;
            ctx.save();
			if (isScalingStroke) m.applyToContext(ctx, this);
            var clipItems = this._clipitems; //, isClip;
			if(this.parent && this.parent._type == "Paths" && !clipItems)clipItems = this.parent._clipitems;
            if (clipItems && clipItems.length)
            {
                ctx.beginPath();
                for (var i = 0, len = clipItems.length; i < len ; i++)
                {
                    var rect = clipItems[i];
                    ctx.rect(rect.left, rect.top, rect.width, rect.height);
                    //trace(rect.toString(), this);
                }
                //isClip = true;
                ctx.closePath();
                ctx.clip();
                //if ( isClip ) ctx.clip();
            }

            this._applystyles(ctx, style);
            this._drawShape(ctx, (isScalingStroke ? null : m));
			if((this._type_name != "GraphicsImage" || (this._type_name == "GraphicsImage" && !this._imageloaded)))
			{
				var fillColor = style._fillcolor,
					strokeColor = style._strokecolor;
				if (fillColor)
				{
					ctx.fill();
					this._painted |= 4;
				}
				if (strokeColor)
				{
					ctx.stroke();
					this._painted |= 2;
				}
			}
			
            ctx.restore();
        }
		if (this._painted & (2 | 4))
		{
			//
		}
		else
		{ 
			
			if(this.visible)
			{
				if (this._drawflags && this._drawflags & (1 | 2 | 4))
				{
					this._painted |= 2;
				}
				else
					this._painted = 0;
				
			}
			if(!this.visible)
				this._painting = 2;
		}
    };

    if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8)
    {
        // TODO - 미지원 경고메세지 추가
    }
    else
    {
        _pGraphicsObject._applystyles = function (ctx, style)
        {
            if (!style) return;
            if (ctx)
            {
                var width = style._width,
					join = style._strokejoin,
					cap = style._strokecap,
					limit = style._miterlimit,
					fillColor = style._fillcolor,
					strokeColor = style._strokecolor,
					//dashArray = style._dasharr,
					//dashOffset = style._dashoffset,
					lineType = style._linetype,
					font = style._font;

				// 8.20-1 Shadow
				var shadow = style._shadow;
				if(shadow) {
					try {
						ctx.setElementShadowOffsetX(shadow.getOffsetX());
						ctx.setElementShadowOffsetY(shadow.getOffsetY());
						ctx.setElementShadowBlur(shadow.getBlur());
						ctx.setElementShadowColor(shadow.getColor());
					} catch(e) {
						//console.log("shadow error:" + e.message);
					}
				} else {
					ctx.setElementShadowOffsetX(0);
					ctx.setElementShadowOffsetY(0);
					ctx.setElementShadowBlur(0);
				}
				
                if (width != null)
                    ctx.setElementLineWidth(width);
                if (join)
                    ctx.setElementLineJoin(join);
                if (cap)
                    ctx.setElementLineCap(cap);
                if (limit)
                    ctx.setElementMiterLimit(limit);
                if (font)
                    ctx.setElementFont(font);
                if (fillColor)
                    ctx.setElementFillStyle(fillColor);

                if (strokeColor)
                {
                    ctx.setElementStrokeStyle(strokeColor);

                    // TODO - 삭제?
                    /*if (dashArray && dashArray.length)
                    {
                        var drawCtx = ctx.handle._draw_ctx;
						if(nexacro._Browser == "Runtime") {
							drawCtx = ctx.handle;
						} else {
							drawCtx = ctx.handle._draw_ctx;
						}
                        if ('setLineDash' in drawCtx)
                        {
                            drawCtx.setLineDash(dashArray);
                            drawCtx.lineDashOffset = dashOffset;
                        }
                        else if ('mozDash' in drawCtx)
                        {
                            drawCtx.mozDash = dashArray;
                            drawCtx.mozDashOffset = dashOffset;
                        }
                    }*/
                }
				if(lineType)
				{
					ctx.setElementLineStyle(lineType);
				}
            }
        };
    }

    _pGraphicsObject._getSharperOffset = function (x, y)
    {
        var ret = [];
        if (this._isOddStrokeWidth)
        {
            if ((~~(x)) == x)
            {
                ret[0] = 0;
            }
            else
            {
                ret[0] = 0.5;
            }
            if ((~~(y)) == y)
            {
                ret[1] = 0;
            }
            else
            {
                ret[1] = 0.5;
            }
        }
        else
        {
            if ((~~(x)) == x)
            {
                ret[0] = 0.5;
            }
            else
            {
                ret[0] = 0;
            }
            if ((~~(y)) == y)
            {
                ret[1] = 0.5;
            }
            else
            {
                ret[1] = 0;
            }
        }
        return ret;
    };

    _pGraphicsObject._drawShape = function (ctx, strokeMatrix)
    {
        var rect = this._getRect(),
			w = rect.width,
			h = rect.height,
			x = rect.left,
			y = rect.top;

        //var xyOffset = this._getSharperOffset(x, y);
        var gap = 0;	//, exval = 0;
        if (this._isOddStrokeWidth)
        {
            gap = 0.5;
            //exval = 1;
        }
        ctx.beginPath();
        if (strokeMatrix)
        {
            var coords = [x, y, x + w, y + h];
            strokeMatrix._transformCoordinates(coords, 0, coords, 0, 2);
            ctx.rect(parseInt(coords[0]) + gap, parseInt(coords[1]) + gap, parseInt(coords[2] - coords[0]), parseInt(coords[3] - coords[1]));
        }
        else
        {
            ctx.rect(x + gap, y + gap, w, h);
        }
        ctx.closePath();
    };

    _pGraphicsObject._remove = function (deep, notDirty)
    {
        if (!notDirty && this._painted & (1 | 2 | 4))
        {
            var layer = this._getOwnerLayer();
            if (layer)
            {
                layer._addDirty(this._oldGlobalBounds, this);
                //trace(this.toString(), this.parent.toString(), this.parent._quadtree);
                //if ( this.parent && this.parent._quadtree ) this.parent._quadtree.remove(this);
                if (this.parent._quadtree)
                    this.parent._quadtree.remove(this);
                //this.parent._dr
                //console.log(this.toString(), "removed==>", (this._oldGlobalBounds ? this._oldGlobalBounds.toString() : ""), this.parent._quadtree.contains(this));

            }
        }
        if (deep)
        {
            var node = this._firstchild;
            for (; node ; node = node._nextsibling)
            {
                node._remove(true, true);
            }
        }
    };


    //===============================================================
    // nexacro.ChartGraphicsObject : Events
    //===============================================================


}

if (!nexacro._ChartGraphicsShape)
{
    nexacro._ChartGraphicsShape = function ()
    {
        nexacro._ChartGraphicsObject.prototype.constructor.apply(this, arguments);
        var read = this.__readArgs;
        var sz = arguments[read];

        if (sz instanceof nexacro._ChartGraphicsSize)
        {
            read++;
            this._size = sz.clone();
            this._drawflags |= 2;
        }
        else if (nexacro._ChartGraphicsLib.isNumber(sz) && nexacro._ChartGraphicsLib.isNumber(arguments[read + 1]))
        {
            this._size = new nexacro._ChartGraphicsSize(sz, arguments[read + 1]);
            read += 2;
            this._drawflags |= 2;
        }

        var pos = this.getCenter();
        this.cx = pos.x;
        this.cy = pos.y;

        this.__readArgs = read;
    };

    var _pGraphicsShape = nexacro._ChartGraphicsShape.prototype = nexacro._createPrototype(nexacro._ChartGraphicsObject, nexacro._ChartGraphicsShape);
    _pGraphicsShape._type_name = "_GraphicsShape";

    // Property	
    _pGraphicsShape.width = 0;
    _pGraphicsShape.height = 0;

    //internal variables

    //============================================================
    // nexacro.ChartGraphicsShape : Properties
    //============================================================
    _pGraphicsShape.set_width = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }

        if (v != this.width)
        {
            this.width = v;
        }

        var sz = this._size;
        if (sz)
        {
            if (sz.width != v)
            {
                sz.width = v;
                this._drawflags |= 2;
            }
        }
        else
        {
            this._size = new nexacro._ChartGraphicsSize(v, 0);
            this._drawflags |= 2;
        }
    };

    _pGraphicsShape.set_height = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }

        if (v != this.height)
        {
            this.height = v;
        }

        var sz = this._size;
        if (sz)
        {
            if (sz.height != v)
            {
                sz.height = v;
                this._drawflags |= 2;
            }
        }
        else
        {
            this._size = new nexacro._ChartGraphicsSize(0, v);
            this._drawflags |= 2;
        }

    };

    // 속성 삭제에정, 내부에서 사용하는 곳 있으면 별도 내부 메소드로 제공 set은 width, height 이용, getSize() 추가
    // _pGraphicsShape.set_size = function ()
    // {
    // var argLen = arguments.length;
    // if ( argLen == 0 ) return; 
    // var sz;
    // if ( arguments[0] instanceof nexacro._ChartGraphicsSize )
    // {
    // sz = arguments[0];
    // }
    // else
    // {
    // sz = new nexacro._ChartGraphicsSize(arguments[0], arguments[1]);
    // }
    // if ( !this._size )
    // {
    // this._size = sz.clone();
    // this._drawflags |= 2; //sizechanged
    // }
    // else if ( !this._size.equals(sz) )
    // {
    // this._size.set(sz.width, sz.height);
    // this._drawflags |= 2; //sizechanged
    // }
    // };


    //============================================================
    // nexacro.ChartGraphicsShape : methods
    //============================================================		
    _pGraphicsShape.destroy = function ()
    {
        this.width = null;
        this.height = null;
        this._size = null;

        nexacro._ChartGraphicsObject.prototype.destroy.call(this);
    };

    _pGraphicsShape.getSize = function (bArray)
    {
        var sz = this._size;
        if (bArray)
        {
            return [sz.width, sz.height];
        }
        else
        {
            return sz;
        }
    };

    _pGraphicsShape.isEmpty = function ()
    {
        var sz = this._size;
        if (sz)
        {
            return sz.width <= 0 || sz.height <= 0;
        }
        return true;
    };

    _pGraphicsShape._getRect = function (bStrokeWidth, iscurrent)
    {
        var rect = this._rect;
        if (iscurrent) rect = null;
        if (!rect)
        {
            var size = this._size;
            if (size)
            {
                rect = new nexacro.Rect(0, 0, size.width || 0, size.height || 0);
            }
            else
            {
                rect = new nexacro.Rect();
            }
            if (!iscurrent) this._rect = rect;
        }
        if (bStrokeWidth)
        {
            rect = rect.expand(this._getStrokeWidth() / 2);
        }
        return rect;
    };

}

if (!nexacro.ChartGraphicsRect)
{
    nexacro.ChartGraphicsRect = function ()
    {
        this._type = "Rect";
        nexacro._ChartGraphicsShape.prototype.constructor.apply(this, arguments);
        var read = this.__readArgs;
        if (arguments[read] > 0)
        {
            this.radiusx = arguments[read];
        }
        else
        {
            this.radiusx = 0;
        }
        if (arguments[read + 1] > 0)
        {
            this.radiusy = arguments[read + 1];
        }
        else
        {
            this.radiusy = 0;
        }
        this._drawflags |= 8; //stylechanged
		// 8.20-2 Bar Round
		this.radiusround = {tl: 0, tr: 0, br: 0, bl: 0};
    };

    var _pGraphicsRect = nexacro.ChartGraphicsRect.prototype = nexacro._createPrototype(nexacro._ChartGraphicsShape, nexacro.ChartGraphicsRect);
    _pGraphicsRect._type_name = "GraphicsRect";

    // Property	
    _pGraphicsRect.radiusx = 0;
    _pGraphicsRect.radiusy = 0;

    //internal variables

    //============================================================
    // nexacro.ChartGraphicsRect : Properties
    //============================================================
	// 8.20-2 Bar Round
	_pGraphicsRect.set_radiusround = function (v) {
		if (v == null) {
			return;
		}
		if (typeof v === 'number') {
			v = {tl: v, tr: v, br: v, bl: v};
		} else {
			var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
			for (var side in defaultRadius) {
				v[side] = v[side] || defaultRadius[side];
			}
		}

		if (v != this.radiusround) {
			this.radiusround = v;
			this._drawflags |= 8;
		}
	};	
	
    _pGraphicsRect.set_radiusx = function (v)
    {
        if (v == null)
        {
            return;
        }

        if (v != this.radiusx)
        {
            this.radiusx = v;
            this._drawflags |= 8; //stylechanged
        }
    };

    _pGraphicsRect.set_radiusy = function (v)
    {
        if (v == null)
        {
            return;
        }

        if (v != this.radiusy)
        {
            this.radiusy = v;
            this._drawflags |= 8; //stylechanged
        }
    };

    //============================================================
    // nexacro.ChartGraphicsRect : methods
    //============================================================	
    _pGraphicsRect.destroy = function ()
    {
        this.radiusx = null;
        this.radiusy = null;
		this.radiusround = null;	// 8.20-2 Bar Round

        nexacro._ChartGraphicsShape.prototype.destroy.call(this);
    };

    _pGraphicsRect._drawShape = function (ctx, strokeMatrix)
    {
        var sz = this._size,
			rx = this.radiusx || 0,
			ry = this.radiusy || 0,
			w = sz.width,
			h = sz.height,
			x = 0, y = 0,
            mx = w / 2,
			coords,
            my = h / 2;
            
			//x = -w / 2,
            //y = -h / 2,
        //var kappa = nexacro._ChartGraphicsMathUtil._KAPPA;
        if (rx > mx)
            rx = mx/* * kappa*/;
        if (ry > my)
            ry = my/* * kappa*/;
		var isRounded = rx !== 0 || ry !== 0;
        var gap = 0;
        if (this._isOddStrokeWidth)
        {
            gap = 0.5;
        }
		// 8.20-2 Bar Round
		if(!isRounded) {
			isRounded = this.radiusround.tl !== 0 || this.radiusround.tr !== 0 || this.radiusround.br !== 0 || this.radiusround.bl !== 0;
		}
        if (isRounded)
        {
            ctx.beginPath();
            if (strokeMatrix)
            {
                coords = [
					x + rx, y,
					x + w - rx, y,
					x + w, y,
					x + w, y + ry,
					x + w, ry,

					x + w, y + h - ry,
					x + w, y + h,
					x + w - rx, y + h,
					x + w - rx, y + h,

					x + rx, y + h,
					x, y + h,
					x, y + h - ry,
					x, y + h - ry,

					x, y + ry,
					x, y,
					x + rx, y,
					x + rx, y
                ];
				// 8.20-2 Bar Round
                strokeMatrix._transformCoordinates(coords, 0, coords, 0, coords.length / 2);
				ctx.moveTo(parseInt(coords[0]) + gap + this.radiusround.tl, parseInt(coords[1]) + gap);
				ctx.lineTo(parseInt(coords[2]) + gap - this.radiusround.tr, parseInt(coords[3]) + gap);
				ctx.quadraticCurveTo(parseInt(coords[4]) + gap, parseInt(coords[5]) + gap, parseInt(coords[6]) + gap, parseInt(coords[7]) + gap, parseInt(coords[8]) + gap + this.radiusround.tr, parseInt(coords[9]) + gap);

				ctx.lineTo(parseInt(coords[10]) + gap, parseInt(coords[11]) + gap - this.radiusround.br);
				ctx.quadraticCurveTo(parseInt(coords[12]) + gap, parseInt(coords[13]) + gap, parseInt(coords[14]) + gap - this.radiusround.br, parseInt(coords[15]) + gap, parseInt(coords[16]) + gap, parseInt(coords[17]) + gap);

				ctx.lineTo(parseInt(coords[18]) + gap + this.radiusround.bl, parseInt(coords[19]) + gap);
				ctx.quadraticCurveTo(parseInt(coords[20]) + gap, parseInt(coords[21]) + gap, parseInt(coords[22]) + gap, parseInt(coords[23]) + gap - this.radiusround.bl, parseInt(coords[24]) + gap, parseInt(coords[25]) + gap);

				ctx.lineTo(parseInt(coords[26]) + gap, parseInt(coords[27]) + gap + this.radiusround.tl);
				ctx.quadraticCurveTo(parseInt(coords[28]) + gap, parseInt(coords[29]) + gap, parseInt(coords[30]) + gap + this.radiusround.tl, parseInt(coords[31]) + gap, parseInt(coords[32]) + gap, parseInt(coords[33]) + gap);

            }
            else
            {
				ctx.moveTo(x + rx + gap + this.radiusround.tl, y + gap);
				ctx.lineTo(x + w - rx + gap - this.radiusround.tr, y + gap);
				ctx.quadraticCurveTo(x + w + gap, y + gap, x + w + gap, y + ry + gap + this.radiusround.tr, x + w + gap, y + ry + gap);

				ctx.lineTo(x + w + gap, y + h - ry + gap - this.radiusround.br);
				ctx.quadraticCurveTo(x + w + gap, y + h + gap, x + w - rx + gap - this.radiusround.br, y + h + gap, x + w - rx + gap, y + h + gap);

				ctx.lineTo(x + rx + gap + this.radiusround.bl, y + h + gap);
				ctx.quadraticCurveTo(x + gap, y + h + gap, x + gap, y + h - ry + gap - this.radiusround.bl, x + gap, y + h - ry + gap);

				ctx.lineTo(x + gap, y + ry + gap + this.radiusround.tl);
				ctx.quadraticCurveTo(x + gap, y + gap, x + rx + gap + this.radiusround.tl, y + gap, x + rx + gap, y + gap);
            }
            ctx.closePath();
        }
        else
        {
            ctx.beginPath();
            if (strokeMatrix)
            {
                coords = [x, y, x + w, y + h];
                strokeMatrix._transformCoordinates(coords, 0, coords, 0, 2);
                ctx.rect(parseInt(coords[0]) + gap, parseInt(coords[1]) + gap, parseInt(coords[2] - coords[0]), parseInt(coords[3] - coords[1]));
            }
            else
            {
                ctx.rect(x + gap, y + gap, w, h);
            }
            ctx.closePath();
        }
    };

}

if (!nexacro.ChartGraphicsEllipse)
{
    nexacro.ChartGraphicsEllipse = function ()
    {
        this._type = "Ellipse";
        nexacro._ChartGraphicsShape.prototype.constructor.apply(this, arguments);
    };

    var _pGraphicsEllipse = nexacro.ChartGraphicsEllipse.prototype = nexacro._createPrototype(nexacro._ChartGraphicsShape, nexacro.ChartGraphicsEllipse);
    _pGraphicsEllipse._type_name = "GraphicsEllipse";

    // Property	
    _pGraphicsEllipse.cx = 0;
    _pGraphicsEllipse.cy = 0;

    //internal variables

    //============================================================
    // nexacro.ChartGraphicsEllipse : Properties
    //============================================================
    _pGraphicsEllipse.set_cx = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }

        if (v != this.x)
        {
            // 원은 x, cx 값이 동일
            this.translate(v - this.x, 0);
            this.cx = v;
            this.x = v; // GraphicsObject 상속검토 후 처리
        }
    };

    _pGraphicsEllipse.set_cy = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }

        if (v != this.y)
        {
            // 원은 x, cx 값이 동일
            this.translate(0, v - this.y);
            this.cy = v;
            this.y = v; // GraphicsObject 상속검토 후 처리
        }
    };

    //============================================================
    // nexacro.ChartGraphicsEllipse : methods
    //============================================================		
    _pGraphicsEllipse.destroy = function ()
    {
        this.cx = null;
        this.cy = null;

        nexacro._ChartGraphicsShape.prototype.destroy.call(this);
    };

    _pGraphicsEllipse.getCenter = function (bArray)
    {
        if (bArray)
        {
            return [this.x, this.y];
        }
        else
        {
            return new nexacro.Point(this.x, this.y);
        }
    };

    _pGraphicsEllipse.setCenter = function (v)
    {
        var argLen = arguments.length;
        if (argLen == 0) return;
        if (v == null) //default
        {
            this.translate(-this.x, -this.y);
            this.x = 0;
            this.y = 0;
        }
        else if (!(v instanceof nexacro.Point))
        {
            var y = arguments[1];
            if (this.x != v || this.y != y)
            {
                this.translate(v - this.x, y - this.y);
                this.x = v;
                this.y = y;
            }
        }
        else
        {
            if (this.x != v.x || this.y != v.y)
            {
                this.translate(v.x - this.x, v.y - this.y);
                this.x = v.x;
                this.y = v.y;
            }
        }
    };

    _pGraphicsEllipse.hitTest = function (pt)
    {
        var sz = this._size;
        if (sz)
        {
            /* This is a more general form of the circle equation
			*
			* X^2/a^2 + Y^2/b^2 <= 1
			*/
            return pt.divide(sz.width, sz.height).getLength() <= 0.5;
        }
        return false;
    };


    //===============================================================
    // nexacro.ChartGraphicsEllipse : Logical part
    //===============================================================
    _pGraphicsEllipse._drawShape = function (ctx, strokeMatrix)
    {
        var sz = this._size,
			w = sz.width,
			coords,
			h = sz.height;
        if (w == h)
        {
            //var xm = w / 2;       // y-middle
            ctx.beginPath();
            if (strokeMatrix)
            {
                coords = [
					0, 0,
					(w + h) / 4, 0
                ];
                strokeMatrix._transformCoordinates(coords, 0, coords, 0, coords.length / 2);
                //ctx.arc(-xm, -xm, xm, 0, 2*Math.PI, false);
                ctx.arc(coords[0], coords[1], coords[2], coords[3], Math.PI * 2, true);
            }
            else
            {
                ctx.arc(0, 0, (w + h) / 4, 0, Math.PI * 2, true);
            }
        }
        else
        {
            ctx.beginPath();
            var mx = w / 2,
				my = h / 2,
				kappa = nexacro._ChartGraphicsMathUtil._KAPPA,
				cx = mx * kappa,
				cy = my * kappa;
            if (strokeMatrix)
            {
                coords = [
					-mx, 0,
					-mx, -cy, -cx, -my, 0, -my,
					cx, -my, mx, -cy, mx, 0,
					mx, cy, cx, my, 0, my,
					-cx, my, -mx, cy, -mx, 0
                ];
                strokeMatrix._transformCoordinates(coords, 0, coords, 0, coords.length / 2);
                ctx.moveTo(coords[0], coords[1]);
                ctx.bezierCurveTo(coords[2], coords[3], coords[4], coords[5], coords[6], coords[7]);
                ctx.bezierCurveTo(coords[8], coords[9], coords[10], coords[11], coords[12], coords[13]);
                ctx.bezierCurveTo(coords[14], coords[15], coords[16], coords[17], coords[18], coords[19]);
                ctx.bezierCurveTo(coords[20], coords[21], coords[22], coords[23], coords[24], coords[25]);
            }
            else
            {
                ctx.moveTo(-mx, 0);
                ctx.bezierCurveTo(-mx, -cy, -cx, -my, 0, -my);
                ctx.bezierCurveTo(cx, -my, mx, -cy, mx, 0);
                ctx.bezierCurveTo(mx, cy, cx, my, 0, my);
                ctx.bezierCurveTo(-cx, my, -mx, cy, -mx, 0);
            }
            ctx.closePath();
        }
    };

    _pGraphicsEllipse._getRect = function (bStrokeWidth, iscurrent)
    {
        var rect = this._rect;
        if (iscurrent)
        {
            rect = null;
        }
        if (!rect)
        {
            rect = new nexacro.Rect(0, 0, this._size.width, this._size.height).setCenterPoint(0, 0);
            //rect = new Eco.Rectangle(this._size);
            if (!iscurrent)
            {
                this._rect = rect;
            }
        }
        if (bStrokeWidth)
        {
            rect = rect.expand(this._getStrokeWidth() / 2);
        }
        return rect;
    };
}

if (!nexacro.ChartGraphicsText)
{
    nexacro.ChartGraphicsText = function ()
    {
        this._type = "Text";
        nexacro._ChartGraphicsObject.prototype.constructor.apply(this, arguments);
        var read = this.__readArgs;
        if (arguments[read] != null)
        {
            this.set_text(arguments[read]);
        }
    };

    var _pGraphicsText = nexacro.ChartGraphicsText.prototype = nexacro._createPrototype(nexacro._ChartGraphicsObject, nexacro.ChartGraphicsText);
    _pGraphicsText._type_name = "GraphicsText";

    // Property	
    _pGraphicsText.font = "";
    _pGraphicsText.text = "";
    _pGraphicsText.width = "";
    _pGraphicsText.color = "";
    _pGraphicsText.dx = 0;
    _pGraphicsText.dy = 0;
    _pGraphicsText.textAlign = "left";
    _pGraphicsText.verticalAlign = "bottom";
    _pGraphicsText.wordWrap = "";

    //internal variables

    //============================================================
    // nexacro.ChartGraphicsText : Properties
    //============================================================
    _pGraphicsText.set_font = function (v)
    {
        var s = this._style,
			oldval = this.font,
			oldobj, newobj;

        if (oldval != v)
        {
            this.font = v;
            oldobj = s.font;

            if (v)
            {
                if (oldobj == null || oldobj.value != v)
                {
                    newobj = nexacro.FontObject(v);
                    s.font = newobj;
                }
            }
            else
            {
                if (oldobj)
                {
                    s.font = null;
                }
            }

            this._drawflags |= (2 | 8); //sizechanged, stylechanged
            this._changedFont = true;
        }
    };

    _pGraphicsText.set_color = function (v)
    {
        this.color = v;
        nexacro._ChartGraphicsObject.prototype.set_fillstyle.call(this, v);
    };

    _pGraphicsText.set_textAlign = function (v)
    {
        if (!/^(left|center|right)$/.test(v))
        {
            return;
        }
        if (this.textAlign != v)
        {
            this.textAlign = v;
            this._drawflags |= (1 | 8); //stylechanged
            this._alignChanged = true;
        }
    };

    _pGraphicsText.set_verticalAlign = function (v)
    {
        if (!/^(top|middle|bottom)$/.test(v))
        {
            return;
        }
        if (this.verticalAlign != v)
        {
            this.verticalAlign = v;
            this._drawflags |= (1 | 8); //stylechanged
            this._alignChanged = true;
        }
    };

    _pGraphicsText.set_text = function (v)
    {
        if (!nexacro._isString(v))
        {
            if (!nexacro._ChartGraphicsLib.isEmpty(v))
            {
                v = v.toString();
            }
            else
            {
                v = "";
            }
        }
        if (this.text != v)
        {
            this.text = v;
            this._drawflags |= 4; //contentschanged
            this._textChanged = true;
        }
    };

    _pGraphicsText.set_dx = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }
        if (this.dx != v)
        {
            this.translate(v - (this.dx || 0), 0);
            this.dx = v;
        }
    };

    _pGraphicsText.set_dy = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }
        if (this.dy != v)
        {
            this.translate(0, v - (this.dy || 0));
            this.dy = v;
        }
    };

    _pGraphicsText.set_wordWrap = function (v)
    {
        v = nexacro._toBoolean(v);

        if (this.wordWrap !== v)
        {
            this.wordWrap = !!v;
            this._drawflags |= 4; //contentschanged
            this._wordwrapChanged = true;
        }
    };

    _pGraphicsText.set_width = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }
        if (this.width != v)
        {
            this.width = v;
            this._drawflags |= 2; //sizechanged
            this._widthChanged = true;
        }
    };

    //============================================================
    // nexacro.ChartGraphicsText : methods
    //============================================================
    _pGraphicsText.destroy = function ()
    {
        this.font = null;
        this.text = null;
        this.width = null;
        this.color = null;
        this.dx = null;
        this.dy = null;
        this.textAlign = null;
        this.verticalAlign = null;
        this.wordWrap = null;

        nexacro._ChartGraphicsObject.prototype.destroy.call(this);
    };

    _pGraphicsText.isEmpty = function ()
    {
        var sz = this._getRect();
        return sz.width <= 0 || sz.height <= 0;
    };

    //===============================================================
    // nexacro.ChartGraphicsText : Logical part
    //===============================================================
    _pGraphicsText._updateStyles = function (ctx, sizeChanged)
    {
        this._updateText();
        // this.callParent([ctx, sizeChanged]);
        nexacro._ChartGraphicsObject.prototype._updateStyles.apply(this, [ctx, sizeChanged]);
    };

    _pGraphicsText._updateText = function ()
    {
        var sysstyle = this._renderstyle,
			style = this._style;
        if (!sysstyle)
        {
            sysstyle = {};
            this._renderstyle = sysstyle;
        }

        if (this._textChanged || this._changedFont || this._wordwrapChanged || this._widthChanged)
        {
            var font = style.font;
            if (this._changedFont)
            {
                this._updateFontInCanvas(font, sysstyle);
                if (font)
                {
                    var sz = nexacro.getTextSize("Wj", font);
                    this._lineHeight = sz.ny;
                }
                else
                {
                    this._lineHeight = 0;
                }
                this._changedFont = false;
            }
            var txt = this.text;
            if (font && txt && txt.length && this._lineHeight)
            {
                // GraphicsCss.js 작업 후 처리
                this._lines = nexacro._ChartGraphicsLib._getLines(font, txt, this.wordWrap, this.width);
                this._txtSize = nexacro._ChartGraphicsLib._getTextSize(font, this._lines, this._lineHeight);
            }
            else
            {
                this._lines = null;
                this._txtSize = [0, 0];
            }
            this._textChanged = false;
            this._widthChanged = false;
            this._wordwrapChanged = false;
        }
        else
        {
            if (!this._txtSize)
                this._txtSize = [0, 0];
        }
    };

    _pGraphicsText._updateFontInCanvas = function (nexacroFont, sys_style)
    {
        if (nexacroFont)
        {
            //sys_style._font = nexacroFont._sysvalue;
            sys_style._font = nexacroFont;
        }
        else
        {
            sys_style._font = null;
        }
    };

    _pGraphicsText._getRect = function (bStrokeWidth, iscurrent)
    {
        var rect = this._rect;
        if (iscurrent) rect = null;
        if (!rect || this._changedFont || this._textChanged || this._wordwrapChanged || this._widthChanged || this._alignChanged)
        {
            this._updateText();
            var txtSz = this._txtSize;
            rect = new nexacro.Rect(0, 0, txtSz[0], txtSz[1]);

            //            trace(txtSz[0]);  // 런타임에서 특정 폰트에서 사이즈가 작게 넘어오는 문제있음. 2017,07.13

            switch (this.textAlign)
            {
                case "left":
                    break;
                case "center":
                    rect.left = -(txtSz[0] / 2);
                    break;
                case "right":
                    rect.left = -txtSz[0];
                    break;
            }
            switch (this.verticalAlign)
            {
                case "top":
                    break;
                case "middle":
                    rect.top = -(txtSz[1] / 2);
                    break;
                case "bottom":
                    rect.top = -txtSz[1];
                    break;
            }

            // 브라우저에 따라 텍스트 위치가 조금씩 차이가 있어 보정처리함.
            rect.left -= 1;
            rect.top -= 1;
            rect.width += 6;
            rect.height += 6;
            rect.right = rect.left + rect.width;
            rect.bottom = rect.top + rect.height;

            if (!iscurrent) this._rect = rect;
            this._alignChanged = false;
        }
        return rect;
    };

    _pGraphicsText._render = function (ctx)
    {
        var style = this._renderstyle;
        var m = this._globalMatrix;
        var lineHeight = this._lineHeight;
		var i,
			len = 0,
			yGap;
        if (style && m)
        {
            this._painted |= 1;
            ctx.save();
            m.applyToContext(ctx);
            var clipItems = this._clipitems; //, isClip;
            if (clipItems && clipItems.length)
            {
                ctx.beginPath();
				len = clipItems.length;
                for (i = 0; i < len ; i++)
                {
                    var rect = clipItems[i];
                    //ctx.rect(rect.left, rect.top, rect.width, rect.height);
                    //console.log(rect.toString(), this);

                    // 17.11.21 GraphicsText의 valign에 따라 Text사 그려지는 기준 위치가 달라짐
                    // Text가 그려지는 기준 위치가 달라지므로 Text를 Clip 하기 위한 Rect영역의 기준도 이에 따라 달라져야한다.
                    var txtValign = this.verticalAlign;
                    if (txtValign == "top")
                    {
                        ctx.rect(rect.left, rect.top, rect.width, rect.height);
                    }
                    else if (txtValign == "middle")
                    {
                        ctx.rect(rect.left, rect.top - (lineHeight / 2), rect.width, rect.height);
                    }
                    else
                    {
                        ctx.rect(rect.left, rect.top - lineHeight, rect.width, rect.height);
                    }

                   
                    //trace("clippath >>>>>>>>>> rect", rect);
                }
                //isClip = true;
                ctx.closePath();
                ctx.clip();
                //if ( isClip ) ctx.clip();
            }
            this._applystyles(ctx, style);

            var fillColor = style._fillcolor;
				//strokeColor = style._strokecolor;

            //var txtSize = this._txtSize,
			var	lines = this._lines,
				x = 0;
            if (lines)
            {
                switch (this.textAlign)
                {
                    case "left":
                        ctx.setElementTextAlign("start");
                        break;
                    case "center":
                        ctx.setElementTextAlign("center");
                        //x = txtSize[0]/2; 
                        break;
                    case "right":
                        ctx.setElementTextAlign("end");
                        //x = txtSize[0]; 
                        break;
                }
                switch (this.verticalAlign)
                {
                    case "top":
                        //x = 0;
                        ctx.setElementTextBaseline("top");
                        len = lines.length;
                        if (fillColor)
                        {
                            for (i = 0;  i < len; i++)
                            {
                                ctx.fillText(lines[i], 0, i * lineHeight);
                            }
                            this._painted |= 4;
                        }
                        break;
                    case "middle":
                        ctx.setElementTextBaseline("middle");
                        if (fillColor)
                        {
                            len = lines.length;
							yGap = (len - 1) * lineHeight / 2;
                            for (i = 0 ; i < len; i++)
                            {
                                ctx.fillText(lines[i], 0, i * lineHeight - yGap);
                            }
                            this._painted |= 4;
                        }
                        break;
                    case "bottom":
                        ctx.setElementTextBaseline("bottom"); // 아래 글자가 삐져나오는거 해결 (html canvas test시 모든 브라우저 동일하게 표시)
                        // ctx.setElementTextBaseline("alphabetic");
                        if (fillColor)
                        {
                            len = lines.length;
							yGap = (len - 1) * lineHeight;
                            for (i = 0 ; i < len; i++)
                            {
                                ctx.fillText(lines[i], 0, i * lineHeight - yGap);
                                //console.log(i*lineHeight - yGap, yGap, lineHeight);
                            }
                            this._painted |= 4;
                        }
                        break;
                }

            }
            ctx.restore();
        }
    };
}

if (!nexacro.ChartGraphicsImage)
{
    nexacro.ChartGraphicsImage = function ()
    {
        this._type = "Image";
        nexacro._ChartGraphicsShape.prototype.constructor.apply(this, arguments);
        //var read = this.__readArgs;
    };

    var _pGraphicsImage = nexacro.ChartGraphicsImage.prototype = nexacro._createPrototype(nexacro._ChartGraphicsShape, nexacro.ChartGraphicsImage);
    _pGraphicsImage._type_name = "GraphicsImage";

    // Property	
    _pGraphicsImage.src = "";
    _pGraphicsImage.imagewidth = 0;
    _pGraphicsImage.imageheight = 0;

    //internal variables	 
    _pGraphicsImage._cacheimages = null;
    _pGraphicsImage._cacheimagesCapacity = null;
    _pGraphicsImage._cacheimagescnt = null;
    _pGraphicsImage._redrawparent = null;
    _pGraphicsImage._redrawcallback = null;
    //============================================================
    // nexacro.ChartGraphicsImage : Properties
    //============================================================
    _pGraphicsImage.set_src = function (v)
    {
        if (this.src != v)
        {
            this.src = v;
			var w,h;
            if (v)
            {
                this._imageloaded = false;
                if (nexacro._Browser != "Runtime")
                {
                    var rurl = this._getRealImageUrl(v);
                    var cacheimages = this._cacheimages,
						imageobj;
                    if (!this._imgobj) this._imgobj = {};
                    if (cacheimages && cacheimages[rurl])
                    {
                        imageobj = cacheimages[rurl];
                        this._imgobj.handle = imageobj;
                        w = imageobj.naturalWidth || imageobj.width;
						h = imageobj.naturalHeight || imageobj.height;
                        this._doingSomethingAfterImageloaded(w, h);
                    }
                    else
                    {
                        imageobj = new Image();
                        var that = this,
							bindfn = function ()
							{
							    nexacro._stopSysObserving(this, "load", "onload", bindfn);
							    that._imageload_callback(rurl,0,0, imageobj);
							};

                        var image_size = nexacro._getImageSize(rurl, nexacro._emptyFn, this, undefined, imageobj);
                        if (image_size)
                        {
                            w = image_size.width;
                            h = image_size.height;
                            this.imagewidth = w;
                            this.imageheight = h;
                            if(this.width <= 0)
                            {
                                this.set_width(this.imagewidth);
                            }
                            if (this.height <= 0)
                            {
                                this.set_height(this.imageheight);
                            }
                         

                        }
                       
                        nexacro._observeSysEvent(imageobj, "load", "onload", bindfn);
                        imageobj.src = rurl;
                    }
                    //nexacro._observeSysEvent(imgnode, "error", "onerror", nexacro._imgloadhandler_onerror_forward);
                }
                else
                {
                    if (!this._imgobj) this._imgobj = {};
                    this._imgobj.src = v;
                    this._imgobj.handle = nexacro._getImageObject(v, this._imageload_callback, this, "", false);
                }
            }
            else
            {
                this._imgobj = null;
                this._imageloaded = true;
            }
            this._drawflags |= 4; //contentschanged
        }

    };

    //============================================================
    // nexacro.ChartGraphicsImage : methods
    //============================================================
    _pGraphicsImage.destroy = function ()
    {
        this.src = null;
        this.imagewidth = null;
        this.imageheight = null;
        this._cacheimages = null;
        this._cacheimagesCapacity = null;
        this._cacheimagescnt = null;

        nexacro._ChartGraphicsShape.prototype.destroy.call(this);
    };

    _pGraphicsImage.isEmpty = function ()
    {
        if (this._imgobj)
        {
            var sz = this._size;
            if (sz)
            {
                return sz.width <= 0 || sz.height <= 0;
            }
            if (this._imageloaded) return true;
            else return false;
        }
        return true;
    };

    //===============================================================
    // nexacro.ChartGraphicsImage : Logical part
    //===============================================================
    _pGraphicsImage._getRealImageUrl = function (url)
    {
        if (url.substring(0, 4).toLowerCase() == "url(")
        {
            url = url.substring(5, url.length - 2);
        }
        if (!url || !url.length)
            return null;

        return nexacro._getImageLocation(url);
    };

    _pGraphicsImage._imageload_callback = function (url, w, h, imgnode)
    {
        if (nexacro._Browser != "Runtime")
        {
            var cacheimages = this._cacheimages;
				//imgobj;

            if (this._cacheimagescnt == null)
            {
                this._cacheimagescnt = 0;
                this._cacheimagesCapacity = 30;
            }
            if (!cacheimages)
            {
                cacheimages = {};
                this._cacheimages = cacheimages;
            }

            var width, height;

            if ('naturalHeight' in imgnode)
            {
                if (imgnode.naturalHeight + imgnode.naturalWidth === 0)
                {
                    return;
                }
                width = imgnode.naturalWidth;
                height = imgnode.naturalHeight;

            }
            else if (imgnode.width + imgnode.height == 0)
            {
                return;
            }
            else
            {
                width = imgnode.width;
                height = imgnode.height;
            }
            this._imgobj.handle = imgnode;
            cacheimages[url] = imgnode;
            this._cacheimagescnt++;
            if (this._cacheimagescnt > this._cacheimagesCapacity)
            {
                nexacro._ChartGraphicsLibObject.Each(cacheimages, function (prop, val, object)
                {
                    delete object[prop];
                    this._cacheimagescnt--;
                    if (this._cacheimagescnt < this._cacheimagesCapacity)
                    {
                        return false;
                    }
                });
            }
            this.imagewidth = width;
            this.imageheight = height;
           /* if(this.width <= 0)
                this.set_width(this.imagewidth);
            if(this.height <= 0)
                this.set_height(this.imageheight);*/
            //TODO: have to fire callback event.  
            this._doingSomethingAfterImageloaded(width, height);
            if(this._redrawparent && this._redrawcallback)
            {
                this._redrawcallback.call(this._redrawparent);
            }

        }
        else
        {
            this.imagewidth = w;
            this.imageheight = h;
            /*if (this.width <= 0)
                this.set_width(this.imagewidth);
            if (this.height <= 0)
                this.set_height(this.imageheight);*/
            //TODO: have to fire callback event.  
            this._doingSomethingAfterImageloaded(w, h);
            if (this._redrawparent && this._redrawcallback)
            {
                this._redrawcallback.call(this._redrawparent);
            }
        }
    };

    _pGraphicsImage._doingSomethingAfterImageloaded = function (w, h)
    {
        var sz = this._size,
			layer,
			graph;
		this._imageloaded = true;

        if (sz == null)
        {
            this._size = new nexacro._ChartGraphicsSize(w, h);
            this._drawflags |= 2;
            if (this._needRedarw)
            {
                this._drawflags |= 4; //contentschanged
                layer = this._getOwnerLayer();
				graph = layer.parent;
                graph._delayTask();
                this._needRedarw = false;
            }
            return;
        }
        if (sz.width <= 0)
        {
            sz.width = w;
            this._drawflags |= 2;
        }
        if (sz.height <= 0)
        {
            sz.height = h;
            this._drawflags |= 2;
        }
        if (this._needRedarw)
        {
            this._drawflags |= 4; //contentschanged
            layer = this._getOwnerLayer();
			graph = layer.parent;
            graph._delayTask();
            this._needRedarw = false;
        }
    };

    _pGraphicsImage._drawShape = function (ctx)
    {
        if (!this.isEmpty())
        {
            if (this._imageloaded)
            {
                var sz = this._size,
					w = sz.width,
					h = sz.height;
                ctx.drawImage(this._imgobj, 0, 0, w, h);
            }
            else
            {
                this._needRedarw = true;
            }
        }
    };

}

if (!nexacro.ChartGraphicsPath)
{
    nexacro.ChartGraphicsPath = function ()
    {
        this._type = "Path";
        nexacro._ChartGraphicsObject.prototype.constructor.apply(this, arguments);
        this._closed = false;
        this._segments = [];
    };

    var _pGraphicsPath = nexacro.ChartGraphicsPath.prototype = nexacro._createPrototype(nexacro._ChartGraphicsObject, nexacro.ChartGraphicsPath);
    _pGraphicsPath._type_name = "GraphicsPath";

    // Property	

    //internal variables
    _pGraphicsPath._strokePadding = 0;
    _pGraphicsPath._curveMin = 0.00001;
    _pGraphicsPath._curveMax = 1 - 0.00001;
    _pGraphicsPath._strokejoin = "miter";
    //============================================================
    // nexacro.ChartGraphicsPath : Properties
    //============================================================


    //============================================================
    // nexacro.ChartGraphicsPath : methods
    //============================================================	
    _pGraphicsPath.destroy = function ()
    {
        this._closed = null;
        this._segments = null;
        this._strokePadding = null;
        this._curveMin = null;
        this._curveMax = null;

        delete this._segments;

        nexacro._ChartGraphicsObject.prototype.destroy.call(this);
    };

    _pGraphicsPath._add = function (segs, index)
    {
        var segments = this._segments,
			//len = segs.length,
			append = index == null;
			//seg;

        index = append ? segments.length : index;

        if (append)
        {
            segments.push.apply(segments, segs);
        }
        else
        {
            segments.splice.apply(segments, [index, 0].concat(segs));
        }
        this._drawflags |= 4; //contentschanged
        return segs;
    };

    _pGraphicsPath.isEmpty = function ()
    {
        return this._segments.length === 0;
    };

    _pGraphicsPath.isClosed = function ()
    {
        if (this._closed)
        {
            return true;
            //return this._closed;
        }

        // line이 맞물렸다고 contain이 아닌데?
        /*var first = this.getFirstSegment(),
			last = this.getLastSegment();
        if (this._segments.length > 1 && first.point.equals(last.point))
        {
            return true;
        }*/
        return false;
    };

    _pGraphicsPath.setClosed = function (closed)
    {
        if (this._closed != (closed = !!closed))
        {
            this._closed = closed;
            this._drawflags |= 4; //contentschanged
        }
    };

    _pGraphicsPath.removeSegment = function (index)
    {
        return this.removeSegments(index, index + 1)[0] || null;
    };

    _pGraphicsPath.removeSegments = function (from, to)
    {
        from = (from || 0);
        to = (to == null ? this._segments.length : to);
        var segments = this._segments,
			//len = segments.length,
			removed = segments.splice(from, to - from),
			removedLen = removed.length;
        if (!removedLen)
        {
            return removed;
        }
        this._drawflags |= 4; //contentschanged
        return removed;
    };

    // 버그발생, 확인필요
    // _pGraphicsPath.curveTo = function (pt1, pt2, radius)
    // {
    // var t = radius||0.5,
    // t1 = 1 - t,
    // current = this._getCurrentSegment().point,
    // controlPt = pt1.subtract(current.multiply(t1 * t1)).subtract(to.multiply(t * t)).divide(2 * t * t1);
    // //controlPt = pt1.subtract(current.multiply(t1 * t1)).subtract(to.multiply(t * t)).divide(2 * t * t1);
    // if (controlPt.isNaN())
    // {
    // // Eco.Logger.error(
    // // 'Cannot put a curve through points with parameter = ' + t);
    // }
    // this.quadraticCurveTo(controlPt, to);
    // };

    _pGraphicsPath.quadraticCurveTo = function (controlPt, endpt)
    {
        //var current = this._getCurrentSegment().point;
        //this.cubicCurveTo(
        //	controlPt.add(current.subtract(controlPt).multiply(1 / 3)),
        //	controlPt.add(endpt.subtract(controlPt).multiply(1 / 3)),
        //	endpt
        //);
        this.cubicCurveTo(
			// controlPt.add(controlPt.multiply(1 / 3)),
			// controlPt.add(endpt.multiply(1 / 3)),
			// endpt
			controlPt,
			endpt,
			endpt
		);
    };

    _pGraphicsPath.cubicCurveTo = function (control1Pt, control2Pt, endpt)
    {
        var read = 0;
        if (control1Pt instanceof nexacro.Point)
        {
            read += 1;
        }
        else
        {
            control1Pt = new nexacro.Point(arguments[0], arguments[1]);
            read += 2;
        }
        if (arguments[read] instanceof nexacro.Point)
        {
            control2Pt = arguments[read];
            read += 1;
        }
        else
        {
            control2Pt = new nexacro.Point(arguments[read], arguments[read + 1]);
            read += 2;
        }
        if (arguments[read] instanceof nexacro.Point)
        {
            endpt = arguments[read];
            read += 1;
        }
        else
        {
            endpt = new nexacro.Point(arguments[read], arguments[read + 1]);
            read += 2;
        }

        var current = this._getCurrentSegment();
        //current.outVector = control1Pt.subtract(current.point);
        current.outVector = control1Pt;
        var seg = {
            point: endpt.clone(),
            //inVector: control2Pt.subtract(endpt),
            inVector: control2Pt.clone(),
            nextSeg: null
        };
        this._add([seg]);
    };

    _pGraphicsPath.arcTo = function (pt_, radiusPt, rotation, clockwise, large)
    {
        var current = this._getCurrentSegment(),
			from = current.point,
			to, radius,
			center, extent, vector, matrix,
			read = 0;

        if (pt_ instanceof nexacro.Point)
        {
            to = pt_;
            read += 1;
        }
        else if (nexacro._ChartGraphicsLib.isNumber(arguments[0]) && nexacro._ChartGraphicsLib.isNumber(arguments[1]))
        {
            to = new nexacro.Point(arguments[0], arguments[1]);
            read += 2;
        }

        if (arguments[read] instanceof nexacro._ChartGraphicsSize)
        {
            radius = arguments[read];
            read += 1;
        }
        else if (nexacro._ChartGraphicsLib.isNumber(arguments[read]) && nexacro._ChartGraphicsLib.isNumber(arguments[read + 1]))
        {
            radius = new nexacro._ChartGraphicsSize(arguments[read], arguments[read + 1]);
            read += 2;
        }

        if (nexacro._ChartGraphicsLib.isNumber(arguments[read]))
        {
            rotation = arguments[read];
            read += 1;
        }

        if (nexacro._ChartGraphicsLib.isNumber(arguments[read]))
        {
            clockwise = !!arguments[read];
            read += 1;
        }

        if (nexacro._ChartGraphicsLib.isNumber(arguments[read]))
        {
            large = !!arguments[read];
            read += 1;
        }

        if (radius && radius.isZero())
        {
            return this.lineTo(to);
        }
        var middle = from.add(to).divide(2),
			pt = from.subtract(middle).rotate(-rotation),
			x = pt.x,
			y = pt.y,
			abs = Math.abs,
			EPSILON = 1e-11,
			rx = abs(radius.width),
			ry = abs(radius.height),
			rxSq = rx * rx,
			rySq = ry * ry,
			xSq = x * x,
			ySq = y * y,
			out;
        var factor = Math.sqrt(xSq / rxSq + ySq / rySq);
        if (factor > 1)
        {
            rx *= factor;
            ry *= factor;
            rxSq = rx * rx;
            rySq = ry * ry;
        }
        factor = (rxSq * rySq - rxSq * ySq - rySq * xSq) /
				(rxSq * ySq + rySq * xSq);
        if (abs(factor) < EPSILON)
        {
            factor = 0;
        }
        if (factor < 0)
        {
            // Eco.Logger.error('Cannot create an arc with the given arguments');
        }
        center = new nexacro.Point(rx * y / ry, -ry * x / rx);
        center = center.multiply((large === clockwise ? -1 : 1)
					* Math.sqrt(factor));
        center = center.rotate(rotation);
        center = center.add(middle);

        matrix = new nexacro._ChartGraphicsMatrix().translate(center).rotate(rotation)
				.scale(rx, ry);
        vector = matrix._inverseTransform(from);
        if (!vector)
        {
            return;
        }
        extent = vector.getDirectedAngle(matrix._inverseTransform(to));
        if (!clockwise && extent > 0)
            extent -= 360;
        else if (clockwise && extent < 0)
            extent += 360;

        var ext = Math.abs(extent),
			count = ext >= 360 ? 4 : Math.ceil(ext / 90),
			inc = extent / count,
			half = inc * Math.PI / 360,
			z = 4 / 3 * Math.sin(half) / (1 + Math.cos(half)),
			segs = [], seg;

        for (var i = 0; i <= count; i++)
        {
            pt = to;
			out = null;
            if (i < count)
            {
                out = vector.rotate(90).multiply(z);
                if (matrix)
                {
                    pt = matrix._transformPoint(vector);
                    out = matrix._transformPoint(vector.add(out));
                    //.subtract(pt);
                }
                else
                {
                    pt = center.add(vector);
                }
            }
            if (i === 0)
            {
                current.outVector = out;
            }
            else
            {
                var _in = vector.rotate(-90).multiply(z);
                if (matrix)
                {
                    _in = matrix._transformPoint(vector.add(_in));
                    //.subtract(pt);
                }
                seg = {
                    point: pt.clone(),
                    //inVector: control2Pt.subtract(endpt),
                    inVector: _in.clone(),
                    outVector: out,
                    nextSeg: null
                };
                segs.push(seg);
            }
            vector = vector.rotate(inc);
        }
        this._add(segs);
    };

    _pGraphicsPath.moveTo = function (pt)
    {
        var argsLen = arguments.length;
        if (argsLen == 2)
        {
            pt = new nexacro.Point(arguments[0], arguments[1]);
        }

        if (this._segments.length === 1)
        {
            this.removeSegment(0);
        }
        if (!this._segments.length)
        {
            var seg = {
                point: pt.clone(),
                nextSeg: null
            };
            this._add([seg]);
        }
    };

    _pGraphicsPath.lineTo = function (pt)
    {
        var argsLen = arguments.length;
        if (argsLen == 2)
        {
            pt = new nexacro.Point(arguments[0], arguments[1]);
        }
        var seg = {
            point: pt.clone(),
            nextSeg: null
        };
        this._add([seg]);
    };

    _pGraphicsPath.closePath = function ()
    {
        var first = this.getFirstSegment(),
			last = this.getLastSegment();
        if (first.point.equals(last.point))
        {
            first.inVector = last.inVector;
            this.removeSegment(this._segments.length - 1);
        }
        this.setClosed(true);
    };

    _pGraphicsPath.getFirstSegment = function ()
    {
        return this._segments[0];
    };

    _pGraphicsPath.getFirstSegment = function ()
    {
        return this._segments[0];
    };

    _pGraphicsPath.getLastSegment = function ()
    {
        return this._segments[this._segments.length - 1];
    };

    _pGraphicsPath.getPathData = function ()
    {
        var segs = this._segments,
			parts = [];

        if (segs.length === 0)
        {
            return '';
        }
        var mpt = segs[0].point,
			fmtNumber = nexacro._ChartGraphicsClassUtils.fmtNumber;
        //parts.push('M' + ClassUtils.fmtPoint(segs[0].point, " "));
        parts.push('M' + fmtNumber(mpt.x) + ',' + fmtNumber(mpt.y));
        for (var i = 0, l = segs.length - 1; i < l; i++)
        {
            //trace(i + "===>" + segments[i].toString() + "//" + segments[i + 1].toString());
            this._getSegPathData(parts, segs[i], segs[i + 1], false);
        }
        if (this._closed)
        {
            this._getSegPathData(parts, segs[segs.length - 1], segs[0], true);
            parts.push('Z');
        }
        return parts.join('');
    };

    _pGraphicsPath.setPathData = function (data)
    {
        var clsPoint = nexacro.Point;
        var parts = data.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig),
			coords,
			relative = false,
			control,
			l,
			j,
			i,
			current = new nexacro.Point();

        function getCoord(index, coord, update)
        {
            var val = parseFloat(coords[index]);
            if (relative)
                val += current[coord];
            if (update)
                current[coord] = val;
            return val;
        }

        function getPoint(index, update)
        {
            return new clsPoint(
				getCoord(index, 'x', update),
				getCoord(index + 1, 'y', update)
			);
        }

        //if (this._type === 'path')
        this.removeSegments();
        //else
        //	this.removeChildren();

        for (i = 0, l = parts.length; i < l; i++)
        {
            var part = parts[i],
				cmd = part[0],
				lower = cmd.toLowerCase();
            coords = part.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
            relative = cmd === lower;
            var length = coords && coords.length;
            switch (lower)
            {
                case 'm':
                case 'l':
                    for (j = 0; j < length; j += 2)
                        this[j === 0 && lower === 'm' ? 'moveTo' : 'lineTo'](
                                getPoint(j, true));
                    break;
                case 'h':
                case 'v':
                    var coord = lower == 'h' ? 'x' : 'y';
                    for (j = 0; j < length; j++)
                    {
                        getCoord(j, coord, true);
                        this.lineTo(current);
                    }
                    break;
                case 'c':
                    for (j = 0; j < length; j += 6)
                    {
                        this.cubicCurveTo(
                                getPoint(j),
                                control = getPoint(j + 2),
                                getPoint(j + 4, true));
                    }
                    break;
                case 's':
                    for (j = 0; j < length; j += 4)
                    {
                        this.cubicCurveTo(
                                current.multiply(2).subtract(control),
                                control = getPoint(j),
                                getPoint(j + 2, true));
                    }
                    break;
                case 'q':
                    for (j = 0; j < length; j += 4)
                    {
                        this.quadraticCurveTo(
                                control = getPoint(j),
                                getPoint(j + 2, true));
                    }
                    break;
                case 't':
                    for (j = 0; j < length; j += 2)
                    {
                        this.quadraticCurveTo(
                                control = current.multiply(2).subtract(control),
                                getPoint(j, true));
                    }
                    break;
                case 'a':
                    //rx ry x-axis-rotation large-arc-flag sweep-flag x y
                    for (j = 0; j < length; j += 7)
                    {
                        this.arcTo(current = getPoint(j + 5),
                        new nexacro._ChartGraphicsSize(+coords[0], +coords[1]),
                        +coords[2], +coords[4], +coords[3]);
                    }
                    break;
                case 'z':
                    this.closePath();
                    break;
            }
        }
    };

    _pGraphicsPath.hitTest = function (pt)
    {
        if (this.isClosed())
        {
            return this._contains(pt);
        }
        else
        {
            var hitsize1 = 2;
            var hitsize2 = this._strokewidth / 2;
            return this._getStrokeCross(Math.max(hitsize1, hitsize2), pt);
        }
    };

    _pGraphicsPath.contains = function (pt, tolerance)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(tolerance))
        {
            return this._contains(pt);
        }
        else
        {
            return this._getStrokeCross(tolerance, pt);
        }
    };

    _pGraphicsPath._contains = function (pt)
    {
        var x = pt.x,
			y = pt.y;
        var segments = this._segments,
			crossings = 0,
			roots = new Array(3),
			last, previous;

        if (segments.length < 2)
        {
            return false;
        }

        last = this._getValues(segments[segments.length - 1], segments[0]);

        previous = last;

        var vals, tmpx, tmpy;
        for (var i = 0, l = segments.length - 1; i < l; i++)
        {
            vals = this._getValues(segments[i], segments[i + 1]);
            tmpx = vals[0];
            tmpy = vals[1];
            //trace(i + ";;;vals==>" + vals);
            if (!(tmpx === vals[2] && tmpy === vals[3] && tmpx === vals[4]
					&& tmpy === vals[5] && tmpx === vals[6] && tmpy === vals[7]))
            {
                crossings += this._getCrossings(vals, previous,
						x, y, roots);
                previous = vals;
            }
        }
        crossings += this._getCrossings(last, previous, x, y,
				roots);
        //trace("crossings::"+ crossings);
        return (crossings & 1) === 1;
    };

    _pGraphicsPath._getStrokeCross = function (tolerance, pt)
    {
        var segs = this._segments,
			i = 0,
			l = 0,
			//rect, 
			sz = tolerance / 2;

        if (segs.length === 0)
        {
            return null;
        }
        var hitRect = new nexacro.Rect(pt.x - sz, pt.y - sz, tolerance, tolerance);
        var firstPt = segs[0].point.clone(),
			args = [],
			//retVals = [],
			//pt1, 
			pt2, controlPt1, controlPt2,
			seg1, seg2;	//, tmpX, tmpY;

        var topLeftPt = new nexacro.Point(hitRect.left, hitRect.top),
			bottomRightPt = new nexacro.Point(hitRect.getRight(), hitRect.getBottom());
			//ret;
        while (i < 4)
        {
            args[i] = new nexacro.Point();
            i++;
        }
        args[0].x = firstPt.x;
        args[0].y = firstPt.y;
        for (i = 0, l = segs.length - 1; i < l; i++)
        {
            seg1 = segs[i];
            seg2 = segs[i + 1];
            //pt1 = seg1.point;
            pt2 = seg2.point;
            controlPt1 = seg1.outVector;
            controlPt2 = seg2.inVector;
            if (!(controlPt1 && controlPt2) || (controlPt1.isZero() && controlPt2.isZero()))
            {
                args[1].x = pt2.x;
                args[1].y = pt2.y;
                //this._correctPoint(args[0], args[1]);
                //this._correctPoint(args[1], args[0]);
                //var resPt = new Eco.Point();
                if (this._intersectLineRectangle(args[0], args[1], topLeftPt, bottomRightPt))
                {
                    //trace(ret);
                    //retVals.push(resPt);
                    return true;
                }
                args[0].x = pt2.x;
                args[0].y = pt2.y;
            }
            else
            {
                args[1].x = controlPt1.x;
                args[1].y = controlPt1.y;
                args[2].x = controlPt2.x;
                args[2].y = controlPt2.y;
                args[3].x = pt2.x;
                args[3].y = pt2.y;
                if (this._intersectBezier3Rectangle(args[0], args[1], args[2], args[3], topLeftPt, bottomRightPt))
                {
                    //trace(ret);
                    //retVals.push(resPt);
                    return true;
                }
                args[0].x = pt2.x;
                args[0].y = pt2.y;
            }
        }
        if (this._closed)
        {
            seg1 = segs[segs.length - 1];
            seg2 = segs[0];
            //pt1 = seg1.point;
            pt2 = seg2.point;
            controlPt1 = seg1.outVector;
            controlPt2 = seg2.inVector;
            if (!(controlPt1 && controlPt2) || (controlPt1.isZero() && controlPt2.isZero()))
            {
                args[1].x = pt2.x;
                args[1].y = pt2.y;
                //this._correctPoint(args[0], args[1]);
                //this._correctPoint(args[1], args[0]);
                //var resPt = new Eco.Point();
                if (this._intersectLineRectangle(args[0], args[1], topLeftPt, bottomRightPt))
                {
                    //retVals.push(resPt);
                    //trace(ret);
                    return true;
                }
                args[0].x = pt2.x;
                args[0].y = pt2.y;
            }
            else
            {
                args[1].x = controlPt1.x;
                args[1].y = controlPt1.y;
                args[2].x = controlPt2.x;
                args[2].y = controlPt2.y;
                args[3].x = pt2.x;
                args[3].y = pt2.y;
                if (this._intersectBezier3Rectangle(args[0], args[1], args[2], args[3], topLeftPt, bottomRightPt))
                {
                    //trace(ret);
                    //retVals.push(resPt);
                    return true;
                }
                args[0].x = pt2.x;
                args[0].y = pt2.y;
            }
        }
        return false;

    };

    _pGraphicsPath._getRect = function (bStrokeWidth, iscurrent)
    {
        var rect = this._rect;
        if (iscurrent) rect = null;
        if (!rect)
        {
            var segs = this._segments;

            if (segs.length === 0)
            {
                rect = new nexacro.Rect();
                this._rect = rect;
                return rect;
            }
            var pt = segs[0].point,
				//pt1, 
				pt2, controlPt1, controlPt2,
				seg1, seg2, tmpX, tmpY;
            var curx = pt.x;
            var cury = pt.y;
            for (var i = 0, l = segs.length - 1; i < l; i++)
            {
                seg1 = segs[i];
                seg2 = segs[i + 1];
                //pt1 = seg1.point;
                pt2 = seg2.point;
                controlPt1 = seg1.outVector;
                controlPt2 = seg2.inVector;
                if (!(controlPt1 && controlPt2) || (controlPt1.isZero() && controlPt2.isZero()))
                {
                    tmpX = pt2.x;
                    tmpY = pt2.y;
                    if (!rect)
                    {
                        rect = new nexacro.Rect(Math.min(curx, tmpX), Math.min(cury, tmpY), Math.max(curx, tmpX) - Math.min(curx, tmpX), Math.max(cury, tmpY) - Math.min(cury, tmpY));
                    }
                    else
                    {
                        this._unionRect(rect, Math.min(curx, tmpX), Math.min(cury, tmpY), Math.max(curx, tmpX), Math.max(cury, tmpY));
                    }
                    curx = tmpX;
                    cury = tmpY;
                }
                else
                {
                    rect = this._getCurveBounds(curx, cury, controlPt1.x, controlPt1.y, controlPt2.x, controlPt2.y, pt2.x, pt2.y, rect);
                    curx = pt2.x;
                    cury = pt2.y;
                }
            }
            if (this._closed)
            {
                seg1 = segs[segs.length - 1];
                seg2 = segs[0];
                //pt1 = seg1.point;
                pt2 = seg2.point;
                controlPt1 = seg1.outVector;
                controlPt2 = seg2.inVector;
                if (!(controlPt1 && controlPt2) || (controlPt1.isZero() && controlPt2.isZero()))
                {
                    tmpX = pt2.x;
                    tmpY = pt2.y;
                    if (!rect)
                    {
                        rect = new nexacro.Rect(Math.min(curx, tmpX), Math.min(cury, tmpY), Math.max(curx, tmpX) - Math.min(curx, tmpX), Math.max(cury, tmpY) - Math.min(cury, tmpY));
                    }
                    else
                    {
                        this._unionRect(rect, Math.min(curx, tmpX), Math.min(cury, tmpY), Math.max(curx, tmpX), Math.max(cury, tmpY));
                    }
                    curx = tmpX;
                    cury = tmpY;
                }
                else
                {
                    rect = this._getCurveBounds(curx, cury, controlPt1.x, controlPt1.y, controlPt2.x, controlPt2.y, pt2.x, pt2.y, rect);
                    curx = pt2.x;
                    cury = pt2.y;
                }
            }
            if (!rect)
            {
                rect = new nexacro.Rect();
                this._rect = rect;
                if (bStrokeWidth)
                {
                    rect = rect.expand(this._getStrokeWidth());
                }
                return rect;
            }
            if (!iscurrent) this._rect = rect;
        }
        if (bStrokeWidth)
        {
            if (this._type != "Line" && (this._strokejoin == "miter" || this._strokejoin == "round"))
                rect = rect.expand((this._getStrokeWidth() * this.miterlimit));  // miterlimit 크기와 선두께에 비례하게 처리해야함.
            else
                rect = rect.expand(this._getStrokeWidth());
        }
        
        return rect;

    };

    _pGraphicsPath._unionRect = function (rect, left, top, right, bottom)
    {
        var l = Math.min(rect.left, left);
        var t = Math.min(rect.top, top);
        var r = Math.max(rect.getRight(), right);
        var b = Math.max(rect.getBottom(), bottom);
        rect.left = l;
        rect.top = t;
        rect.width = r - l;
        rect.height = b - t;
    };

    _pGraphicsPath._adjustSegments = function ()
    {
        if (this._pathDataChanged)
        {
            var length = this._countSegs(),
				segments = this._segments,
				seg;
            for (var i = 0; i < length; i++)
            {
                seg = segments[i];
                seg.nextSeg = segments[i + 1] || segments[0];
            }
            this._pathDataChanged;
        }
    };

    _pGraphicsPath._countSegs = function ()
    {
        var length = this._segments.length;
        return !this._closed && length > 0 ? length - 1 : length;
    };

    _pGraphicsPath._drawShape = function (ctx, strokeMatrix)
    {
        var segs = this._segments,
			mpt = segs[0].point,
			coords,
			prevX,
			prevY,
			i = 0,
			l = 0;

        if (segs.length === 0)
        {
            return;
        }
		
        var gap = 0;
        if (this._isOddStrokeWidth)
        {
            gap = 0.5;
        }
		function drawSegment_strokeMatrix(seg1, seg2, skipLine)
        {
            //var point1 = seg1.point,
			var	point2 = seg2.point,
				controlPt1 = seg1.outVector,
				controlPt2 = seg2.inVector, pt;

            var cnt = 2, isLine = 2;
            coords[0] = point2.x;
            coords[1] = point2.y;
            if (controlPt2 && !controlPt2.isZero())
            {
                coords[cnt++] = controlPt2.x;
                coords[cnt++] = controlPt2.y;
                isLine -= 1;
            }
            if (controlPt1 && !controlPt1.isZero())
            {
                coords[cnt++] = controlPt1.x;
                coords[cnt++] = controlPt1.y;
                isLine -= 1;
            }
            strokeMatrix._transformCoordinates(coords, 0, coords, 0, cnt / 2);
            if (isLine != 0)
            {
                if (!skipLine)
                {
                    ctx.lineTo(parseInt(coords[0]) + gap, parseInt(coords[1]) + gap);
                }
            }
            else
            {
                ctx.bezierCurveTo(parseInt(coords[4]) + gap, parseInt(coords[5]) + gap, parseInt(coords[2]) + gap, parseInt(coords[3]) + gap, parseInt(coords[0]) + gap, parseInt(coords[1]) + gap);
            }
            prevX = coords[0];
            prevY = coords[1];
        }

        function drawSegment(seg1, seg2, skipLine)
        {
            //var point1 = seg1.point,
			var	point2 = seg2.point,
				controlPt1 = seg1.outVector,
				controlPt2 = seg2.inVector, 
				pt;
            if (!(controlPt1 && controlPt2) || (controlPt1.isZero() && controlPt2.isZero()))
            {
                if (!skipLine)
                {
                    ctx.lineTo(point2.x + gap, point2.y + gap);
                }
            }
            else
            {
                ctx.bezierCurveTo(controlPt1.x + gap, controlPt1.y + gap, controlPt2.x + gap, controlPt2.y + gap, point2.x + gap, point2.y + gap);
            }
        }
        //gap = (this.getStrokeWidth() % 2) / 2;

       
        ctx.beginPath();
        if (strokeMatrix)
        {
            coords = new Array(6);
            coords[0] = mpt.x;
            coords[1] = mpt.y;
            strokeMatrix._transformCoordinates(coords, 0, coords, 0, 1);
            ctx.moveTo(parseInt(coords[0]) + gap, parseInt(coords[1]) + gap);
            prevX = coords[0];
            prevY = coords[1];

            for (i = 0, l = segs.length - 1; i < l; i++)
            {
                //trace(i + "===>" + segments[i].toString() + "//" + segments[i + 1].toString());
                drawSegment_strokeMatrix(segs[i], segs[i + 1], false);
            }
            if (this._closed)
            {
                drawSegment_strokeMatrix(segs[segs.length - 1], segs[0], true);
                ctx.closePath();
            }
        }
        else
        {
           
            ctx.moveTo(mpt.x + gap, mpt.y + gap);
            for (i = 0, l = segs.length - 1; i < l; i++)
            {
                //trace(i + "===>" + segments[i].toString() + "//" + segments[i + 1].toString());
                drawSegment(segs[i], segs[i + 1], false);
            }
            if (this._closed)
            {
                drawSegment(segs[segs.length - 1], segs[0], true);
                ctx.closePath();
            }
        }

		
    };

    _pGraphicsPath._getSegPathData = function (parts, seg1, seg2, skipLine)
    {
        //var point1 = seg1.point,
		var	point2 = seg2.point,
			controlPt1 = seg1.outVector,
			controlPt2 = seg2.inVector, pt,
			fmtNumber = nexacro._ChartGraphicsClassUtils.fmtNumber;
        if (!(controlPt1 && controlPt2) || (controlPt1.isZero() && controlPt2.isZero()))
        {
            if (!skipLine)
            {

                //parts.push('L' + ClassUtils.fmtPoint(point2, " "));
                parts.push('L' + fmtNumber(point2.x) + ',' + fmtNumber(point2.y));
            }
        }
        else
        {
            //var end = point2.subtract(point1);
            /*
			parts.push('C' + ClassUtils.fmtPoint(controlPt1, " ")
			//		+ ' ' + ClassUtils.fmtPoint(end.add(controlPt2), " ")
			//		+ ' ' + ClassUtils.fmtPoint(end, " "));
					+ ' ' + ClassUtils.fmtPoint(controlPt2, " ")
					+ ' ' + ClassUtils.fmtPoint(point2, " "));
			*/
            parts.push('C' + fmtNumber(controlPt1.x) + ',' + fmtNumber(controlPt1.y)
			//		+ ' ' + ClassUtils.fmtPoint(end.add(controlPt2), " ")
			//		+ ' ' + ClassUtils.fmtPoint(end, " "));
					+ ' ' + fmtNumber(controlPt2.x) + ',' + fmtNumber(controlPt2.y)
					+ ' ' + fmtNumber(point2.x) + ',' + fmtNumber(point2.y));
        }
    };

    _pGraphicsPath._getCurrentSegment = function (index)
    {
        var segments = this._segments;
        if (segments.length == 0)
        {
            // Eco.Logger.error('Use a moveTo() command first');
        }
        return segments[segments.length - 1];
    };

    _pGraphicsPath._getCurveBounds = function (sx, sy, ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, eX, eY, rect)
    {
        var coords = new Array(6),
			prevCoords = [sx, sy, 0, 0, ctrl1X, ctrl1Y],
			min = [sx, sy],
			max = [sx, sy],
			roots = new Array(2),
			strokePadding = this._strokePadding;
		
		coords = [eX, eY, ctrl2X, ctrl2Y, 0, 0];
        for (var i = 0; i < 2; i++)
        {
            this._calcCurve(
				prevCoords[i],
				prevCoords[i + 4],
				coords[i + 2],
				coords[i],
				i, strokePadding, min, max, roots);
        }
        if (!rect)
        {
            rect = new nexacro.Rect(min[0], min[1], max[0] - min[0], max[1] - min[1]);
        }
        else
        {
            this._unionRect(rect, min[0], min[1], max[0], max[1]);
        }
        return rect;
    };

    _pGraphicsPath._calcCurve = function (v0, v1, v2, v3, xyCoord, padding, min, max, roots)
    {
        var a = 3 * (v1 - v2) - v0 + v3,
			b = 2 * (v0 + v2) - 4 * v1,
			c = v1 - v0,
			count = nexacro._ChartGraphicsMathUtil.solveQuadratic(a, b, c, roots),
			tMin = this._curveMin,
			tMax = this._curveMax,
			u, t;

        this._calcCurveMinMax(v3, 0, xyCoord, min, max);
        for (var i = 0; i < count; i++)
        {
            t = roots[i];
            u = 1 - t;
            if (tMin < t && t < tMax)
            {
                this._calcCurveMinMax(u * u * u * v0
					+ 3 * u * u * t * v1
					+ 3 * u * t * t * v2
					+ t * t * t * v3,
					padding, xyCoord, min, max);
            }
        }
    };

    _pGraphicsPath._calcCurveMinMax = function (value, padding, xyCoord, min, max)
    {
        var left = value - padding,
			right = value + padding;

        if (left < min[xyCoord])
        {
            min[xyCoord] = left;
        }
        if (right > max[xyCoord])
        {
            max[xyCoord] = right;
        }
    };

    _pGraphicsPath._intersectLineLine = function (line1StartPt, line1EndPt, line2StartPt, line2EndPt, resPt)
    {
        var line2DistX = line2EndPt.x - line2StartPt.x,
			line2DistY = line2EndPt.y - line2StartPt.y,
			line1DistX = line1EndPt.x - line1StartPt.x,
			line1DistY = line1EndPt.y - line1StartPt.y,
			ua_t = line2DistX * (line1StartPt.y - line2StartPt.y) - line2DistY * (line1StartPt.x - line2StartPt.x),
			ub_t = line1DistX * (line1StartPt.y - line2StartPt.y) - line1DistY * (line1StartPt.x - line2StartPt.x),
			u_b = line2DistY * line1DistX - line2DistX * line1DistY;

        if (!nexacro._ChartGraphicsMathUtil.isZero(u_b))
        {
            var ua = ua_t / u_b;
            var ub = ub_t / u_b;

            if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1)
            {
                resPt.x = line1StartPt.x + ua * (line1EndPt.x - line1StartPt.x);
                resPt.y = line1StartPt.y + ua * (line1EndPt.y - line1StartPt.y);
                return true;
            }
        }
        return false;
    };

    _pGraphicsPath._intersectLineRectangle = function (lineStartPt, lineEndPt, rectTopLeftPt, rectBottomRightPt)
    {
        var clsPoint = nexacro.Point;
        var minPt = clsPoint.min(rectTopLeftPt, rectBottomRightPt);
        var maxPt = clsPoint.max(rectTopLeftPt, rectBottomRightPt);
        var topRightPt = new clsPoint(maxPt.x, minPt.y);
        var bottomLeftPt = new clsPoint(minPt.x, maxPt.y);
        var inter1 = new clsPoint(),
			inter2 = new clsPoint(),
			inter3 = new clsPoint(),
			inter4 = new clsPoint();
        var ret = this._intersectLineLine(minPt, topRightPt, lineStartPt, lineEndPt, inter1);
        var resPts = [];
        if (ret)
        {
            resPts.push(inter1);
        }
        ret = this._intersectLineLine(topRightPt, maxPt, lineStartPt, lineEndPt, inter2);
        if (ret)
        {
            resPts.push(inter2);
        }
        ret = this._intersectLineLine(maxPt, bottomLeftPt, lineStartPt, lineEndPt, inter3);
        if (ret)
        {
            resPts.push(inter3);
        }
        ret = this._intersectLineLine(bottomLeftPt, minPt, lineStartPt, lineEndPt, inter4);
        if (ret)
        {
            resPts.push(inter4);
        }
        if (resPts.length)
        {
            return resPts;
        }
    };

    _pGraphicsPath._intersectBezier3Line = function (startPt, control1Pt, control2Pt, endPt, lineStartPt, lineEndPt, resPts)
    {
        var clsPoint = nexacro.Point;
        var a, b, c, d;       // temporary variables
        var c3, c2, c1, c0;   // coefficients of cubic
        var cl;               // c coefficient for normal form of line
        var n;                // normal for normal form of line
        var min = clsPoint.min(lineStartPt, lineEndPt); // used to determine if point is on line segment
        var max = clsPoint.max(lineStartPt, lineEndPt); // used to determine if point is on line segment

        // Start with Bezier using Bernstein polynomials for weighting functions:
        //     (1-t^3)P1 + 3t(1-t)^2P2 + 3t^2(1-t)P3 + t^3P4
        //
        // Expand and collect terms to form linear combinations of original Bezier
        // controls.  This ends up with a vector cubic in t:
        //     (-P1+3P2-3P3+P4)t^3 + (3P1-6P2+3P3)t^2 + (-3P1+3P2)t + P1
        //             /\                  /\                /\       /\
        //             ||                  ||                ||       ||
        //             c3                  c2                c1       c0

        // Calculate the coefficients
        a = startPt.multiply(-1);
        b = control1Pt.multiply(3);
        c = control2Pt.multiply(-3);
        d = a.add(b.add(c.add(endPt)));
        c3 = new clsPoint(d.x, d.y); //use Vector

        a = startPt.multiply(3);
        b = control1Pt.multiply(-6);
        c = control2Pt.multiply(3);
        d = a.add(b.add(c));
        c2 = new clsPoint(d.x, d.y);

        a = startPt.multiply(-3);
        b = control1Pt.multiply(3);
        c = a.add(b);
        c1 = new clsPoint(c.x, c.y);

        c0 = new clsPoint(startPt.x, startPt.y);

        // Convert line to normal form: ax + by + c = 0
        // Find normal to line: negative inverse of original line's slope
        n = new clsPoint(lineStartPt.y - lineEndPt.y, lineEndPt.x - lineStartPt.x);

        // Determine new c coefficient
        cl = lineStartPt.x * lineEndPt.y - lineEndPt.x * lineStartPt.y;

        // ?Rotate each cubic coefficient using line for new coordinate system?
        // Find roots of rotated cubic
        var roots = [];
        nexacro._ChartGraphicsMathUtil.solveCubic(n.dot(c3), n.dot(c2), n.dot(c1), n.dot(c0) + cl, roots);

        // Any roots in closed interval [0,1] are intersections on Bezier, but
        // might not be on the line segment.
        // Find intersections and calculate point coordinates
        for (var i = 0; i < roots.length; i++)
        {
            var t = roots[i];

            if (0 <= t && t <= 1)
            {
                // We're within the Bezier curve
                // Find point on Bezier
                var p5 = startPt.lerp(control1Pt, t);
                var p6 = control1Pt.lerp(control2Pt, t);
                var p7 = control2Pt.lerp(endPt, t);

                var p8 = p5.lerp(p6, t);
                var p9 = p6.lerp(p7, t);

                var p10 = p8.lerp(p9, t);

                // See if point is on line segment
                // Had to make special cases for vertical and horizontal lines due
                // to slight errors in calculation of p10
                if (lineStartPt.x == lineEndPt.x)
                {
                    if (min.y <= p10.y && p10.y <= max.y)
                    {
                        resPts.push(p10);
                    }
                }
                else if (lineStartPt.y == lineEndPt.y)
                {
                    if (min.x <= p10.x && p10.x <= max.x)
                    {
                        resPts.push(p10);
                    }
                }
                else if (p10.gte(min) && p10.lte(max))
                {
                    resPts.push(p10);
                }
            }
        }
        if (resPts.length) return true;
        return false;
    };

    _pGraphicsPath._intersectBezier3Rectangle = function (startPt, control1Pt, control2Pt, endPt, rectTopLeftPt, rectBottomRightPt)
    {
        var clsPoint = nexacro.Point;
        var minPt = clsPoint.min(rectTopLeftPt, rectBottomRightPt);
        var maxPt = clsPoint.max(rectTopLeftPt, rectBottomRightPt);
        var topRightPt = new clsPoint(maxPt.x, minPt.y);
        var bottomLeftPt = new clsPoint(minPt.x, maxPt.y);
        var inter1 = [],
			inter2 = [],
			inter3 = [],
			inter4 = [];

        var ret = this._intersectBezier3Line(startPt, control1Pt, control2Pt, endPt, minPt, topRightPt, inter1);
        var resPts = [];
        if (ret)
        {
            resPts = resPts.concat(inter1);
        }
        ret = this._intersectBezier3Line(startPt, control1Pt, control2Pt, endPt, topRightPt, maxPt, inter2);
        if (ret)
        {
            resPts = resPts.concat(inter2);
        }
        ret = this._intersectBezier3Line(startPt, control1Pt, control2Pt, endPt, maxPt, bottomLeftPt, inter3);
        if (ret)
        {
            resPts = resPts.concat(inter3);
        }
        ret = this._intersectBezier3Line(startPt, control1Pt, control2Pt, endPt, bottomLeftPt, minPt, inter4);
        if (ret)
        {
            resPts = resPts.concat(inter4);
        }
        if (resPts.length)
        {
            return resPts;
        }
    };

    _pGraphicsPath._getValues = function (seg1, seg2)
    {
        var pt1 = seg1.point;
        var pt2 = seg2.point;
        var controlPt1 = seg1.outVector;
        var controlPt2 = seg2.inVector;

        if (!(controlPt1 && controlPt2) || (controlPt1.isZero() && controlPt2.isZero()))
        {
            return [
				pt1.x, pt1.y,
				pt1.x, pt1.y,
				pt2.x, pt2.y,
				pt2.x, pt2.y
            ];
        }
        else
        {
            return [
				pt1.x, pt1.y,
				controlPt1.x, controlPt1.y,
				controlPt2.x, controlPt2.y,
				pt2.x, pt2.y
            ];
        }
    };

    _pGraphicsPath._evaluate = function (v, t, type)
    {
        var p1x = v[0], p1y = v[1],
			c1x = v[2], c1y = v[3],
			c2x = v[4], c2y = v[5],
			p2x = v[6], p2y = v[7],
			x, y;

        if (type === 0 && (t === 0 || t === 1))
        {
            x = t === 0 ? p1x : p2x;
            y = t === 0 ? p1y : p2y;
        }
        else
        {
            var cx = 3 * (c1x - p1x),
				bx = 3 * (c2x - c1x) - cx,
				ax = p2x - p1x - cx - bx,

				cy = 3 * (c1y - p1y),
				by = 3 * (c2y - c1y) - cy,
				ay = p2y - p1y - cy - by;
            if (type === 0)
            {
                x = ((ax * t + bx) * t + cx) * t + p1x;
                y = ((ay * t + by) * t + cy) * t + p1y;
            }
            else
            {
                var tMin = this._curveMin;
                if (t < tMin && c1x == p1x && c1y == p1y
						|| t > 1 - tMin && c2x == p2x && c2y == p2y)
                {
                    x = c2x - c1x;
                    y = c2y - c1y;
                }
                else
                {
                    x = (3 * ax * t + 2 * bx) * t + cx;
                    y = (3 * ay * t + 2 * by) * t + cy;
                }
                if (type === 3)
                {
                    var x2 = 6 * ax * t + 2 * bx,
						y2 = 6 * ay * t + 2 * by;
                    return (x * y2 - y * x2) / Math.pow(x * x + y * y, 3 / 2);
                }
            }
        }
        return type == 2 ? new nexacro.Point(y, -x) : new nexacro.Point(x, y);
    };

    _pGraphicsPath._solveCubic = function (v, coord, val, roots)
    {
        var p1 = v[coord],
			c1 = v[coord + 2],
			c2 = v[coord + 4],
			p2 = v[coord + 6],
			c = 3 * (c1 - p1),
			b = 3 * (c2 - c1) - c,
			a = p2 - p1 - c - b;
        return nexacro._ChartGraphicsMathUtil.solveCubic(a, b, c, p1 - val, roots);
    };

    _pGraphicsPath._getParameterOf = function (v, x, y)
    {
        var tMin = this._curveMin;
        if (Math.abs(v[0] - x) < tMin
				&& Math.abs(v[1] - y) < tMin)
        {
            return 0;
        }
        if (Math.abs(v[6] - x) < tMin
				&& Math.abs(v[7] - y) < tMin)
        {
            return 1;
        }
        var txs = [],
			tys = [],
			sx = this._solveCubic(v, 0, x, txs),
			sy = this._solveCubic(v, 1, y, tys),
			tx, ty;
        for (var cx = 0; sx == -1 || cx < sx;)
        {
            if (sx == -1 || (tx = txs[cx++]) >= 0 && tx <= 1)
            {
                for (var cy = 0; sy == -1 || cy < sy;)
                {
                    if (sy == -1 || (ty = tys[cy++]) >= 0 && ty <= 1)
                    {
                        if (sx == -1) tx = ty;
                        else if (sy == -1) ty = tx;
                        if (Math.abs(tx - ty) < tMin)
                        {
                            return (tx + ty) * 0.5;
                        }
                    }
                }
                if (sx == -1)
                {
                    break;
                }
            }
        }
        return null;
    };

    _pGraphicsPath._changesOrientation = function (tangent, prev)
    {
        return this._evaluate(prev, 1, 1).y * tangent.y > 0;
    };

    _pGraphicsPath._getAngle = function (pt)
    {
        return this._getAngleInRadians.apply(this, arguments) * 180 / Math.PI;
    };

    _pGraphicsPath._getAngleInRadians = function (pt0)
    {
        if (arguments.length == 1)
        {
            return Math.atan2(pt0.y, pt0.x);
        }
        else
        {
            var pt = arguments[1];
            if (!(pt instanceof nexacro.Point))
            {
                pt = new nexacro.Point(arguments[1], arguments[2]);
            }
            var div = this.getLength() * pt.getLength();
            if (div === 0)
            {
                return NaN;
            }
            else
            {
                return Math.acos(this.dot(pt) / div);
            }
        }
    };

    _pGraphicsPath._getCrossings = function (v, prev, x, y, roots)
    {
        var count = this._solveCubic(v, 1, y, roots),
			crossings = 0,
			tolerance = this._curveMin,
			abs = Math.abs;

        if (count === -1)
        {
            roots[0] = this._getParameterOf(v, x, y);
            count = roots[0] !== null ? 1 : 0;
        }

        for (var i = 0; i < count; i++)
        {
            var t = roots[i];
            if (t > -tolerance && t < 1 - tolerance)
            {
                var pt = this._evaluate(v, t, 0);
                if (x < pt.x + tolerance)
                {
                    var tan = this._evaluate(v, t, 1);
                    if (Math.abs(pt.x - x) < tolerance)
                    {
                        // var angle = tan.getAngle();
                        var angle = this._getAngle(tan);
                        if (angle > -180 && angle < 0
							&& (t > tolerance || this._changesOrientation(tan, prev)))
                        {
                            continue;
                        }
                    }
                    else
                    {
                        if (Math.abs(tan.y) < tolerance
							|| t < tolerance && !this._changesOrientation(tan, prev))
                        {
                            continue;
                        }
                    }
                    crossings++;
                }
            }
        }
        return crossings;
    };
}

if (!nexacro.ChartGraphicsPaths)
{
    nexacro.ChartGraphicsPaths = function ()
    {
        this._type = "Paths";
        nexacro._ChartGraphicsObject.prototype.constructor.apply(this, arguments);
        var childs = arguments[this.__readArgs];
        this._childchanged = 0;
        if (nexacro._ChartGraphicsLib.isArray(childs))
        {
            this._addChildren(childs);
        }
    };

    var _pGraphicsPaths = nexacro.ChartGraphicsPaths.prototype = nexacro._createPrototype(nexacro._ChartGraphicsObject, nexacro.ChartGraphicsPaths);
    _pGraphicsPaths._type_name = "GraphicsPaths";

    // Property	
    _pGraphicsPaths.strokepen = "";
    _pGraphicsPaths.fillstyle = "";
    _pGraphicsPaths.fillgradation = "";

    //internal variables

    //============================================================
    // nexacro.ChartGraphicsPaths : Properties
    //============================================================
	// 8.20-1 Shadow
	_pGraphicsPaths.set_shadow = function (val) {
		var oldval = this.shadow, oldobj, newobj;

		if (oldval != val) {
			this.shadow = val;
			oldobj = this._currentShadow;

			if (val) {
				if (oldobj == null || oldobj.value != val) {
					newobj = nexacro.ShadowObjectNew(val);
					this._currentShadow = newobj;
				}
			}
			else 
			{
				this._currentShadow = null;
				return;
			}

			var node = this._firstchild;
			for (; node; node = node._nextsibling) {
				node.set_shadow(newobj);
			}
		}
	};
	
    _pGraphicsPaths.set_strokepen = function (val)
    {
        var oldval = this.strokepen,
			oldobj, newobj;

        if (oldval != val)
        {
            this.strokepen = val;
            oldobj = this._currentStrokepen;

            if (val)
            {
                if (oldobj == null || oldobj.value != val)
                {
                    newobj = nexacro.BorderLineObject(val);
                    this._currentStrokepen = newobj;
                }
            }
            else
            {
                if (oldobj)
                {
                    this._currentStrokepen = null;
                }
            }

            var node = this._firstchild;
            for (; node ; node = node._nextsibling)
            {
                node.set_strokepen(newobj);
            }
            if (newobj)
            {
                var lineW = newobj.width || 0;
                if (this._strokeWidth != lineW)
                {
                    this._strokeWidth = lineW;
                    this._bounds = null;
                    this._globalBounds = null;
                }
            }
            else
            {
                if (this._strokeWidth != 0)
                {
                    this._strokeWidth = 0;
                }
            }
        }
    };

    _pGraphicsPaths.set_fillstyle = function (val)
    {
        var oldval = this.fillstyle,
			oldobj, newobj;

        if (oldval != val)
        {
            this.fillstyle = val;
            oldobj = this._currentFillstyle;

            if (val)
            {
                if (oldobj == null || oldobj.value != val)
                {
                    newobj = nexacro.BackgroundObject(val);
                    this._currentFillstyle = newobj;
                }
            }
            else
            {
                if (oldobj)
                {
                    this._currentFillstyle = null;
                }
            }

            var node = this._firstchild;
            for (; node ; node = node._nextsibling)
            {
                node.set_fillstyle(val);
            }
        }
    };

    _pGraphicsPaths.set_fillgradation = function ()
    {

    };

    //============================================================
    // nexacro.ChartGraphicsPaths : methods
    //============================================================	
    _pGraphicsPaths.destroy = function ()
    {
		// 8.20-1 Shadow
		if(this._currentShadow) this._currentShadow = null;
		if(this._currentFillstyle) this._currentFillstyle = null;
		if(this._currentFillgradation) this._currentFillgradation = null;
		if(this._currentStrokepen) this._currentStrokepen = null;	
		
        this.clear();
        nexacro._ChartGraphicsObject.prototype.destroy.call(this);
    };

    _pGraphicsPaths.clear = function ()
    {
        var node = this._firstchild,
			delected = false, removed = [];
        for (; node ; node = node._nextsibling)
        {
            removed[removed.length] = node;
        }
        for (var i = 0, len = removed.length; i < len ; i++)
        {
            node = removed[i];
            node._remove(true);
            node.parent = null;
            node._nextsibling = null;
            node._previoussibling = null;
            delected = true;
        }

        if (delected)
        {
            this._firstchild._isfirstchild = false;
            this._firstchild = null;
            this._childchanged++;
            this._drawflags |= 4; //boundchanged
            var layer = this._getOwnerLayer();
            if (layer)
            {
                layer._onTreeChanged();
            }
            var childListCache = this._childListCache;
            if (childListCache)
            {
                childListCache.fchild = null;
                childListCache.fchildindex = -1;
                childListCache.flength = -1;
            }
        }

    };

    _pGraphicsPaths.getFirstChild = function ()
    {
        return this._firstchild;
    };

    _pGraphicsPaths.getLastChild = function ()
    {
        var child = this._firstchild;
        return child ? child._previoussibling : null;
    };

    _pGraphicsPaths.getFirstSegment = function ()
    {
        var first = this.getFirstChild();
        return first && first.getFirstSegment();
    };

    _pGraphicsPaths.getLastSegment = function ()
    {
        var last = this.getLastChild();
        return last && last.getLastSegment();
    };

    _pGraphicsPaths.getObjectByID = function (id)
    {
        if (!id) return null;
        return this._getItemById(id);
    };

    _pGraphicsPaths.moveTo = function ()
    {
        var path = new nexacro.ChartGraphicsPath();
        path.set_id(this.id + "_path" + this.childlength);
        this.addChild(path);
        path.moveTo.apply(path, arguments);
    };

    _pGraphicsPaths.moveBy = function (x, y)
    {
        var pt;
        if (x instanceof nexacro.Point)
        {
            pt = x;
        }
        else if (nexacro._ChartGraphicsLib.isNumber(x) && nexacro._ChartGraphicsLib.isNumber(y))
        {
            pt = new nexacro.Point(x, y);
        }
        else
        {
            // Eco.Logger.error("invalid arguments! =>" + Eco.Logger._getDumpString(arguments, true));
        }
        this.moveTo(this._getCurrentPath().getLastSegment().point.add(pt));

    };

    _pGraphicsPaths.lineTo = function ()
    {
		
        var path = this._getCurrentPath();
        path.lineTo.apply(path, arguments);
    };

    // GraphicsPath의 curveTo()에서 버그 발생으로 현재 미노출
    // _pGraphicsPaths.curveTo = function ()
    // {
    // var path = this._getCurrentPath();
    // path.curveTo.apply(path, arguments);
    // };

    _pGraphicsPaths.quadraticCurveTo = function ()
    {
        var path = this._getCurrentPath();
        path.quadraticCurveTo.apply(path, arguments);
    };

    _pGraphicsPaths.cubicCurveTo = function ()
    {
        var path = this._getCurrentPath();
        path.cubicCurveTo.apply(path, arguments);
    };

    _pGraphicsPaths.arcTo = function ()
    {
        var path = this._getCurrentPath();
        path.arcTo.apply(path, arguments);
    };

    _pGraphicsPaths.closePath = function ()
    {
		if(this._getCurrentPath())
		{
			this._getCurrentPath().closePath();
		}
    };

    _pGraphicsPaths.getPathData = function ()
    {
        var node = this._firstchild,
			paths = [];
        for (; node ; node = node._nextsibling)
        {
            paths.push(node.getPathData());
        }
        return paths.join(' ');
    };

    _pGraphicsPaths.setPathData = function (data)
    {
        var clsPoint = nexacro.Point;
        var parts = data.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig),
			coords,
			relative = false,
			control,
			current = new nexacro.Point();

        function getCoord(index, coord, update)
        {
            var val = parseFloat(coords[index]);
            if (relative)
                val += current[coord];
            if (update)
                current[coord] = val;
            return val;
        }

        function getPoint(index, update)
        {
            return new clsPoint(
				getCoord(index, 'x', update),
				getCoord(index + 1, 'y', update)
			);
        }

        this.clear();

        for (var i = 0, l = parts.length; i < l; i++)
        {
            var part = parts[i],
				cmd = part[0],
				j,
				lower = cmd.toLowerCase();
            coords = part.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
            relative = cmd === lower;
            var length = coords && coords.length;
            switch (lower)
            {
                case 'm':
                case 'l':
                    for (j = 0; j < length; j += 2)
                        this[j === 0 && lower === 'm' ? 'moveTo' : 'lineTo'](
                                getPoint(j, true));
                    break;
                case 'h':
                case 'v':
                    var coord = lower == 'h' ? 'x' : 'y';
                    for (j = 0; j < length; j++)
                    {
                        getCoord(j, coord, true);
                        this.lineTo(current);
                    }
                    break;
                case 'c':
                    for (j = 0; j < length; j += 6)
                    {
                        this.cubicCurveTo(
                                getPoint(j),
                                control = getPoint(j + 2),
                                getPoint(j + 4, true));
                    }
                    break;
                case 's':
                    for (j = 0; j < length; j += 4)
                    {
                        this.cubicCurveTo(
                                current.multiply(2).subtract(control),
                                control = getPoint(j),
                                getPoint(j + 2, true));
                    }
                    break;
                case 'q':
                    for (j = 0; j < length; j += 4)
                    {
                        this.quadraticCurveTo(
                                control = getPoint(j),
                                getPoint(j + 2, true));
                    }
                    break;
                case 't':
                    for (j = 0; j < length; j += 2)
                    {
                        this.quadraticCurveTo(
                                control = current.multiply(2).subtract(control),
                                getPoint(j, true));
                    }
                    break;
                case 'a':
                    //rx ry x-axis-rotation large-arc-flag sweep-flag x y
                    for (j = 0; j < length; j += 7)
                    {
                        this.arcTo(current = getPoint(j + 5),
                        new nexacro._ChartGraphicsSize(+coords[0], +coords[1]),
                        +coords[2], +coords[4], +coords[3]);
                    }
                    break;
                case 'z':
                    this.closePath();
                    break;
            }
        }
    };

    _pGraphicsPaths.getObjects = function ()
    {
        if (this._firstchild)
        {
            var children = this._children;
            if (!children || (children._changed != this._childchanged))
            {
                children = [];
                var child = this._firstchild, seq = 0;
                for (; child != null ; child = child._nextsibling)
                {
                    children[seq] = child;
                    seq++;
                }
                this._children = children;
                children._changed = this._childchanged;
            }
            return children;
        }
    };

    _pGraphicsPaths.insertChild = function (newChild, refChild)
    {
        return this._insertBefore(newChild, refChild);
    };

    _pGraphicsPaths.addChild = function (child)
    {
        return this.insertChild(child, null);
    };

    _pGraphicsPaths.removeChild = function (oldChild)
    {
        return this._removeChild(oldChild);
    };

    _pGraphicsPaths._render = function (ctx)
    {
        this._painted = 1;
    };

    _pGraphicsPaths._addChildren = function (arr)
    {
		
        if (!nexacro._ChartGraphicsLib.isArray(arr) || !arr.length)
        {
            return false;
        }
		var i,
			len = arr.length - 1;
        if (!this._firstchild)
        {
            this._firstchild = arr[0];
            arr[0]._isfirstchild = true;

            this._childidx_map[arr[0].id] = true;
            for (i = 0; i < len ; i++)
            {
                arr[i]._nextsibling = arr[i + 1];
                arr[i + 1]._previoussibling = arr[i];
                this._childidx_map[arr[i + 1].id] = true;
            }
            arr[0]._previoussibling = arr[arr.length - 1];
        }
        else
        {
            //var node = arr[0];
            var lastChild = this._firstchild._previoussibling;
            lastChild._nextsibling = arr[0];
            arr[0]._previoussibling = lastChild;

            this._childidx_map[arr[0].id] = true;
            for (i = 0; i < len ; i++)
            {
                arr[i]._nextsibling = arr[i + 1];
                arr[i + 1]._previoussibling = arr[i];
                this._childidx_map[arr[i + 1].id] = true;
            }
            this._firstchild._previoussibling = arr[arr.length - 1];
        }

        this.childlength += arr.length;
        this._childchanged++; //childchanged
        this._drawflags |= 4; //boundchanged
        var layer = this._getOwnerLayer();
        if (layer)
        {
            layer._onTreeChanged();
        }
        var childListCache = this._childListCache;
        if (childListCache)
        {
            if (childListCache.flength != -1)
            {
                childListCache.flength += arr.length;
            }
            if (childListCache.fchildindex != -1)
            {
                childListCache.fchildindex = -1;
            }
        }
    };

    _pGraphicsPaths._updateStyles = function (ctx, sizeChanged)
    {
        // 확인필요
    };

	_pGraphicsPaths._insertBefore = function ()
	{
	    var child = nexacro._ChartGraphicsObject.prototype._insertBefore.apply(this, arguments);

	    if (child)
	    {
			// 8.20-1 Shadow
			if (this._currentShadow) {
				child.set_shadow(this._currentShadow);
			}
	        if (this._currentStrokepen)
	        {
	            child.set_strokepen(this._currentStrokepen);
	        }
	        if (this._currentFillstyle)
	        {
	            child.set_fillstyle(this._currentFillstyle);
	        }
	        if (this._currentFillgradation)
	        {
	            child.set_fillgradation(this._currentFillgradation);
	        }
	    }
	};

    _pGraphicsPaths._getCurrentPath = function ()
    {
        var len = this._getLength();
        if (!len)
        {
			trace("getCurrentPath error length = 0. Use a moveTo() command first");
			return;
            // Eco.Logger.error("Use a moveTo() command first");
        }
        return this.getChildByIndex(len - 1);

    };

    _pGraphicsPaths.getChildByIndex = function (index)
    {
        if (this._firstchild)
        {
            var children = this._children;
            if (children && (children._changed == this._childchanged))
            {
                return children[index];
            }
            return this._getChildByIndex(index);
        }
    };

    // getObjects()결과 Object에 length로 대체 가능 (내부에서 사용 - Path -_getCurrentPath(), Shapes - hitTest()
    _pGraphicsPaths._getLength = function ()
    {
        if (this._firstchild)
        {
            var children = this._children;
            if (children && (children._changed == this._childchanged))
            {
                return children.length;
            }
            return this._getChildrenLength();
        }
        return 0;
    };

    _pGraphicsPaths._getChildrenLength = function ()
    {
        var childListCache = this._childListCache;
        if (!childListCache)
        {
            var firstChild = this._firstchild;
            if (!firstChild)
            {
                return 0;
            }

            if (firstChild == this.getLastChild())
            {
                return 1;
            }
            childListCache = {
                flength: -1,
                fchildindex: -1,
                fchild: null,
                fowner: this
            };
            this._childListCache = childListCache;
        }
        if (childListCache.flength == -1)
        {
            var l, n;
            if (childListCache.fchildindex != -1 &&
				childListCache.fchild != null)
            {
                l = childListCache.fchildindex;
                n = childListCache.fchild;
            }
            else
            {
                n = this._firstchild;
                l = 0;
            }
            while (n)
            {
                l++;
                n = n._nextsibling;
            }
            childListCache.flength = l;
        }
        return childListCache.flength;
    };

    _pGraphicsPaths._getChildByIndex = function (index)
    {
        var childListCache = this._childListCache;
        if (!childListCache)
        {
            if (this._firstchild == this.getLastChild())
            {
                return index == 0 ? this._firstchild : null;
            }
            childListCache = {
                flength: -1,
                fchildindex: -1,
                fchild: null,
                fowner: this
            };
            this._childListCache = childListCache;
        }
        var i = childListCache.fchildindex;
        var n = childListCache.fchild;
        var firstAccess = true;
        if (i != -1 && n != null)
        {
            firstAccess = false;
            if (i < index)
            {
                while (i < index && n)
                {
                    i++;
                    n = n._nextsibling;
                }
            }
            else if (i > index)
            {
                while (i > index && n)
                {
                    i--;
                    n = n.getPreviousSibling();
                }
            }
        }
        else
        {
            if (index < 0)
            {
                return null;
            }
            n = this._firstchild;
            for (i = 0 ; i < index && n ; i++)
            {
                n = n._nextsibling;
            }
        }
        if (!firstAccess && (n == this._firstchild || n == this.getLastChild()))
        {
            childListCache.fchildindex = -1;
            childListCache.fchild = null;
        }
        else
        {
            childListCache.fchildindex = i;
            childListCache.fchild = n;
        }
        return n;
    };

}

if (!nexacro.ChartGraphicsLine)
{
    nexacro.ChartGraphicsLine = function ()
    {
        nexacro.ChartGraphicsPath.prototype.constructor.apply(this, arguments);
        this._type = "Line";
        var addarr = [];
        var seg = {};
        seg = {
            point: new nexacro.Point(0, 0),
            nextSeg: null
        };
        addarr.push(seg);
        seg = {
            point: new nexacro.Point(0, 0),
            nextSeg: null
        };
        addarr.push(seg);
        this._add(addarr);
    };

    var _pGraphicsLine = nexacro.ChartGraphicsLine.prototype = nexacro._createPrototype(nexacro.ChartGraphicsPath, nexacro.ChartGraphicsLine);
    _pGraphicsLine._type_name = "GraphicsLine";

    // Property	
    _pGraphicsLine.x1 = 0;
    _pGraphicsLine.x1 = 0;
    _pGraphicsLine.x2 = 0;
    _pGraphicsLine.y2 = 0;

    //internal variables

    //============================================================
    // nexacro.ChartGraphicsLine : Properties
    //============================================================
    _pGraphicsLine.set_x1 = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }
        var segs = this._segments;
        if (segs[0].point.x != v)
        {
            segs[0].point.x = v;
            this.x1 = v;
            this._drawflags |= 4; //contentschanged
        }
    };

    _pGraphicsLine.set_y1 = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }
        var segs = this._segments;
        if (segs[0].point.y != v)
        {
            segs[0].point.y = v;
            this.y1 = v;
            this._drawflags |= 4; //contentschanged
        }
    };

    _pGraphicsLine.set_x2 = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }
        var segs = this._segments;
        if (segs[1].point.x != v)
        {
            segs[1].point.x = v;
            this.x2 = v;
            this._drawflags |= 4; //contentschanged
        }
    };

    _pGraphicsLine.set_y2 = function (v)
    {
        if (!nexacro._ChartGraphicsLib.isNumber(v))
        {
            return;
        }
        var segs = this._segments;
        if (segs[1].point.y != v)
        {
            segs[1].point.y = v;
            this.y2 = v;
            this._drawflags |= 4; //contentschanged
        }
    };


    //============================================================
    // nexacro.ChartGraphicsLine : methods
    //============================================================
    _pGraphicsLine.destroy = function ()
    {
        this.x1 = null;
        this.x1 = null;
        this.x2 = null;
        this.y2 = null;

        nexacro.ChartGraphicsPath.prototype.destroy.call(this);
    };

    //===============================================================
    // nexacro.ChartGraphicsLine : Logical part
    //===============================================================

}

if (!nexacro.ChartGraphicsGroup)
{
    nexacro.ChartGraphicsGroup = function ()
    {
        this._type = "Group";
        this._childchanged = 0;
        nexacro._ChartGraphicsObject.call(this);
    };

    var _pGraphicsGroup = nexacro.ChartGraphicsGroup.prototype = nexacro._createPrototype(nexacro._ChartGraphicsObject, nexacro.ChartGraphicsGroup);
    _pGraphicsGroup._type_name = "GraphicsGroup";


    //============================================================
    // nexacro._pGraphicsGroup : methods
    //============================================================	
    _pGraphicsGroup.destroy = function ()
    {
        this.clear();
        this._childchanged = null;
        nexacro._ChartGraphicsObject.prototype.destroy.call(this);
    };

    _pGraphicsGroup.clear = function ()
    {
        var node = this._firstchild,
			delected = false, removed = [];
        for (; node ; node = node._nextsibling)
        {
            removed[removed.length] = node;
        }
        for (var i = 0, len = removed.length; i < len ; i++)
        {
            node = removed[i];
            node._remove(true);
            node.parent = null;
            node._nextsibling = null;
            node._previoussibling = null;
            delected = true;
        }

        this._childidx_map = {};
        this.childlength = 0;

        if (delected)
        {
            this._firstchild._isfirstchild = false;
            this._firstchild = null;
            this._childchanged++;
            this._drawflags |= 4; //boundchanged
            var layer = this._getOwnerLayer();
            if (layer)
            {
                layer._onTreeChanged();
            }
            var childListCache = this._childListCache;
            if (childListCache)
            {
                childListCache.fchild = null;
                childListCache.fchildindex = -1;
                childListCache.flength = -1;
            }
        }
    };

    _pGraphicsGroup.getObjectByID = function (id)
    {
        if (!id) return null;
        return this._getItemById(id);
    };

    _pGraphicsGroup.getObjects = function ()
    {
        if (this._firstchild)
        {
            var children = this._children;
            if (!children || (children._changed != this._childchanged))
            {
                children = [];
                var child = this._firstchild, seq = 0;
                for (; child != null ; child = child._nextsibling)
                {
                    children[seq] = child;
                    seq++;
                }
                this._children = children;
                children._changed = this._childchanged;
            }
            return children;
        }
    };

    _pGraphicsGroup.getFirstChild = function ()
    {
        return this._firstchild;
    };

    _pGraphicsGroup.getLastChild = function ()
    {
        var child = this._firstchild;
        return child ? child._previoussibling : null;
    };

    _pGraphicsGroup.insertChild = function (newChild, refChild)
    {
        return this._insertBefore(newChild, refChild);
    };

    _pGraphicsGroup.addChild = function (child)
    {
        return this.insertChild(child, null);
    };

    _pGraphicsGroup.removeChild = function (oldChild)
    {
        return this._removeChild(oldChild);
    };

}

if (!nexacro._ChartGraphicsLayer)
{
    //==============================================================================
    // nexacro._ChartGraphicsLayer
    //==============================================================================
    nexacro._ChartGraphicsLayer = function ()
    {
        nexacro._ChartGraphicsHashMap.getHashKey("ge", this);

        this._dirtyRectsMgr = new nexacro._ChartGraphicsRectsManager();
        this._childidx_map = {};
        this._totalItems = [];
    };

    var _pGraphicsLayer = nexacro._ChartGraphicsLayer.prototype = nexacro._createPrototype(nexacro._ChartGraphicsObject, nexacro._ChartGraphicsLayer);
    _pGraphicsLayer._type_name = "_GraphicsLayer";

    /* default properties */
    _pGraphicsLayer.childlength = 0;

    /* internal variable */
    _pGraphicsLayer._type = "Layer";
    _pGraphicsLayer._renderHint = "all";

    _pGraphicsLayer._level = 0;
    _pGraphicsLayer._treechange = 0;
    _pGraphicsLayer._childchanged = 0;

    //============================================================
    // nexacro._pGraphicsLayer : Properties
    //============================================================

    //============================================================
    // nexacro._pGraphicsLayer : Methods
    //============================================================
    _pGraphicsLayer.getObjectByID = function (id)
    {
        if (id)
        {
            return this._getItemById(id);
        }

        return null;
    };

    _pGraphicsLayer.getAllObjects = function ()
    {
        var items = this._totalItems;
        if (!items || !items.length || (this._treechange != items._treechange))
        {
            var idx = 0;
            var node = this._firstchild;

            items = [];
            for (; node ; node = node._nextsibling)
            {
                node._index = idx;
                this._getAllObjects(items, node, 1);
                idx++;
            }

            this._totalItems = items;
            items._treechange = this._treechange;
        }

        return items;
    };

    _pGraphicsLayer.getFirstChild = function ()
    {
        return this._firstchild;
    };

    _pGraphicsLayer.getLastChild = function ()
    {
        if (this._firstchild)
        {
            return this._firstchild._previoussibling;
        }

        return null;
    };

    _pGraphicsLayer.addChild = function (child)
    {
        return this.insertChild(child, null);
    };

    _pGraphicsLayer.removeChild = function (oldChild)
    {
        return this._removeChild(oldChild);
    };

    _pGraphicsLayer.insertChild = function (newChild, refChild)
    {
        return this._insertBefore(newChild, refChild);
    };

    _pGraphicsLayer.clear = function ()
    {
        var node = this._firstchild;
        var delected = false;
        var removed = [];

        for (; node ; node = node._nextsibling)
        {
            removed[removed.length] = node;
        }

        for (var i = 0, len = removed.length; i < len ; i++)
        {
            node = removed[i];
            node._remove(true);
            node.parent = null;
            node._nextsibling = null;
            node._previoussibling = null;
            delected = true;
        }

        this._childidx_map = {};
        this.childlength = 0;

        if (delected)
        {
            this._firstchild._isfirstchild = false;
            this._firstchild = null;
            this._childchanged++;
            this._drawflags |= 4; //boundchanged
            var layer = this._getOwnerLayer();
            if (layer)
            {
                layer._onTreeChanged();
            }
            var childListCache = this._childListCache;
            if (childListCache)
            {
                childListCache.fchild = null;
                childListCache.fchildindex = -1;
                childListCache.flength = -1;
            }
        }
    };

    _pGraphicsLayer._reMoveParent = function () { };
    _pGraphicsLayer.destroy = function ()
    {

        this.clear();

        var i, item;
        var items = this.getAllObjects();
        for (i = 0; i < items.length; i++)
        {
            item = items[i];
            if (item)
            {
                item.destroy();
                items[i] = null;
            }
        }

        this._dirtyRectsMgr = null;
        this._childidx_map = null;

        this._totalItems = null;
        this._quadtree = null;

        if (this._canvas)
        {
            this._canvas.destroy();
            this._canvas = null;
        }

        nexacro._ChartGraphicsObject.prototype.destroy.call(this);
    };

    _pGraphicsLayer.hitTest = function (pt)
    {
        var rect = new nexacro.Rect(pt.x - 1, pt.y - 1, 3, 3);
        var item = this._hitTestItems(this, pt, rect);
        if (this != item)
        {
            return item;
        }
        return null;
    };

    _pGraphicsLayer.hitTestAll = function (pt)
    {
        var ret = [];
        var rect = new nexacro.Rect(pt.x - 1, pt.y - 1, 3, 3);
        this._hitTestAllItems(this, pt, rect, ret);

        return ret;
    };

    //===============================================================
    // nexacro._pGraphicsLayer : Logical part
    //===============================================================
    _pGraphicsLayer._beforePaint = function ()
    {
        if (this._renderHint == "all")
        {
            this._drawAll(this._totalItems);
        }
        else
        {
            this._drawDirty(this._totalItems);
        }
    };

    _pGraphicsLayer._paint = function ()
    {
        // TODO : get 에서 너무 많은걸 함
        var totalItems = this.getAllObjects();

        if (this._renderHint == "all")
        {
            this._renderAll(totalItems);
        }
        else
        {
            this._renderDirty(totalItems);
        }

        this._setQuadTree(totalItems);
    };

    _pGraphicsLayer._drawAll = function (totalItems)
    {
        var item, drawflags;
        for (var i = totalItems.length - 1 ; i > -1 ; i--)
        {
            item = totalItems[i];
            if (item._painting & 1)
            {
                drawflags = item._jobDrawflags;
                if (drawflags & (1 | 2 | 4)) //matrixchanged, sizechanged, contentschanged
                {
                    if (drawflags & 1) //matrixchanged
                    {
                        item._bounds = null;
                        item._globalBounds = null;
                    }
                    if (drawflags & (2 | 4)) //sizechanged, contentschanged
                    {
                        item._bounds = null;
                        item._globalBounds = null;
                        item._rect = null;
                    }
                    var p = item.parent;
                    if (p && !(p._jobDrawflags & 4))
                    {
                        if (p == this)
                        {
                            p._rect = null;
                        }
                        else
                        {
                            p._jobDrawflags |= 4;
                        }
                    }
                    item._sizeChanged = true;
                }
            }
        }
    };

    _pGraphicsLayer._renderAll = function (totalItems)
    {
        var drawflags = this.parent._drawflags;
        var ctx = this._canvas;

        if (!ctx.handle)
        {
            ctx.create();
        }
        else if (!(drawflags & 2))
        {
            ctx.clearRect(0, 0, ctx.width, ctx.height);
        }

        ctx.save();

        if (this._matrix)
        {
            var bound = this._getCanvasRect();
            ctx.translate(-bound.left, -bound.top);
        }

        var item;
			//style;
        for (var i = 0, len = totalItems.length  ; i < len ; i++)
        {
            item = totalItems[i];
            if (item._painting & 1)
            {
                if (item._jobDrawflags & 8) //stylechanged
                {
                    item._updateStyles(ctx, item._sizeChanged);
                    item._sizeChanged = false;
                }

                item._render(ctx);
                // 안쓰이고 있었던것. 추적검토후 삭제
                //if (bSetDrawflags)
                //{
                //    item._drawflags = 0;
                //    item._newDraw = false;
                //}
            }
            else
            {
                item._painted = 0;
            }
        }
        ctx.restore();
        this._dirtyRectsMgr.clear();
    };

    _pGraphicsLayer._drawDirty = function (totalItems)
    {
        //var dirtyRectsMgr = this._dirtyRectsMgr;
        var item, drawflags, sizeChanged, matrixchanged, p;
		var oldBounds,
			curBounds;
        for (var i = totalItems.length - 1 ; i > -1 ; i--)
        {
            item = totalItems[i];
            p = item.parent;

            if (item._painting & 1)
            {
                sizeChanged = false;
                matrixchanged = false;
                drawflags = item._jobDrawflags;
                if (drawflags & (1 | 2 | 4)) //matrixchanged, sizechanged, contentschanged
                {
                    if (drawflags & 1) //matrixchanged
                    {
                        item._bounds = null;
                        item._globalBounds = null;
                        matrixchanged = true;
                    }
                    if (drawflags & (2 | 4)) //sizechanged, contentschanged
                    {
                        item._bounds = null;
                        item._globalBounds = null;
                        item._rect = null;
                        sizeChanged = true;
                    }
                    if (matrixchanged)
                    {
                        oldBounds = item._oldGlobalBounds;
                        curBounds = item.getGlobalBoundRect();

                        if (oldBounds) this._addDirty(oldBounds, item);
                        this._addDirty(curBounds, item);
                    }
                    else if (sizeChanged)
                    {
                        if (item._type == "Group" || item._type == "Paths")
                        {
                            if (item._painted & (2 | 4))
                            {
                                oldBounds = item._oldGlobalBounds;
                                if (oldBounds) this._addDirty(oldBounds, item);
                            }
                            var s = item._style;
                            if (s && (s._fillcolor || s._strokecolor))
                            {
                                curBounds = item.getGlobalBoundRect();
                                this._addDirty(curBounds, item);
                            }
                        }
                        else
                        {
                            oldBounds = item._oldGlobalBounds;
                            curBounds = item.getGlobalBoundRect();

                            if (oldBounds) this._addDirty(oldBounds, item);
                            this._addDirty(curBounds, item);
                        }
                    }
                    if (p && !(p._jobDrawflags & 4))
                    {
                        if (p == this)
                        {
                            p._rect = null;
                        }
                        else
                        {
                            p._jobDrawflags |= 4; //boundsChanged
                        }
                    }
                    item._sizeChanged = sizeChanged;
                    item._painting |= 4;
                }
                else if ((drawflags & 8) || item._newDraw) //stylechanged
                {
                    item._painting |= 4;
                    this._addDirty(item.getGlobalBoundRect(), item); //신규로 그려야 하는 경우 또는 style 값이 변경되어 다시 그려야 하는 경우만 다시 그림.
                }
            }
            else if (item._painting & 2)
            {
                if (item._painted & (2 | 4)) //stroke color, fill color가 존재하여 기존에 그려진 경우만 지우는 작업이 필요하여 과거 bound를 dirty처리함.
                {
                    this._addDirty(item._oldGlobalBounds, item);
                }
            }
        }
    };

    _pGraphicsLayer._renderDirty = function (totalItems)
    {
        if (this._applyRendering)
            return;

        this._applyRendering = true;

        var dirtyRectsMgr = this._dirtyRectsMgr;
        var _self = this;
        var ctx = this._canvas;

        if (!ctx.handle)
        {
            ctx.create();
        }

        dirtyRectsMgr.mergeRects(10000, 10); //overhead, lineOverhead

        ctx.save();
        ctx.beginPath();

        dirtyRectsMgr.Each(function (rect)
        {
            ctx.clearRect(rect.left, rect.top, rect.width, rect.height);

            // 디버그용
            //ctx.drawStrokeRect(rect.left, rect.top, rect.width, rect.height);

            _self._setItemsInDirtyRect(_self, rect);
            ctx.rect(rect.left, rect.top, rect.width, rect.height);
        });

        ctx.clip(); // runtime과 html 동작이 조금 다름..

        var item;
        for (var i = 0, len = totalItems.length  ; i < len ; i++)
        {
            item = totalItems[i];

            if (item._painted > 0)
            {
                ctx.setElementGlobalAlpha(item._globalAlpha);
            }

            if (item._jobDrawflags & 8 || item._jobDrawflags & 2) //stylechanged ,sizechanged
            {
                item._updateStyles(ctx, item._sizeChanged);
                item._sizeChanged = false;
            }

            if (item._painting & 4) // dirty영역에 존재하는 객체이고 반드시 다시 그려야 하는 경우가 4이다. 그러나 이전에 지워져야하는 객체가 존재할 수 있음.
            {
                if (item._painting & 2)
                {
                    item._painted = 0;
                }
                else
                {
                    item._render(ctx);
                }
            }
            else if (item._painting & 2)
            {
                item._painted = 0;
            }
        }

        dirtyRectsMgr.clear();
        ctx.restore();

        this._applyRendering = false;
    };

    _pGraphicsLayer._addDirty = function (bounds_rect, item)
    {
        var rect = bounds_rect;
        if (rect)
        {
            var l = rect.left;
            var t = rect.top;
            var w = rect.width;
            var h = rect.height;
            var n_rect = new nexacro.Rect(l, t, w, h);
            var ctx = this._canvas;

            //            trace(item.id, n_rect.left, n_rect.top, n_rect.right, n_rect.bottom);

            if (n_rect.right <= 0 || n_rect.bottom <= 0 || n_rect.left >= ctx.width || n_rect.top >= ctx.height)    // runtime에서 canvas 영역 밖의 rect값일 경우 화면 깨짐 현상
                return;
            if (n_rect.width <= 0 || n_rect.height <= 0)
                return;

            /*
            if (n_rect.left < 0)
            {
                n_rect.width += n_rect.left;
                n_rect.left = 0;
            }
            */

            n_rect.obj_id = item.id;    // for debugging
            this._dirtyRectsMgr.add(n_rect);
        }
    };

    _pGraphicsLayer._hitTestItems = function (p, pt, rect)
    {
        var quadtree = p._quadtree;
        if (quadtree)
        {
            var i, len;
            var item, ret, invertPt;
            var items = quadtree.query(rect);

            items.sort(function (a, b) { return b._index - a._index; });

            for (i = 0, len = items.length ; i < len ; i++)
            {
                item = items[i];
                invertPt = item._globalMatrix._inverseTransform(pt);
                if (item.hitTest(invertPt))
                {
                    if (item._firstchild)
                    {
                        rect.left = invertPt.x - 1;
                        rect.top = invertPt.y - 1;
                        ret = this._hitTestItems(item, pt, rect);
                        if (item._type == "Paths")
                        {
                            if (ret != item) return item;
                        }
                        else
                        {
                            return ret;
                        }
                    }
                    else
                    {
                        return item;
                    }
                }
            }
        }

        return p;
    };

    _pGraphicsLayer._hitTestAllItems = function (p, pt, rect, results)
    {
        var quadtree = p._quadtree;
        if (quadtree)
        {
            var item, //ret, 
			invertPt;
            var items = quadtree.query(rect);

            items.sort(function (a, b) { return b._index - a._index; });

            for (var i = 0, len = items.length ; i < len ; i++)
            {
                item = items[i];
                invertPt = item._globalMatrix._inverseTransform(pt);
                if (item.hitTest(invertPt))
                {
                    if (item._firstchild)
                    {
                        rect.left = invertPt.x - 1;
                        rect.top = invertPt.y - 1;

                        this._hitTestAllItems(item, pt, rect, results);

                    }
                    else
                    {
                        if (item.parent && item.parent._type == "Paths")
                        {
                            results.push(item.parent);
                        }
                        else
                            results.push(item);
                        
                    }
                }
            }
        }
    };

    _pGraphicsLayer._onTreeChanged = function ()
    {
        // layer tree level?
        this._treechange++;
    };

    //===============================================================
    // nexacro._pGraphicsLayer : Util Function
    //===============================================================
    _pGraphicsLayer._getAllObjects = function (arr, node, level)
    {
        node._level = level;
        arr[arr.length] = node;
        if (node = node._firstchild)
        {
            level++;
            var idx = 0;
            for (; node ; node = node._nextsibling)
            {
                node._index = idx;
                this._getAllObjects(arr, node, level);
                idx++;
            }
        }
    };

    _pGraphicsLayer._getOwnerLayer = function ()
    {
        return this;
    };

    _pGraphicsLayer._getCanvasRect = function ()
    {
        var parent = this.parent;
        if (parent)
        {
            return new nexacro.Rect(0, 0, parent._size.width, parent._size.height);
        }

        return new nexacro.Rect(0, 0, 0, 0);
    };

    // 사용하는곳 없음.
    _pGraphicsLayer._getItemsInRect = function (p, rect, results)
    {
        var quadtree = p._quadtree;
        if (quadtree)
        {
            var m = p._globalMatrix || p._matrix;
            var invertM = m.inverted() || m;
            var localRect = invertM._transformBounds(rect, null, rect.obj_id);

            var i, len, item;
            var items = quadtree.query(localRect);

            items.sort(function (a, b) { return b._index - a._index; });

            for (i = 0, len = items.length ; i < len ; i++)
            {
                item = items[i];
                results[results.length] = item;
                if (item._firstchild)
                {
                    this._getItemsInRect(item, rect, results);
                }
            }
        }
    };

    _pGraphicsLayer._setItemsInDirtyRect = function (p, rect)
    {
        var quadtree = p._quadtree;
        if (quadtree)
        {
            var m = p._globalMatrix || p._matrix;
            var invertM = m.inverted() || m;
            var localRect = invertM._transformBounds(rect, null, rect.obj_id);

            var item;	//, invertPt;
            var items = quadtree.query(localRect);

            for (var i = 0, len = items.length ; i < len ; i++)
            {
                item = items[i];
                item._painting |= 4;
                if (item._firstchild)
                {
                    this._setItemsInDirtyRect(item, rect);
                }
            }
        }
    };

    _pGraphicsLayer._setGlobalTransforms = function ()
    {
        var totalItems = this.getAllObjects();
        var drawflags = this.parent._drawflags;
        var m = this.parent._matrix;

        if (this._matrix)
        {
            drawflags |= this._drawflags;
            this._globalMatrix = (m ? (m.clone()).concatenate(this._matrix) : this._matrix.clone());
        }
        else
        {
            this._globalMatrix = m.clone();
        }
        m = this._globalMatrix;

        var transformStack = [m];
        var transformChangedStack = [(drawflags & 1)];
        var visibleStack = [true];
        var opacityStack = [1];
        var item, alpha, level, upLevel;

        for (var i = 0, len = totalItems.length ; i < len ; i++)
        {
            item = totalItems[i];
            level = item._level;
            upLevel = level - 1;
            alpha = item.opacity * opacityStack[upLevel];
            if (!visibleStack[upLevel] || !item.visible || item.isEmpty() || !alpha)
            {
                visibleStack[level] = false;
                if (item._painted & (1 | 2 | 4))
                {
                    item._painting = 2; //ease
                }
                else
                {
                    item._painting = 0;
                }
            }
            else
            {
                item._jobDrawflags = item._drawflags;
                if (item._globalAlpha != alpha)
                {
                    item._globalAlpha = alpha;
                    item._jobDrawflags |= 8; //stylechanged
                }
                item._painting = 1; //visible
                if (item._painted == 0) item._newDraw = true; //visible, empty, alpha에 의해 신규 로 draw하는 것
                if (transformChangedStack[upLevel] || (item._jobDrawflags & 1) ||
					 !item._globalMatrix)
                {
                    item._setGlobalTransforms(transformStack[upLevel]);
                    transformChangedStack[level] = true;
                    item._jobDrawflags |= 1;
                }
                else
                {
                    transformChangedStack[level] = false;
                }
                visibleStack[level] = true;
            }
            if (item._firstchild)
            {
                transformStack[level] = item._globalMatrix;
                opacityStack[level] = item._globalAlpha * opacityStack[upLevel];
            }
        }
    };

    _pGraphicsLayer._setQuadTree = function (totalItems, bRefresh)
    {
        var item;
        var quadTreeCls = nexacro._ChartGraphicsQuadTree;
        var quadtree = this._quadtree;

        if (!quadtree || bRefresh)
        {
            var bounds = this._getCanvasRect();
            quadtree = this._quadtree = new quadTreeCls(bounds.left, bounds.top, bounds.width, bounds.height);
        }

        var quadtreeStacks = [quadtree];
        var level, upLevel, pQuadtree;
        for (var i = 0, len = totalItems.length  ; i < len ; i++)
        {
            item = totalItems[i];
            if (item._painting & 1)
            {
                level = item._level;
                upLevel = level - 1;
                if ((item._jobDrawflags & (1 | 2 | 4)) || item._newDraw || bRefresh) //transformchanged, sizechanged, contentschanged
                {
                    pQuadtree = quadtreeStacks[upLevel];
                    if (!pQuadtree.move(item) || bRefresh)
                    {
                        pQuadtree.add(item);
                    }
                }
                if (item._firstchild)
                {
                    quadtree = item._quadtree;
                    if (!quadtree || bRefresh)
                    {
                        var rect = item._getRect();
                        quadtree = item._quadtree = new quadTreeCls(rect.left, rect.top, rect.width, rect.height);
                    }
					else if(item._jobDrawflags & (1 | 2 | 4))
					{
						item._quadtree._root._bounds = item._getRect();
					}
                    quadtreeStacks[level] = quadtree;
                }
                item._oldGlobalBounds = null;
                item._setOldGlobalBounds();
                item._drawflags = 0;
                delete item._newDraw;
            }
            else if (!bRefresh && item._painting & 2)
            {
                level = item._level;
                upLevel = level - 1;
                pQuadtree = quadtreeStacks[upLevel];
                if (pQuadtree)
                {
                    pQuadtree.remove(item);
                }
                item._oldGlobalBounds = null;
            }
        }

        // if ( totalItems.length > 0 && !nexacro._init_platform_runtime && !(nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) )
        if (totalItems.length > 0 && !(nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8))
        {
            this._renderHint = "dirty";
        }

        if (this._drawflags != null) this._drawflags = 0;
    };

    _pGraphicsLayer._refreshQuadTree = function ()
    {
        this._setQuadTree(this.getAllObjects(), true);
    };

}

if (!nexacro.ChartGraphicsControl)
{
    //==============================================================================
    // nexacro.ChartGraphicsControl
    //==============================================================================
    nexacro.ChartGraphicsControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
    {
        nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

        this._matrix = new nexacro._ChartGraphicsMatrix();
    };

    var _pGraphicsControl = nexacro._createPrototype(nexacro.Component, nexacro.ChartGraphicsControl);
    nexacro.ChartGraphicsControl.prototype = _pGraphicsControl;
    _pGraphicsControl._type_name = "GraphicsControl";
    _pGraphicsControl._is_subcontrol = true;

    /* control */
    _pGraphicsControl._layer = null;

    /* internal variable */
    _pGraphicsControl._drawflags = 1;

    /* event list */
    _pGraphicsControl._event_list = {
        "onclick": 1, "ondblclick": 1,
        "onkillfocus": 1, "onsetfocus": 1,
        "onkeydown": 1, "onkeyup": 1,
        "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1,
        "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1,
        "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
        "onmove": 1, "onsize": 1,
        "onmouseup": 1, "onmousedown": 1,
        "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1
    };

    //===============================================================
    // nexacro.ChartGraphicsControl : Create & Destroy & Update
    //===============================================================	
    _pGraphicsControl.on_create_contents = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            this._setSize(this._adjust_width, this._adjust_height);

            var layer = this._layer;
            if (!layer)
            {
                //var bounds;
                var ctx = new nexacro.CanvasElement(control_elem);

                layer = this._layer = new nexacro._ChartGraphicsLayer();
                layer.set_id(this.id + "_layer");
                layer.parent = this;
                layer._canvas = ctx;

                ctx.setElementPosition(0, 0);
                ctx.setElementSize(this._adjust_width, this._adjust_height);
            }
        }
    };

    _pGraphicsControl.on_created_contents = function (win)
    {
        var layer = this._layer;
        if (layer)
        {
            layer._canvas.create(win);
            layer._paint();
        }

        this._drawflags = 0;
    };

    _pGraphicsControl.on_create_contents_command = function ()
    {
        return "";
    };

    _pGraphicsControl.on_attach_contents_handle = function (win)
    {
        var layer = this._layer;
        if (layer)
        {
            layer._canvas.create(win);
            layer._paint();
        }

        this._drawflags = 0;
    };

    _pGraphicsControl.on_destroy_contents = function ()
    {
        if (this._layer)
        {
            // GraphicsControl에서 만들었으니 여기에서 지움.

            this._layer.destroy();
            this._layer = null;
        }
    };

    _pGraphicsControl.on_change_containerRect = function (width, height)
    {
        if (this._is_created_contents)
        {
            this._setSize(width, height);

            var layer = this._layer;
            if (layer)
            {
                layer._refreshQuadTree();
            }
        }
    };

    _pGraphicsControl.on_change_containerPos = function (left, top)
    {
        // IE 8 버전 이하의 브라우저에서는 호출가능
    };

    //===============================================================
    // nexacro.ChartGraphicsControl : Properties
    //===============================================================

    //===============================================================
    // nexacro.ChartGraphicsControl : Methods
    //===============================================================
    _pGraphicsControl.draw = function ()
    {
        this._paint();

        // paint 도중에 image onload 발생해서 repaint가 필요할떄
        if (this._repaint)
        {
            this._repaint = false;

            var pThis = this;
            var win_handle = this._getWindowHandle();

            if (this._timeId != null)
            {
                nexacro._clearSystemTimer(win_handle, this._timeId);
                this._timeId = null;
            }

            this._timeId = nexacro._setSystemTimer(win_handle, function ()
            {
                nexacro._clearSystemTimer(win_handle, pThis._timeId);
                pThis._timeId = null;
                //console.log("graph painted!!!!");
                pThis._paint();
            }, 10);
        }
    };

    _pGraphicsControl.hitTest = function (x, y)
    {
        var elem;
        var layer = this._layer;
        if (layer)
        {
            elem = layer.hitTest(new nexacro.Point(x, y));
        }

        return elem;
    };

    _pGraphicsControl.getAllObjects = function ()
    {
        var totalItems = [];
        var layer = this._layer;
        if (layer)
        {
            totalItems = layer.getAllObjects();
        }

        return totalItems;
    };

    _pGraphicsControl.getFirstChild = function ()
    {
        var firstchild;
        var layer = this._layer;
        if (layer)
        {
            firstchild = layer.getFirstChild();
        }

        return firstchild;
    };

    _pGraphicsControl.getLastChild = function ()
    {
        var lastchild;
        var layer = this._layer;
        if (layer)
        {
            lastchild = layer.getLastChild();
        }

        return lastchild;
    };

    _pGraphicsControl.removeChild = function (oldChild)
    {
        var removechild;
        var layer = this._layer;
        if (layer && oldChild)
        {
            removechild = layer.removeChild(oldChild);
        }

        return removechild;
    };

    _pGraphicsControl.addChild = function (child)
    {
        var addchild;
        var layer = this._layer;
        if (layer && child)
        {
            addchild = layer.addChild(child);
        }

        return addchild;
    };

    _pGraphicsControl.insertChild = function (newChild, refChild)
    {
        var insertchild;
        var layer = this._layer;
        if (layer && newChild && refChild)
        {
            insertchild = layer.insertChild(newChild, refChild);
        }

        return insertchild;
    };

    _pGraphicsControl.getObjectByID = function (id)
    {
        var children;
        var layer = this._layer;
        if (layer && id)
        {
            children = layer.getObjectByID(id);
        }

        return children;
    };

    _pGraphicsControl.clear = function ()
    {
        var layer = this._layer;
        if (layer)
        {
            layer.clear();
        }
    };

    //===============================================================
    // nexacro.ChartGraphicsControl : Event Handlers
    //===============================================================	

    //===============================================================
    // nexacro.ChartGraphicsControl : Logical part
    //===============================================================
    // 검토 후 노출
    _pGraphicsControl._delayTask = function ()
    {
        if (this._painting)
        {
            this._repaint = true;
        }
        else
        {
            this._paint();
        }
    };

    _pGraphicsControl._paint = function ()
    {
        var control_elem = this.getElement();
        if (control_elem)
        {
            if (this._painting)
                return;

            this._painting = true;

            var layer = this._layer;
            if (layer)
            {
                var ctx = layer._canvas;
                var bounds = layer._getCanvasRect();

                layer._setGlobalTransforms();
                layer._beforePaint();

                if (control_elem.handle)
                {
                    if (!ctx)
                    {
                        ctx = layer._canvas = new nexacro.CanvasElement(control_elem);
                        ctx.setElementPosition(bounds.left, bounds.top);
                        ctx.setElementSize(bounds.width, bounds.height);
                    }
                    else if (this._drawflags & 2)
                    {
                        ctx.setElementPosition(bounds.left, bounds.top);
                        ctx.setElementSize(bounds.width, bounds.height);
                    }

                    layer._paint();
                }

                this._drawflags = 0;
                this._painting = false;
            }
        }
    };

    //===============================================================
    // nexacro.ChartGraphicsControl : Util Function
    //===============================================================
    _pGraphicsControl._setSize = function (w, h)
    {
        var size = new nexacro._ChartGraphicsSize(w, h);

        var oldSize = this._size;
        if (oldSize)
        {
            if (!size.equals(oldSize))
            {
                this._size = size;
                this._drawflags |= 2;
            }
        }
        else
        {
            this._size = size;
            this._drawflags |= 2;
        }
    };

    _pGraphicsControl._getGraphicsObjectAll = function (x, y)
    {
        var elem;
        var layer = this._layer;
        if (layer)
        {
            elem = layer.hitTestAll(new nexacro.Point(x, y));
        }

        return elem;
    };

}
