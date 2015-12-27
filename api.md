## Classes

<dl>
<dt><a href="#Base">Base</a></dt>
<dd></dd>
<dt><a href="#Circle">Circle</a></dt>
<dd></dd>
<dt><a href="#CoordinateSystem">CoordinateSystem</a></dt>
<dd></dd>
<dt><a href="#Path">Path</a></dt>
<dd></dd>
<dt><a href="#RasterRenderer">RasterRenderer</a></dt>
<dd><p>todo</p>
<ul>
<li>rectangle</li>
<li>bezier curve</li>
</ul>
</dd>
<dt><a href="#Shape">Shape</a></dt>
<dd></dd>
<dt><a href="#TerminalRenderer">TerminalRenderer</a></dt>
<dd></dd>
</dl>

<a name="Base"></a>
## Base
**Kind**: global class  

* [Base](#Base)
    * [new Base()](#new_Base_new)
    * [.rotation$](#Base+rotation$)
    * [.position](#Base+position)
    * [.position](#Base+position) ⇒ <code>Point</code>
    * [._positionCache$](#Base+_positionCache$)
    * [._positionCache$](#Base+_positionCache$)
    * [.matrix](#Base+matrix)
    * [.matrix](#Base+matrix) ⇒ <code>Matrix</code>
    * [.getRotation$([levels])](#Base+getRotation$) ⇒ <code>Number</code>
    * [.getMatrix$([levels])](#Base+getMatrix$) ⇒ <code>Matrix</code>

<a name="new_Base_new"></a>
### new Base()
Shape

<a name="Base+rotation$"></a>
### base.rotation$
set the absolute rotation

**Kind**: instance property of <code>[Base](#Base)</code>  

| Param |
| --- |
| angle | 

<a name="Base+position"></a>
### base.position
**Kind**: instance property of <code>[Base](#Base)</code>  

| Param | Type | Description |
| --- | --- | --- |
| p | <code>Point</code> | position passed to Point |

<a name="Base+position"></a>
### base.position ⇒ <code>Point</code>
**Kind**: instance property of <code>[Base](#Base)</code>  
<a name="Base+_positionCache$"></a>
### base._positionCache$
TODO to be replaced by super._changed() when the super implementations performance is better

**Kind**: instance property of <code>[Base](#Base)</code>  
<a name="Base+_positionCache$"></a>
### base._positionCache$
TODO to be replaced by super._parentChanged() when the super implementations performance is better

**Kind**: instance property of <code>[Base](#Base)</code>  
<a name="Base+matrix"></a>
### base.matrix
**Kind**: instance property of <code>[Base](#Base)</code>  

| Param | Type |
| --- | --- |
| m | <code>Matrix</code> | 

<a name="Base+matrix"></a>
### base.matrix ⇒ <code>Matrix</code>
**Kind**: instance property of <code>[Base](#Base)</code>  
<a name="Base+getRotation$"></a>
### base.getRotation$([levels]) ⇒ <code>Number</code>
**Kind**: instance method of <code>[Base](#Base)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [levels] | <code>Number</code> | how many levels to travel up the hierarchy |

<a name="Base+getMatrix$"></a>
### base.getMatrix$([levels]) ⇒ <code>Matrix</code>
**Kind**: instance method of <code>[Base](#Base)</code>  

| Param | Type |
| --- | --- |
| [levels] | <code>Number</code> | 

<a name="Circle"></a>
## Circle
**Kind**: global class  
<a name="new_Circle_new"></a>
### new Circle(position, radius)
Shape


| Param | Type | Description |
| --- | --- | --- |
| position | <code>Array</code> &#124; <code>Object</code> | Point |
| radius | <code>Number</code> | _radius |

<a name="CoordinateSystem"></a>
## CoordinateSystem
**Kind**: global class  
<a name="Path"></a>
## Path
**Kind**: global class  

* [Path](#Path)
    * [new Path([arg0])](#new_Path_new)
    * _instance_
        * [.appendSegment(segment)](#Path+appendSegment)
        * [._calculatePointAtPosition(p0, h0o, h1i, p1, t)](#Path.Curve+_calculatePointAtPosition) ⇒ <code>number</code>
    * _static_
        * [.Segment](#Path.Segment)
            * [new Path.Segment(position, [handleIn], [handleOut])](#new_Path.Segment_new)
            * [.hasHandleIn()](#Path.Segment+hasHandleIn) ⇒ <code>boolean</code>

<a name="new_Path_new"></a>
### new Path([arg0])

| Param | Type |
| --- | --- |
| [arg0] | <code>Array</code> &#124; <code>number</code> | 

**Example**  
```js
new Path([Segment0, Segment1])
new Path([[3, 5], [3, 6]])
new Path([3, 5])
new Path()
```
<a name="Path+appendSegment"></a>
### path.appendSegment(segment)
add a segment to the path

**Kind**: instance method of <code>[Path](#Path)</code>  

| Param |
| --- |
| segment | 

<a name="Path.Curve+_calculatePointAtPosition"></a>
### path._calculatePointAtPosition(p0, h0o, h1i, p1, t) ⇒ <code>number</code>
**Kind**: instance method of <code>[Path](#Path)</code>  

| Param | Type | Description |
| --- | --- | --- |
| p0 | <code>Number</code> | start Point |
| h0o | <code>Number</code> | start Point handle out, relative to p0 |
| h1i | <code>Number</code> | end Point handle in, relative to p1 |
| p1 | <code>Number</code> | end Point |
| t | <code>Number</code> | value between {0-1} => 0%-100% of the length |

<a name="Path.Segment"></a>
### Path.Segment
**Kind**: static class of <code>[Path](#Path)</code>  

* [.Segment](#Path.Segment)
    * [new Path.Segment(position, [handleIn], [handleOut])](#new_Path.Segment_new)
    * [.hasHandleIn()](#Path.Segment+hasHandleIn) ⇒ <code>boolean</code>

<a name="new_Path.Segment_new"></a>
#### new Path.Segment(position, [handleIn], [handleOut])

| Param | Type |
| --- | --- |
| position | <code>Point</code> | 
| [handleIn] | <code>Point</code> | 
| [handleOut] | <code>Point</code> | 

<a name="Path.Segment+hasHandleIn"></a>
#### segment.hasHandleIn() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Segment](#Path.Segment)</code>  
<a name="RasterRenderer"></a>
## RasterRenderer
todo
- rectangle
- bezier curve

**Kind**: global class  

* [RasterRenderer](#RasterRenderer)
    * [.render([Item])](#RasterRenderer+render)
    * [.add(Item, [data])](#RasterRenderer+add)

<a name="RasterRenderer+render"></a>
### rasterRenderer.render([Item])
renders all attached items or just the one given

**Kind**: instance method of <code>[RasterRenderer](#RasterRenderer)</code>  

| Param | Type |
| --- | --- |
| [Item] | <code>Object</code> | 

<a name="RasterRenderer+add"></a>
### rasterRenderer.add(Item, [data])
**Kind**: instance method of <code>[RasterRenderer](#RasterRenderer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| Item | <code>Object</code> | Geometry Item |
| [data] | <code>Object</code> | e.g Array [R, G, B] colors range 0-255 |

<a name="Shape"></a>
## Shape
**Kind**: global class  
<a name="new_Shape_new"></a>
### new Shape()
Shape

<a name="TerminalRenderer"></a>
## TerminalRenderer
**Kind**: global class  

* [TerminalRenderer](#TerminalRenderer)
    * [new TerminalRenderer(width, height, scale)](#new_TerminalRenderer_new)
    * [.debug](#TerminalRenderer+debug)
    * [.debug](#TerminalRenderer+debug) ⇒ <code>Boolean</code>

<a name="new_TerminalRenderer_new"></a>
### new TerminalRenderer(width, height, scale)

| Param | Type | Description |
| --- | --- | --- |
| width | <code>Number</code> | Width of the canvas |
| height | <code>Number</code> | Height of the canvas |
| scale | <code>Number</code> | Scale of the canvas |

<a name="TerminalRenderer+debug"></a>
### terminalRenderer.debug
**Kind**: instance property of <code>[TerminalRenderer](#TerminalRenderer)</code>  

| Param | Type |
| --- | --- |
| debug | <code>Boolean</code> | 

<a name="TerminalRenderer+debug"></a>
### terminalRenderer.debug ⇒ <code>Boolean</code>
**Kind**: instance property of <code>[TerminalRenderer](#TerminalRenderer)</code>  
