/*

Date Pipe :

today: Date = new Date();

<p>{{ today | date: 'short' }}</p>           <!-- Output: 10/25/24, 1:24 PM -->
<p>{{ today | date: 'fullDate' }}</p>       <!-- Output: Friday, October 25, 2024 -->
<p>{{ today | date: 'yyyy-MM-dd' }}</p>     <!-- Output: 2024-10-25 -->


Currency Pipe :

amount: number = 1234.5;

<p>{{ amount | currency: 'USD' }}</p>               <!-- Output: $1,234.50 -->
<p>{{ amount | currency: 'EUR': 'symbol' }}</p>     <!-- Output: €1,234.50 -->
<p>{{ amount | currency: 'USD': 'code': '1.0-0' }}</p> <!-- Output: USD1,235 -->


Decimal Pipe :

value: number = 3.14159;

<p>{{ value | number: '1.0-2' }}</p> <!-- Output: 3.14 -->
<p>{{ value | number: '1.2-3' }}</p> <!-- Output: 3.142 -->


Percent Pipe :

decimal: number = 0.5678;

<p>{{ decimal | percent: '1.0-2' }}</p> <!-- Output: 56.78% -->


JSON Pipe :

user = { name: 'John', age: 30 };

<p>{{ user | json }}</p> <!-- Output: {"name":"John","age":30} -->


Slice Pipe :

fruits: string[] = ['Apple', 'Banana', 'Cherry', 'Date'];

<p>{{ fruits | slice:1:3 }}</p> <!-- Output: ["Banana","Cherry"] -->





 */
