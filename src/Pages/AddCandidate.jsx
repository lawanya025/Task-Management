function AddCandidate() {
    return (
      <div>
        <h2>Add New Candidate</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-success">Add Candidate</button>
        </form>
      </div>
    );
  }
  
  export default AddCandidate;
  