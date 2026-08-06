const Filter = ({search, getSearch}) => {
    return (
        <div>
            Filter shown with: <input type="text"  value={search} onChange={getSearch} />
        </div>
    )
}

export default Filter