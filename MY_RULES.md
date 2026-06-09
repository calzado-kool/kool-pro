# Procedimiento de carga, venta y sincronización - Calzado Kool

## Regla general
- Solo se descuenta inventario y se factura cuando Bold confirma el pago como `PAID`.
- Toda venta debe quedar sincronizada en **dos lados**: **página/catálogo** y **GESADMIN**.
- Nunca asumir una venta por monto solamente; siempre validar el pedido con `order_id`, producto, talla, color y referencia de pago.

## Estructura robusta de pedido
Cada compra debe viajar con estos campos:
- `order_id`
- `product_code`
- `product_name`
- `color`
- `size`
- `qty`
- `amount`
- `payment_status`
- `bold_reference`
- `shipping_address`

## Flujo de venta
1. La página genera un `order_id` único al iniciar el checkout.
2. Bold recibe el pedido con la descripción estructurada.
3. Cuando Bold responde `PAID`, se valida la orden.
4. Si la orden es válida:
   - crear factura en GESADMIN
   - descontar stock en el catálogo
   - notificar al grupo de ventas si aplica
   - activar alistamiento y despacho

## Formato recomendado para el checkout
Usar una descripción tipo:
`[ORD:KOOL-123 | SKU:022 | SZ:36 | NAME:Bota Urbana Roja | CLR:Rojo]`

## Códigos de referencia actuales - Bota Urbana Roja
- Talla 34 → `020`
- Talla 35 → `021`
- Talla 36 → `022`
- Talla 37 → `023`
- Talla 38 → `024`
- Talla 39 → `025`

## Sincronización de inventario
- Si entra mercancía, sumar en página y GESADMIN.
- Si se vende, descontar en página y GESADMIN.
- Si el pago no está confirmado, no descontar nada.

## Nota operativa
- El sistema debe revisar todas las transacciones de Bold, no solo la primera página.
- No repetir procesamiento de una misma orden; usar `order_id` como llave única.