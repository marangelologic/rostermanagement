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
 * Servlet implementation class GetAllWorkedGroupByPSM
 * GetAllWorkedGroupByPSM
 */
@WebServlet("/gawgbpsm")
public class GetAllWorkedGroupByPSM extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public GetAllWorkedGroupByPSM() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		java.sql.Connection conn = null;
		try {
			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);

			String psm = (jsonObj.getString("psm") == null) ? "" : jsonObj
					.getString("psm");

			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");   
			} catch (SQLException e) {
				// TODO Auto-generated catch block   
				e.printStackTrace();     
			}

			String sql = " SELECT DISTINCT(wg_names), COUNT(*) as \"current_head_count\", ";
			sql = sql + " COALESCE((select (wg_psm_target_head_count) from hdpr.tbl_roster_workgroup_mapping where wg_name = a.wg_names AND wg_psm_target_head_count is not null),0) as \"target_head_count\" ";
			sql = sql + " from hdpr.tbl_roster_emp_wg_mapping a INNER ";
			sql = sql
					+ " JOIN hdpr.tbl_roster_employees b ON a.emp_id = b.emp_id  ";
			sql = sql
					+ " WHERE end_date IS NULL AND wg_names IN(select DISTINCT(wg_name) from hdpr.tbl_roster_workgroup_mapping "
					+ " where wg_prod_family = '" + psm
					+ "' AND b.emp_status = 'Permanent') GROUP BY wg_names ORDER BY wg_names ASC";

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
			response.getWriter().write((e).toString() + "badtrip naman oh");
		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((f).toString());
		} catch (NullPointerException g) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((g).toString());
		} finally{
			if(conn != null){
				try {
					conn.close();
				} catch (Exception e) {
					// TODO: handle exception
				}
			}
		}
	}

}
