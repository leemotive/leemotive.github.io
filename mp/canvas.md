# Canvas

使用 2d 的时候，在调用 `canvasToTempFilePath` 的使用，出现了只保存了左上角一部分的现象，当第二次保存的时候，整个 canvas 内的图像又全部保存下来了

使用 `wx.createCanvasContext` 的时候暂时没出来此现象

