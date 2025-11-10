const NameFilter = ({ searchText, onChange }) => {
    return (
        <>
            Filter names with:{' '}
            <input
                type="text"
                name="filterText"
                value={searchText}
                onChange={onChange}
            ></input>
        </>
    );
};

export default NameFilter;
