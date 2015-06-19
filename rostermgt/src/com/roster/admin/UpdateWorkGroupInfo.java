package com.roster.admin;

import java.io.IOException;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

@WebServlet("/uwgi")
public class UpdateWorkGroupInfo extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public UpdateWorkGroupInfo() {
		super();

	}
	String sql;
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		java.sql.Connection conn = null;
		try {
			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);
			String oldWgName =  (jsonObj.getString("oldWgName") == null) ? ""
					: jsonObj.getString("oldWgName");
			String wg_names = (jsonObj.getString("wg_names") == null) ? ""
					: jsonObj.getString("wg_names");
			String wg_id = (jsonObj.getString("wg_id") == null) ? "" : jsonObj
					.getString("wg_id");
			String target_hd_count = (jsonObj.getString("target_hd_count") == null) ? ""
					: jsonObj.getString("target_hd_count");

			String wg_language_center = (jsonObj.getString("wg_language_center") == null) ? ""
					: jsonObj.getString("wg_language_center");
			String wg_prod_family = (jsonObj.getString("wg_prod_family") == null) ? ""
					: jsonObj.getString("wg_prod_family");
			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
  

			 sql = "UPDATE hdpr.tbl_roster_workgroup_mapping set wg_name = '"
					+ wg_names;
			sql = sql + "', wg_psm_target_head_count=" + (target_hd_count.equals("") ? "'0'" : "'" +  target_hd_count+ "'");  
					
			sql = sql + ",wg_language_center='" + wg_language_center + "'";
			sql = sql + ",wg_prod_family='" + wg_prod_family + "'";
			sql = sql + " WHERE wg_serial_id = '" + wg_id + "'";

			

			String updateEmpwgInfo ="UPDATE hdpr.tbl_roster_emp_wg_mapping SET wg_names ='" + wg_names + "' "
					+ "WHERE wg_names ='" + oldWgName  + "'";
			String updateTmwgInfo ="UPDATE hdpr.tbl_roster_tm_wg_mapping SET wg_name ='" + wg_names + "' "
					+ "WHERE wg_name ='" + oldWgName  + "'";
			
			PreparedStatement st = conn.prepareCall(sql);
			PreparedStatement stu= conn.prepareCall(updateEmpwgInfo);   
			PreparedStatement stv= conn.prepareCall(updateTmwgInfo);
			
			ResultSet data;
			stu.executeUpdate();
			stv.executeUpdate();
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
			response.getWriter().write((e).toString() + "badtrip naman oh" + sql);
		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((f).toString());
		} catch (NullPointerException g) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((g).toString());
		} finally{
			if (conn != null) {
				try {
					conn = null;
				} catch (Exception e) {
					// TODO: handle exception
				}
			}
		}
	}

}
