package com.roster.admin;

import java.io.IOException;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

@WebServlet("/gwghc")
public class GetWGCurrentHeadCount extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public GetWGCurrentHeadCount() {
		super();

	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String sql = "";
		try {
			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);

			String wgName = (jsonObj.getString("wg_names") == null) ? ""
					: jsonObj.getString("wg_names");
			String perWG = (jsonObj.getString("perWG") == null) ? "" : jsonObj
					.getString("perWG");
			java.sql.Connection conn = null;

			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			if (perWG.equals("no")) {
				sql = " SELECT DISTINCT(wg_names), COUNT(*) as \"current_head_count\" ";
				sql = sql
						+ " from hdpr.tbl_roster_emp_wg_mapping a INNER JOIN hdpr.tbl_roster_employees b ON a.emp_id = b.emp_id WHERE end_date IS NULL ";
				sql = sql + "GROUP BY wg_names ORDER BY wg_names ASC ";
			} else {
				sql = "	SELECT DISTINCT(wg_names), COUNT(*) as \"current_head_count\" ";
				sql = sql
						+ " from hdpr.tbl_roster_emp_wg_mapping a INNER  JOIN hdpr.tbl_roster_employees b ON a.emp_id = b.emp_id WHERE end_date IS NULL AND wg_names='"
						+ wgName + "'";
				sql = sql + " GROUP BY wg_names ORDER BY wg_names ASC ";
			}

			PreparedStatement st = conn.prepareCall(sql);

			ResultSet data;
			data = st.executeQuery();

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(
					ResultSetConverter.convert(data).toString());

			try {
				st.close();

			} catch (SQLException logOrIgnore) {

			}
			try {
				conn.close();

			} catch (SQLException logOrIgnore) {

			}

		} catch (SQLException e) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(
					(e).toString() + " badtrip naman oh" + sql);
		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((f).toString());
		} catch (NullPointerException g) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((g).toString());
		}
	}

}
