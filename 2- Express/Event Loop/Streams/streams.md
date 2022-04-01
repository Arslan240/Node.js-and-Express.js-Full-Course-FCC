# Streams
Streams are used to handle continuous flow of data.
## Types
  * Writeable - write sequentially
  * Readable - read sequentially
  * Duplex - read and write sequentially
  * Transform - data can be modified while reading or writing

## Benefits
  * readFile and writeFile can be used to read or write file but is not useable for large files because it'll fill the memory and variable's capacity might be outrun by the data.
  * Streams are used to read or write big files.

## Streams extend Event Emitter Class