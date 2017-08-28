angular.module('app').service('todoStorage', function ($q) {
    var _this = this;
    this.data = [];

    this.findAll = function(callback) {
        chrome.storage.sync.get('todo', function(keys) {
            if (keys.todo != null) {
                _this.data = keys.todo;
                for (var i=0; i<_this.data.length; i++) {
                    _this.data[i]['id'] = i + 1;
                }
                // console.log(_this.data);
                callback(_this.data);
            }
        });
    }

    this.sync = function() {
        chrome.storage.sync.set({todo: this.data}, function() {
            // console.log('Data is stored in Chrome storage');
        });
    }

    this.add = function (ticker,name) {
        var id = this.data.length + 1;
        var todo = {
            id: id,
            content: ticker,
            name: name.toLowerCase(),
            completed: false,
            createdAt: new Date()
        };
        this.data.unshift(todo);
        this.sync();        
    }

    this.remove = function(todo) {
        this.data.splice(this.data.indexOf(todo), 1);
        this.sync();
    }

    this.removeAll = function() {
        this.data = [];
        this.sync();
    }

    this.selectAll = function() {
        for (var i=0; i<_this.data.length; i++) {
            _this.data[i]['completed'] = true;
        }
        this.sync();
    }

    this.clearSelection = function() {
        for (var i=0; i<_this.data.length; i++) {
            _this.data[i]['completed'] = false;
        }
        this.sync();
    }

});