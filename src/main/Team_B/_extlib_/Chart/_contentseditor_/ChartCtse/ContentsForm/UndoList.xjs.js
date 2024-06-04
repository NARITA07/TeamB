//XJS=UndoList.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {
        //UndoList
        nexacro.CTSE.Chart._UndoList = function(self)
        {
        	this.self = self;
        	this.stack = [];
        	this.current = -1;
        };

        var __UndoList = nexacro.CTSE.Chart._UndoList.prototype;
        __UndoList._type_name = "UndoList";

        __UndoList.addUndo = function (buffer)
        {
        	this.deleteUndo(this.current);

        	this.stack.push(buffer);
        	this.current = this.getLastIndex();
        };

        __UndoList.deleteUndo = function (pos)
        {
        	this.stack.splice(pos+1);
        };

        __UndoList.undo = function()
        {
        	if( this.canUndo() )
        	{
        		var buffer = this.getUndo(this.current);
        		this.current--;

        		return buffer;
        	} else {
        		throw new Error("Already at oldest change. "+ this.current);
        	}
        };

        __UndoList.redo = function ()
        {
        	if( this.canRedo() )
        	{
        		var buffer = this.getUndo(this.current + 1);
        		this.current++;

        		return buffer;
        	} else {
        		throw new Error("Already at newest change. "+ this.current);
        	}
        };

        __UndoList.getUndo = function(idx)
        {
        	return this.stack[idx];
        };

        __UndoList.canRedo = function ()
        {
        	if( this.current < this.getLastIndex() && this.getCount() > 0)
        	{

        		return true;
        	}
        	else
        	{
        	   return false;
        	}
        };

        __UndoList.canUndo = function()
        {
        	if( this.current > -1 && this.current <= this.getLastIndex() )
        	{
        		return true;
        	}else{
        		return false;
        	}
        };

         __UndoList.getLastIndex = function()
        {
        	return this.getCount()-1;
        };

        __UndoList.getCount = function()
        {
        	return this.stack.length;
        };

        __UndoList.clear = function()
        {
        	this.stack = [];
        	this.current = -1;
        };
        });
    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
