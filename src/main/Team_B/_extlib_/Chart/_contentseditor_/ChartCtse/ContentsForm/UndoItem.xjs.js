//XJS=UndoItem.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {
        //UndoItem
        nexacro.CTSE.Chart._UndoItem = function(perform, data)
        {
        	this.perform = perform;
        	this.data = data;
        };

        var __UndoItem = nexacro.CTSE.Chart._UndoItem.prototype;
        __UndoItem._type_name = "UndoItem";


        delete __UndoItem;
        });
    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
