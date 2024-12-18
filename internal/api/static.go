package api

func (m *Server) ConfigureStaticFiles() {
	m.fiberApp.Static("/", "./console-app")
}
