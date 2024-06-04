//XJS=UndoBuffer.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {
        //UndoBuffer
        nexacro.CTSE.Chart._UndoBuffer = function()
        {
        	this._undraw;
        	this._redraw;
        	this._list = [];
        }

        var __UndoBuffer = nexacro.CTSE.Chart._UndoBuffer.prototype;
        __UndoBuffer._type_name = "UndoBuffer";

        __UndoBuffer.length = function(item)
        {
        	return this._list.length;
        };

        __UndoBuffer.getItem = function(idx)
        {
        	return this._list[idx];
        };

        __UndoBuffer.setUndraw = function(func, scope, args)
        {
        	this._undraw = {func:func, scope:scope, args:args};
        };

        __UndoBuffer.setRedraw = function(func, scope, args)
        {
        	this._redraw = {func:func, scope:scope, args:args};
        };

        __UndoBuffer.add = function(item, undraw, redraw)
        {
        	this._list.push(item);
        	if(undraw)
        	{
        		this._undraw = undraw;
        	}
        	if(redraw)
        	{
        		this._redraw = redraw;
        	}
        };

        __UndoBuffer.save = function(undolist)
        {
        	undolist.addUndo(this);
        };

        __UndoBuffer.undo = function()
        {
        	var item;
        	for(var i = 0, iL = this.length()-1; i <= iL; iL--)
        	{
        		item = this.getItem(iL);
        		item.perform.call(this, false, item.data);
        	}
        	this.undraw();
        };

        __UndoBuffer.redo = function()
        {
        	var item;
        	for(var i = 0, iL = this.length(); i < iL; i++)
        	{
        		item = this.getItem(i);
        		item.perform.call(this, true, item.data);
        	}
        	this.redraw();
        };

        __UndoBuffer.undraw = function()
        {
        	if(this._undraw)
        	{
        		var func = this._undraw.func;
        		var scope = this._undraw.scope;
        		var args = this._undraw.args;
        		func.call(scope, scope, args);
        	}
        };

        __UndoBuffer.redraw = function()
        {
        	if(this._redraw)
        	{
        		var func = this._redraw.func;
        		var scope = this._redraw.scope;
        		var args = this._redraw.args;
        		func.call(scope, scope, args);
        	}
        };


        delete __UndoBuffer;
        });
    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
