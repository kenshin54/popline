function synchronize(callback) {

    var current_timeout_implementation = this.setTimeout;

    this.setTimeout = function(callback) {
        callback();
    };

    try {
        callback();
    }
    finally {
        this.setTimeout = current_timeout_implementation
    }
}