
var webglStats = {
    ACTIVE_TEXTURE: 34016,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661,
    MAX_CUBE_MAP_TEXTURE_SIZE: 34076,
    MAX_FRAGMENT_UNIFORM_VECTORS: 36349,
    MAX_RENDERBUFFER_SIZE: 34024,
    MAX_TEXTURE_IMAGE_UNITS: 34930,
    MAX_TEXTURE_SIZE: 3379,
    MAX_VARYING_VECTORS: 36348,
    MAX_VERTEX_ATTRIBS: 34921,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
    MAX_VERTEX_UNIFORM_VECTORS: 36347,
    MAX_VIEWPORT_DIMS: 3386,
    VENDOR: 7936,
    VERSION: 7938
};

export default function getWebGLConstants() {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("experimental-webgl");
    window.gl = gl;
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    var i, j, limit, value, results, item, key;
    for (i = 0; i < Object.keys(webglStats).length; i++) {
        key = Object.keys(webglStats)[i];
        console.log(key);
        value = gl.getParameter(gl[key]);
        if (value instanceof Int32Array) {
            value = value[0] + ', ' + value[1];
        }
        webglStats[key] = value;
    }
    return webglStats;
};
