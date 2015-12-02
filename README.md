# Browser image loading benchmark

Goals :

 - test several images loading strategies
 - find browsers limits
 - time several image loading methods

Run : http://revolunet.github.io/browser-images-benchmark


## Results

### iOS Safari crashs when loading too much images in GPU

In the examples, every task with 'translateZ' applied systematically crashes Safari when too much images.

### best method to load mass images into GPU

Looks like img[src] is more resistant than div[background-image]


