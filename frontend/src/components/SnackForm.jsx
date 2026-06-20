export default function SnackForm({calories, setCalories, hunger, setHunger}) {

    return (
        <div className="snack-form">
            <div className="form-group">
                <label>Enter calories available:</label>
                <input
                    className="snack-input"
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Where are you on the hunger scale right now?</label>
                <select className="snack-input" value={hunger} onChange={(e) => setHunger(e.target.value)}>
                    <option value="low">Peckish</option>
                    <option value="medium">Hungry</option>
                    <option value="high">Starving</option>
                </select>
            </div>
        </div>
    );
}

