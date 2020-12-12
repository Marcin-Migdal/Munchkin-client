export default function ListComponent({data, mapFunction}) {
  return data.map((item, index) => mapFunction(item, index))
}
