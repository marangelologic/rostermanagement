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

/**
 * Servlet implementation class GetWGtargetheadCount
 */
@WebServlet("/gwgthd")
public class GetWGtargetheadCount extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public GetWGtargetheadCount() {
		super();
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String sql;
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
				sql = " SELECT DISTINCT(wg_name), wg_psm_target_head_count as \"target_head_count\" ";
				sql = sql + " from hdpr.tbl_roster_workgroup_mapping ";
				sql = sql
						+ "GROUP BY wg_names,target_head_count ORDER BY wg_names ASC ";
			} else {
				sql = "	SELECT DISTINCT(wg_name), wg_psm_target_head_count as \"target_head_count\" ";
				sql = sql
						+ " from hdpr.tbl_roster_workgroup_mapping  WHERE wg_name='"
						+ wgName + "'";
				sql = sql
						+ " GROUP BY wg_name,target_head_count ORDER BY wg_name ASC ";
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
			response.getWriter().write((e).toString() + " badtrip naman oh");
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
