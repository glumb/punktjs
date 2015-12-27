## Classes

<dl>
<dt><a href="#Circle">Circle</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#Base">Base</a></dt>
<dd></dd>
<dt><a href="#Hierarchy">Hierarchy</a></dt>
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
</dl>

## Functions

<dl>
<dt><a href="#value">value([levels])</a> ⇒ <code>Number</code></dt>
<dd></dd>
<dt><a href="#value">value()</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#value">value(p)</a> ⇒ <code><a href="#Hierarchy">Hierarchy</a></code></dt>
<dd></dd>
<dt><a href="#value">value(sx, [sy])</a></dt>
<dd></dd>
<dt><a href="#value">value()</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#value">value(matrix)</a> ⇒ <code><a href="#Point">Point</a></code></dt>
<dd><p>returns a new transformed Point</p>
</dd>
</dl>

<a name="Circle"></a>
## Circle
**Kind**: global class  
<a name="Base"></a>
## Base
**Kind**: global variable  

* [Base](#Base)
    * [._positionCache$](#Base+_positionCache$)
    * [._positionCache$](#Base+_positionCache$)

<a name="Base+_positionCache$"></a>
### base._positionCache$
TODO to be replaced by super._changed() when the super implementations performance is better

**Kind**: instance property of <code>[Base](#Base)</code>  
<a name="Base+_positionCache$"></a>
### base._positionCache$
TODO to be replaced by super._parentChanged() when the super implementations performance is better

**Kind**: instance property of <code>[Base](#Base)</code>  
<a name="Hierarchy"></a>
## Hierarchy
**Kind**: global variable  
<a name="Path"></a>
## Path
**Kind**: global variable  
<a name="Point"></a>
## Point
**Kind**: global variable  

* [Point](#Point)
    * [.constructor](#Point+constructor)
    * [.set](#Point+set) ⇒ <code>Object</code>
    * [.set$](#Point+set$) ⇒ <code>Object</code>
    * [.add](#Point+add) ⇒ <code>Object</code>
    * [.position](#Point+position)
    * [.addSelf](#Point+addSelf) ⇒ <code>Object</code>
    * [.add](#Point+add) ⇒ <code>Object</code>
    * [.distance](#Point+distance) ⇒ <code>[Point](#Point)</code>
    * [.distance$](#Point+distance$) ⇒ <code>[Point](#Point)</code>
    * [.lerp](#Point+lerp) ⇒ <code>[Point](#Point)</code>
    * [.lerpSelf](#Point+lerpSelf) ⇒ <code>[Point](#Point)</code>
    * [._parsePositionArgs](#Point+_parsePositionArgs) ⇒ <code>Object</code>

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
<a name="RasterRenderer"></a>
## RasterRenderer
todo
- rectangle
- bezier curve

**Kind**: global variable  
<a name="Shape"></a>
## Shape
**Kind**: global variable  
<a name="value"></a>
## value([levels]) ⇒ <code>Number</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [levels] | <code>Number</code> | how many levels to travel up the hierarchy |

<a name="value"></a>
## value() ⇒ <code>boolean</code>
**Kind**: global function  
<a name="value"></a>
## value(p) ⇒ <code>[Hierarchy](#Hierarchy)</code>
**Kind**: global function  

| Param |
| --- |
| p | 

<a name="value"></a>
## value(sx, [sy])
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sx | <code>Number</code> |  | scaling in x, y or only x if no sy given |
| [sy] | <code>Number</code> | <code>sx</code> | scaling in y direction |

<a name="value"></a>
## value() ⇒ <code>boolean</code>
**Kind**: global function  
<a name="value"></a>
## value(matrix) ⇒ <code>[Point](#Point)</code>
returns a new transformed Point

**Kind**: global function  

| Param |
| --- |
| matrix | 

