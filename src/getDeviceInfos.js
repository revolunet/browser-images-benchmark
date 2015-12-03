
var webGLStats = {
    ACTIVE_TEXTURE: 0,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0,
    MAX_CUBE_MAP_TEXTURE_SIZE: 0,
    MAX_FRAGMENT_UNIFORM_VECTORS: 0,
    MAX_RENDERBUFFER_SIZE: 0,
    MAX_TEXTURE_IMAGE_UNITS: 0,
    MAX_TEXTURE_SIZE: 0,
    MAX_VARYING_VECTORS: 0,
    MAX_VERTEX_ATTRIBS: 0,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0,
    MAX_VERTEX_UNIFORM_VECTORS: 0,
    MAX_VIEWPORT_DIMS: 0,
    VENDOR: 0,
    VERSION: 0
};

export function getWebGLConstants() {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("experimental-webgl");
    window.gl = gl;
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    var i, j, limit, value, results, item, key;
    for (i = 0; i < Object.keys(webGLStats).length; i++) {
        key = Object.keys(webGLStats)[i];
        value = gl.getParameter(gl[key]);
        if (value instanceof Int32Array) {
            value = value[0] + ', ' + value[1];
        }
        webGLStats[key] = value;
    }
    return webGLStats;
};

export default function getDeviceInfos() {
    return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        ...getWebGLConstants()
    }
}
