function Sidebar({ modules, onSelectLesson }) {
    return (
      <div style={{ width: "250px", backgroundColor: "#f0f0f0", padding: "1rem" }}>
        <h3>Course Modules</h3>
        {modules.map((mod) => (
          <div key={mod.id}>
            <strong>{mod.title}</strong>
            {mod.lectures.map((lec) => (
              <div key={lec.id} style={{ marginLeft: "10px" }}>
                <em>{lec.title}</em>
                <ul>
                  {lec.lessons.map((les) => (
                    <li key={les.id}>
                      <button onClick={() => onSelectLesson(les.id)}>
                        {les.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  
  export default Sidebar;
  