package com.workgroup.model;

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

import com.roster.admin.ResultSetConverter;

/**
 * Servlet implementation class Workgroupmodel
 */
@WebServlet("/wgbl")
public class Workgroupmodel extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Workgroupmodel() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		java.sql.Connection conn = null;
		String sql = null;
		try {

			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);

			String wg_names = (jsonObj.getString("wg_names") == null) ? ""
					: jsonObj.getString("wg_names");
			String signature = (jsonObj.getString("signature") == null) ? ""
					: jsonObj.getString("signature");
			String role = (jsonObj.getString("role") == null) ? "" : jsonObj
					.getString("role");
			String identity = (jsonObj.getString("identity") == null) ? ""
					: jsonObj.getString("identity");

			try {  
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
				if(role.equals("21232f297a57a5a743894a0e4a801fc3")){
					role = "";
				}
				switch (signature) {
				case "getllwg":
					sql = Workgroupdatalayer.getAllWorkgroup(role, identity);
					break;
				default:
					sql = "ERROR";
					break;
				}

			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
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
			response.getWriter().write((e).toString() + "badtrip naman oh");
		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((f).toString());
		} catch (NullPointerException g) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((g).toString());
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (Exception e) {
					// TODO: handle exception
				}
			}
		}
	}
}
