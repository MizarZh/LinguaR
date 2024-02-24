export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>

export type JSONArray = Array<JSONValue>

export type RegExpMatchArrayWithIndices = RegExpMatchArray & {
  indices: Array<[number, number]>
}
