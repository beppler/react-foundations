export default function Table({items=[]} : {items: any[]}) {
	if (items.length === 0) {
		return <div>[no items]</div>
	}
	else {
		return (
			<table>
				<TableHead sampleObject={items[0]} />
				<TableBody objects={items} />
			</table>
		)
	}
}

function TableHead({sampleObject} : {sampleObject: any}) {
	return (
		<thead>
			<TableRow data={Object.keys(sampleObject)} head={true} />
		</thead>
	)
}

function TableBody({objects} : {objects: any[]}) {
	return (
		<tbody>
		{
			objects.map((obj, i) => <TableRow data={Object.values(obj)} key={i} head={false} />)
		}
		</tbody>
	)
}

function TableRow({data, head=false} : {data: any[], head: boolean}) {
	const CellTag = head ? 'th' : 'td'
	return (
		<tr>
		{
			data.map((d, i) => <CellTag key={i}>{d}</CellTag>)
		}
		</tr>
	)
}