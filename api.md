## Classes

<dl>
<dt><a href="#Base">Base</a></dt>
<dd></dd>
<dt><a href="#Base">Base</a></dt>
<dd></dd>
<dt><a href="#Circle">Circle</a></dt>
<dd></dd>
<dt><a href="#Circle">Circle</a></dt>
<dd></dd>
<dt><a href="#CoordinateSystem">CoordinateSystem</a></dt>
<dd></dd>
<dt><a href="#Hierarchy">Hierarchy</a></dt>
<dd></dd>
<dt><a href="#Matrix">Matrix</a></dt>
<dd></dd>
<dt><a href="#Path">Path</a></dt>
<dd></dd>
<dt><a href="#Path">Path</a></dt>
<dd></dd>
<dt><a href="#Point">Point</a></dt>
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
    * [.position](#Base+position) ⇒ <code>[Point](#Point)</code>
    * [._positionCache$](#Base+_positionCache$)
    * [._positionCache$](#Base+_positionCache$)
    * [.matrix](#Base+matrix)
    * [.matrix](#Base+matrix) ⇒ <code>[Matrix](#Matrix)</code>
    * [.getRotation$([levels])](#Base+getRotation$) ⇒ <code>Number</code>
    * [.getMatrix$([levels])](#Base+getMatrix$) ⇒ <code>[Matrix](#Matrix)</code>

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
| p | <code>[Point](#Point)</code> | position passed to Point |

<a name="Base+position"></a>
### base.position ⇒ <code>[Point](#Point)</code>
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
| m | <code>[Matrix](#Matrix)</code> | 

<a name="Base+matrix"></a>
### base.matrix ⇒ <code>[Matrix](#Matrix)</code>
**Kind**: instance property of <code>[Base](#Base)</code>  
<a name="Base+getRotation$"></a>
### base.getRotation$([levels]) ⇒ <code>Number</code>
**Kind**: instance method of <code>[Base](#Base)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [levels] | <code>Number</code> | how many levels to travel up the hierarchy |

<a name="Base+getMatrix$"></a>
### base.getMatrix$([levels]) ⇒ <code>[Matrix](#Matrix)</code>
**Kind**: instance method of <code>[Base](#Base)</code>  

| Param | Type |
| --- | --- |
| [levels] | <code>Number</code> | 

<a name="Base"></a>
## Base
**Kind**: global class  

* [Base](#Base)
    * [new Base()](#new_Base_new)
    * [.rotation$](#Base+rotation$)
    * [.position](#Base+position)
    * [.position](#Base+position) ⇒ <code>[Point](#Point)</code>
    * [._positionCache$](#Base+_positionCache$)
    * [._positionCache$](#Base+_positionCache$)
    * [.matrix](#Base+matrix)
    * [.matrix](#Base+matrix) ⇒ <code>[Matrix](#Matrix)</code>
    * [.getRotation$([levels])](#Base+getRotation$) ⇒ <code>Number</code>
    * [.getMatrix$([levels])](#Base+getMatrix$) ⇒ <code>[Matrix](#Matrix)</code>

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
| p | <code>[Point](#Point)</code> | position passed to Point |

<a name="Base+position"></a>
### base.position ⇒ <code>[Point](#Point)</code>
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
| m | <code>[Matrix](#Matrix)</code> | 

<a name="Base+matrix"></a>
### base.matrix ⇒ <code>[Matrix](#Matrix)</code>
**Kind**: instance property of <code>[Base](#Base)</code>  
<a name="Base+getRotation$"></a>
### base.getRotation$([levels]) ⇒ <code>Number</code>
**Kind**: instance method of <code>[Base](#Base)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [levels] | <code>Number</code> | how many levels to travel up the hierarchy |

<a name="Base+getMatrix$"></a>
### base.getMatrix$([levels]) ⇒ <code>[Matrix](#Matrix)</code>
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
<a name="Hierarchy"></a>
## Hierarchy
**Kind**: global class  

* [Hierarchy](#Hierarchy)
    * [.children](#Hierarchy+children) ⇒ <code>[Array.&lt;Hierarchy&gt;](#Hierarchy)</code>
    * [.parent](#Hierarchy+parent)
    * [.parent](#Hierarchy+parent) ⇒ <code>[Hierarchy](#Hierarchy)</code>
    * [.addChildren(children)](#Hierarchy+addChildren) ⇒ <code>[Hierarchy](#Hierarchy)</code>
    * [.hasChildren()](#Hierarchy+hasChildren) ⇒ <code>boolean</code>
    * [.hasParent()](#Hierarchy+hasParent) ⇒ <code>boolean</code>
    * [.setParent(p)](#Hierarchy+setParent) ⇒ <code>[Hierarchy](#Hierarchy)</code>
    * [.removeChild(child)](#Hierarchy+removeChild)
    * [.removeChildren(children)](#Hierarchy+removeChildren)

<a name="Hierarchy+children"></a>
### hierarchy.children ⇒ <code>[Array.&lt;Hierarchy&gt;](#Hierarchy)</code>
**Kind**: instance property of <code>[Hierarchy](#Hierarchy)</code>  
<a name="Hierarchy+parent"></a>
### hierarchy.parent
**Kind**: instance property of <code>[Hierarchy](#Hierarchy)</code>  

| Param | Type |
| --- | --- |
| p | <code>[Hierarchy](#Hierarchy)</code> | 

<a name="Hierarchy+parent"></a>
### hierarchy.parent ⇒ <code>[Hierarchy](#Hierarchy)</code>
**Kind**: instance property of <code>[Hierarchy](#Hierarchy)</code>  
<a name="Hierarchy+addChildren"></a>
### hierarchy.addChildren(children) ⇒ <code>[Hierarchy](#Hierarchy)</code>
**Kind**: instance method of <code>[Hierarchy](#Hierarchy)</code>  

| Param | Type |
| --- | --- |
| children | <code>[Hierarchy](#Hierarchy)</code> | 

<a name="Hierarchy+hasChildren"></a>
### hierarchy.hasChildren() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Hierarchy](#Hierarchy)</code>  
<a name="Hierarchy+hasParent"></a>
### hierarchy.hasParent() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Hierarchy](#Hierarchy)</code>  
<a name="Hierarchy+setParent"></a>
### hierarchy.setParent(p) ⇒ <code>[Hierarchy](#Hierarchy)</code>
**Kind**: instance method of <code>[Hierarchy](#Hierarchy)</code>  

| Param |
| --- |
| p | 

<a name="Hierarchy+removeChild"></a>
### hierarchy.removeChild(child)
**Kind**: instance method of <code>[Hierarchy](#Hierarchy)</code>  

| Param | Type |
| --- | --- |
| child | <code>[Hierarchy](#Hierarchy)</code> | 

<a name="Hierarchy+removeChildren"></a>
### hierarchy.removeChildren(children)
**Kind**: instance method of <code>[Hierarchy](#Hierarchy)</code>  

| Param | Type |
| --- | --- |
| children | <code>[Array.&lt;Hierarchy&gt;](#Hierarchy)</code> | 

<a name="Matrix"></a>
## Matrix
**Kind**: global class  

* [Matrix](#Matrix)
    * [.a](#Matrix+a) ⇒ <code>Number</code>
    * [.b](#Matrix+b) ⇒ <code>Number</code>
    * [.c](#Matrix+c) ⇒ <code>Number</code>
    * [.d](#Matrix+d) ⇒ <code>Number</code>
    * [.tx](#Matrix+tx) ⇒ <code>Number</code>
    * [.ty](#Matrix+ty) ⇒ <code>Number</code>
    * [.multiply(m)](#Matrix+multiply)
    * [.multiplySelf(m)](#Matrix+multiplySelf)
    * [.multiplySelf_(m)](#Matrix+multiplySelf_)
    * [.scale(sx, [sy])](#Matrix+scale)
    * [.inverse()](#Matrix+inverse) ⇒ <code>[Matrix](#Matrix)</code>
    * [.determinant()](#Matrix+determinant) ⇒ <code>Number</code>
    * [.isInvertible()](#Matrix+isInvertible) ⇒ <code>boolean</code>

<a name="Matrix+a"></a>
### matrix.a ⇒ <code>Number</code>
**Kind**: instance property of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>Number</code> - - a  
<a name="Matrix+b"></a>
### matrix.b ⇒ <code>Number</code>
**Kind**: instance property of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>Number</code> - - b  
<a name="Matrix+c"></a>
### matrix.c ⇒ <code>Number</code>
**Kind**: instance property of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>Number</code> - - c  
<a name="Matrix+d"></a>
### matrix.d ⇒ <code>Number</code>
**Kind**: instance property of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>Number</code> - - d  
<a name="Matrix+tx"></a>
### matrix.tx ⇒ <code>Number</code>
**Kind**: instance property of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>Number</code> - - tx  
<a name="Matrix+ty"></a>
### matrix.ty ⇒ <code>Number</code>
**Kind**: instance property of <code>[Matrix](#Matrix)</code>  
**Returns**: <code>Number</code> - - ty  
<a name="Matrix+multiply"></a>
### matrix.multiply(m)
mul

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| m | <code>[Matrix](#Matrix)</code> | [ a b tx ] [ a b tx ] [ c d ty ] [ c d ty ] [ 0 0 1  ] [ 0 0 1  ] |

<a name="Matrix+multiplySelf"></a>
### matrix.multiplySelf(m)
post this * m

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| m | <code>[Matrix](#Matrix)</code> | [ a b tx ] [ a b tx ] [ c d ty ] [ c d ty ] [ 0 0 1  ] [ 0 0 1  ] |

<a name="Matrix+multiplySelf_"></a>
### matrix.multiplySelf_(m)
pre m * this

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Description |
| --- | --- | --- |
| m | <code>[Matrix](#Matrix)</code> | [ a b tx ] [ a b tx ] [ c d ty ] [ c d ty ] [ 0 0 1  ] [ 0 0 1  ] |

<a name="Matrix+scale"></a>
### matrix.scale(sx, [sy])
**Kind**: instance method of <code>[Matrix](#Matrix)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sx | <code>Number</code> |  | scaling in x, y or only x if no sy given |
| [sy] | <code>Number</code> | <code>sx</code> | scaling in y direction |

<a name="Matrix+inverse"></a>
### matrix.inverse() ⇒ <code>[Matrix](#Matrix)</code>
**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+determinant"></a>
### matrix.determinant() ⇒ <code>Number</code>
**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
<a name="Matrix+isInvertible"></a>
### matrix.isInvertible() ⇒ <code>boolean</code>
Returns true if matrix is invertible

**Kind**: instance method of <code>[Matrix](#Matrix)</code>  
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
| position | <code>[Point](#Point)</code> | 
| [handleIn] | <code>[Point](#Point)</code> | 
| [handleOut] | <code>[Point](#Point)</code> | 

<a name="Path.Segment+hasHandleIn"></a>
#### segment.hasHandleIn() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Segment](#Path.Segment)</code>  
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
| position | <code>[Point](#Point)</code> | 
| [handleIn] | <code>[Point](#Point)</code> | 
| [handleOut] | <code>[Point](#Point)</code> | 

<a name="Path.Segment+hasHandleIn"></a>
#### segment.hasHandleIn() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Segment](#Path.Segment)</code>  
<a name="Point"></a>
## Point
**Kind**: global class  

* [Point](#Point)
    * [.constructor](#Point+constructor)
    * [.set](#Point+set) ⇒ <code>Object</code>
    * [.set$](#Point+set$) ⇒ <code>Object</code>
    * [.coordinateSystem](#Point+coordinateSystem)
    * [.position$](#Point+position$) ⇒ <code>[Point](#Point)</code>
    * [.absoluteX](#Point+absoluteX) ⇒ <code>Number</code>
    * [.absoluteY](#Point+absoluteY) ⇒ <code>Number</code>
    * [.relativeX](#Point+relativeX) ⇒ <code>Number</code>
    * [.relativeY](#Point+relativeY) ⇒ <code>Number</code>
    * [.x](#Point+x) ⇒ <code>Number</code>
    * [.x](#Point+x)
    * [.x$](#Point+x$) ⇒ <code>Number</code>
    * [.x$](#Point+x$)
    * [.y$](#Point+y$) ⇒ <code>Number</code>
    * [.y$](#Point+y$)
    * [.y](#Point+y) ⇒ <code>Number</code>
    * [.y](#Point+y)
    * [.position](#Point+position)
    * [.length](#Point+length)
    * [.length](#Point+length) ⇒ <code>Number</code>
    * [.add](#Point+add) ⇒ <code>Object</code>
    * [.addSelf](#Point+addSelf) ⇒ <code>Object</code>
    * [.add](#Point+add) ⇒ <code>Object</code>
    * [.distance](#Point+distance) ⇒ <code>[Point](#Point)</code>
    * [.distance$](#Point+distance$) ⇒ <code>[Point](#Point)</code>
    * [.lerp](#Point+lerp) ⇒ <code>[Point](#Point)</code>
    * [.lerpSelf](#Point+lerpSelf) ⇒ <code>[Point](#Point)</code>
    * [._parsePositionArgs](#Point+_parsePositionArgs) ⇒ <code>Object</code>
    * [.transform(matrix)](#Point+transform) ⇒ <code>[Point](#Point)</code>
    * [.clone()](#Point+clone) ⇒ <code>[Point](#Point)</code>
    * [.transformSelf(m)](#Point+transformSelf) ⇒ <code>[Point](#Point)</code>
    * [.multiplySelf(arg0, arg1)](#Point+multiplySelf) ⇒ <code>[Point](#Point)</code>

<a name="Point+constructor"></a>
### point.constructor
Creates a Point object with the given x and y coordinates.

**Kind**: instance property of <code>[Point](#Point)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [arg0] | <code>Number</code> &#124; <code>Array</code> &#124; <code>Object</code> | <code>0</code> | 
| [arg1] | <code>Number</code> |  | 

**Example**  
```js
new Point(5, 7);
new Point([5, 7]);
new Point({x:5, y:7});
new Point(new Point(5, 7));
```
<a name="Point+set"></a>
### point.set ⇒ <code>Object</code>
sets the coordinates

**Kind**: instance property of <code>[Point](#Point)</code>  
**Returns**: <code>Object</code> - Point  

| Param | Type | Description |
| --- | --- | --- |
| arg0 | <code>Number</code> &#124; <code>Array</code> &#124; <code>Object</code> | x |
| [arg1] | <code>Number</code> | y |

**Example**  
```js
point.add(5, 7);
point.add([5, 7]);
point.add({x:5, y:7});
point.add(new Point(5, 7));
```
<a name="Point+set$"></a>
### point.set$ ⇒ <code>Object</code>
sets the absolute coordinates

**Kind**: instance property of <code>[Point](#Point)</code>  
**Returns**: <code>Object</code> - Point  

| Param | Type | Description |
| --- | --- | --- |
| arg0 | <code>Number</code> &#124; <code>Array</code> &#124; <code>Object</code> | x |
| [arg1] | <code>Number</code> | y |

**Example**  
```js
point.add(5, 7);
point.add([5, 7]);
point.add({x:5, y:7});
point.add(new Point(5, 7));
```
<a name="Point+coordinateSystem"></a>
### point.coordinateSystem
**Kind**: instance property of <code>[Point](#Point)</code>  

| Param |
| --- |
| cos | 

<a name="Point+position$"></a>
### point.position$ ⇒ <code>[Point](#Point)</code>
**Kind**: instance property of <code>[Point](#Point)</code>  
<a name="Point+absoluteX"></a>
### point.absoluteX ⇒ <code>Number</code>
**Kind**: instance property of <code>[Point](#Point)</code>  
<a name="Point+absoluteY"></a>
### point.absoluteY ⇒ <code>Number</code>
**Kind**: instance property of <code>[Point](#Point)</code>  
<a name="Point+relativeX"></a>
### point.relativeX ⇒ <code>Number</code>
todo relative coordinates with capital chars

**Kind**: instance property of <code>[Point](#Point)</code>  
<a name="Point+relativeY"></a>
### point.relativeY ⇒ <code>Number</code>
**Kind**: instance property of <code>[Point](#Point)</code>  
<a name="Point+x"></a>
### point.x ⇒ <code>Number</code>
**Kind**: instance property of <code>[Point](#Point)</code>  
<a name="Point+x"></a>
### point.x
**Kind**: instance property of <code>[Point](#Point)</code>  

| Param | Type |
| --- | --- |
| x | <code>Number</code> | 

<a name="Point+x$"></a>
### point.x$ ⇒ <code>Number</code>
**Kind**: instance property of <code>[Point](#Point)</code>  
<a name="Point+x$"></a>
### point.x$
**Kind**: instance property of <code>[Point](#Point)</code>  

| Param | Type |
| --- | --- |
| x$ | <code>Number</code> | 

<a name="Point+y$"></a>
### point.y$ ⇒ <code>Number</code>
**Kind**: instance property of <code>[Point](#Point)</code>  
<a name="Point+y$"></a>
### point.y$
**Kind**: instance property of <code>[Point](#Point)</code>  

| Param | Type |
| --- | --- |
| y$ | <code>Number</code> | 

<a name="Point+y"></a>
### point.y ⇒ <code>Number</code>
**Kind**: instance property of <code>[Point](#Point)</code>  
<a name="Point+y"></a>
### point.y
**Kind**: instance property of <code>[Point](#Point)</code>  

| Param | Type |
| --- | --- |
| y | <code>Number</code> | 

<a name="Point+position"></a>
### point.position
**Kind**: instance property of <code>[Point](#Point)</code>  

| Param | Type |
| --- | --- |
| pos | <code>Number</code> &#124; <code>Array</code> &#124; <code>Object</code> | 

**Example**  
```js
Point.position = [5, 7];
Point.position = {x:5, y:7};
Point.position = new Point(5, 7);
```
<a name="Point+length"></a>
### point.length
The the vector to given length

**Kind**: instance property of <code>[Point](#Point)</code>  

| Param | Type | Description |
| --- | --- | --- |
| l | <code>Number</code> | target length of the vector |

<a name="Point+length"></a>
### point.length ⇒ <code>Number</code>
returns the current length

**Kind**: instance property of <code>[Point](#Point)</code>  
<a name="Point+add"></a>
### point.add ⇒ <code>Object</code>
adds and returns a new point

**Kind**: instance property of <code>[Point](#Point)</code>  
**Returns**: <code>Object</code> - Point  

| Param | Type |
| --- | --- |
| arg0 | <code>Number</code> | 
| arg1 | <code>Number</code> | 

**Example**  
```js
point.add(5, 7);
```
<a name="Point+addSelf"></a>
### point.addSelf ⇒ <code>Object</code>
adds to the current point

**Kind**: instance property of <code>[Point](#Point)</code>  
**Returns**: <code>Object</code> - Point  

| Param | Type |
| --- | --- |
| arg0 | <code>Number</code> &#124; <code>Array</code> &#124; <code>Object</code> | 
| [arg1] | <code>Number</code> | 

**Example**  
```js
point.add(5, 7);
point.add([5, 7]);
point.add({x:5, y:7});
point.add(new Point(5, 7));
```
<a name="Point+add"></a>
### point.add ⇒ <code>Object</code>
multiplies

**Kind**: instance property of <code>[Point](#Point)</code>  
**Returns**: <code>Object</code> - Point  

| Param | Type |
| --- | --- |
| arg0 | <code>Number</code> | 
| arg1 | <code>Number</code> | 

**Example**  
```js
point.add(5, 7);
```
<a name="Point+distance"></a>
### point.distance ⇒ <code>[Point](#Point)</code>
returns the distance between the absolute coordinates and a given point

**Kind**: instance property of <code>[Point](#Point)</code>  

| Param | Type |
| --- | --- |
| arg0 | <code>Number</code> &#124; <code>Array</code> &#124; <code>Object</code> | 
| [arg1] | <code>Number</code> | 

**Example**  
```js
Point.distance(5, 7);
Point.distance([5, 7]);
Point.distance({x:5, y:7});
Point.distance(new Point(5, 7)); //relative x,y of Point
Point.distance((new Point(5, 7)).position$); //absolute x,y of Point
```
<a name="Point+distance$"></a>
### point.distance$ ⇒ <code>[Point](#Point)</code>
returns the distance between the absolute coordinates and a given point

**Kind**: instance property of <code>[Point](#Point)</code>  

| Param | Type |
| --- | --- |
| arg0$ | <code>Number</code> &#124; <code>Array</code> &#124; <code>Object</code> | 
| [arg1$] | <code>Number</code> | 

**Example**  
```js
Point.distance$(5, 7);
Point.distance$([5, 7]);
Point.distance$({x:5, y:7});
Point.distance$(new Point(5, 7)); //relative x,y of Point
Point.distance$((new Point(5, 7)).position$); //absolute x,y of Point
```
<a name="Point+lerp"></a>
### point.lerp ⇒ <code>[Point](#Point)</code>
**Kind**: instance property of <code>[Point](#Point)</code>  

| Param | Type |
| --- | --- |
| arg0 | <code>Number</code> &#124; <code>Array</code> &#124; <code>Object</code> | 
| [arg1] | <code>Number</code> | 
| p |  | 

**Example**  
```js
Point.lerp(5, 7);
Point.lerp([5, 7]);
Point.lerp({x:5, y:7});
Point.lerp(new Point(5, 7));
```
<a name="Point+lerpSelf"></a>
### point.lerpSelf ⇒ <code>[Point](#Point)</code>
**Kind**: instance property of <code>[Point](#Point)</code>  

| Param | Type |
| --- | --- |
| arg0 | <code>Number</code> &#124; <code>Array</code> &#124; <code>Object</code> | 
| [arg1] | <code>Number</code> | 
| p |  | 

**Example**  
```js
Point.lerpSelf(5, 7);
Point.lerpSelf([5, 7]);
Point.lerpSelf({x:5, y:7});
Point.lerpSelf(new Point(5, 7));
```
<a name="Point+_parsePositionArgs"></a>
### point._parsePositionArgs ⇒ <code>Object</code>
parses the input args and returns a point object with x and y coordinates

**Kind**: instance property of <code>[Point](#Point)</code>  

| Param | Type |
| --- | --- |
| arg0 | <code>Number</code> &#124; <code>Array</code> &#124; <code>Object</code> | 
| [arg1] | <code>Number</code> | 

**Example**  
```js
_parsePositionArgs(5, 7);
_parsePositionArgs([5, 7]);
_parsePositionArgs({x:5, y:7});
_parsePositionArgs(new Point(5, 7));
```
<a name="Point+transform"></a>
### point.transform(matrix) ⇒ <code>[Point](#Point)</code>
returns a new transformed Point

**Kind**: instance method of <code>[Point](#Point)</code>  

| Param |
| --- |
| matrix | 

<a name="Point+clone"></a>
### point.clone() ⇒ <code>[Point](#Point)</code>
returns a copy of the point

**Kind**: instance method of <code>[Point](#Point)</code>  
<a name="Point+transformSelf"></a>
### point.transformSelf(m) ⇒ <code>[Point](#Point)</code>
returns a new transformed Point

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - [a b tx] [ x ]
[c d ty] [ y ]
[0 0 1 ] [ 1 ]  

| Param |
| --- |
| m | 

<a name="Point+multiplySelf"></a>
### point.multiplySelf(arg0, arg1) ⇒ <code>[Point](#Point)</code>
**Kind**: instance method of <code>[Point](#Point)</code>  

| Param | Description |
| --- | --- |
| arg0 | x |
| arg1 | y |

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
